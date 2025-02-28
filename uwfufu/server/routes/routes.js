import express from "express";
import { checkUser, addUser } from "../database/connection.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import bcrypt from "bcrypt";
import { getUserIdByEmail, addNewQuiz, addNewQuestion, getQuizes, getQuizesDetailsQuiz, getQuizesDetailsQuestions, getRandomQuestions } from "../database/connection.js";


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
})

const fileFilter = (req, file, cb) => {
    const allowedMimetype = ['image/jpeg', 'image/png', 'image/webp'];

    if(allowedMimetype.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Niepoprawne rozszerzenie pliku możliwe; (png, jpg, jpeg, webp)'), false)
    }
} 

const upload = multer({ storage,
    fileFilter,
});

router.post('/login', async (req, res) => { 
    try {
        const user = await checkUser(req.body.email);
        
        if(user) {
            let isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);

            if(isPasswordCorrect) {
                const token = jwt.sign(user, 'abc123', {expiresIn: '6h'});
                const newUser = {email: user.email, login: user.login, token: token};
                req.session.user = newUser;
                res.send(newUser)
            } else {
                res.send("Hasło lub dres email są niepoprawne");
            }
        } else {
            res.send('Nie znaleziono takiego użytkownika');
        }

    } catch(error) {
        console.log(error);
        throw error;
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = await checkUser(req.body.email);

        if(user) {
            res.send('Taki użytkownik już istnieje');
        } else {
            const newUser = await addUser(req.body);
            res.send(newUser);
        }      
    } catch (error) {
        console.log(error); 
    }
})
 
router.post('/create-quiz', upload.single('title_img'), async (req, res) => {
    try {
        const user = await getUserIdByEmail(req.body.user_email);

        const tempQuiz = {
            title: req.body.title,
            filepath: req.file.path ?? "",
            category: req.body.category,
            status: req.body.status,
            owner_id: user.id,
        }

        const quiz = await addNewQuiz(tempQuiz);

        const newQuiz = {quiz_id: quiz, ...tempQuiz}
        // console.log(newQuiz)
        res.send(newQuiz)   
    } catch (error) {
        console.log(error)
        throw error
    }
})

router.post('/add-questions', upload.any(), async (req, res) => {
    try {
        if(!req.files){
            res.status(500).send("No file uploaded minimum files 8");
        }
        
        const elements = Object.values(req.body);

        let sortedElements = []
        for (let i = 0; i <= elements.length - 1; i+=3) {
            let title = elements[i]
            let quiz_id = parseInt(elements[i+1])
            let email = elements[i+2]
            let user_id = await getUserIdByEmail(email);
            sortedElements.push({title: title, quiz_id: quiz_id, user_id: user_id.id})
        }
        
        let finalData = []
        req.files.forEach((file, i) => {
            finalData.push({filepath: file.path, ...sortedElements[i]})
        })
        
        finalData.forEach( async (question) => {
            try {
                let result = await addNewQuestion(question);
                
                let response = await result;
                //console.log(response)
            } catch (error) {
                console.log(error)
                throw error;
            }
        });

        res.send(req.files)   
    } catch (error) {
        throw error;
    }
})

router.post('/get-quizes', async (req, res) => {
    try {
        const questions = await getQuizes();
        //console.log(questions)
        res.send(questions)
    } catch (error) {
        throw error;
    }
})

router.post('/get-quiz', async (req, res) => {
    try {
        const quiz = await getQuizesDetailsQuiz(req.body.id)
        //console.log(quiz)
        res.send(quiz)
    } catch (error) {
        throw error;
    }
})

router.post('/get-questions', async (req, res) => {
    try {
        const questions = await getQuizesDetailsQuestions(req.body.id);
       // console.log(req.body.id)
        res.send(questions)
    } catch (error) {
        throw error;
    }
})

router.post('/get-random-questions', async (req, res) => {
    try {
        const {id, count} = req.body;
        // console.log(id, count)
        const questions = await getRandomQuestions(id, count);
        // console.log(questions)
        res.send(questions)
    } catch (error) {
        throw error;
    }
})

router.use((err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        return res.status(400).send(err.message)
    }
    if(err) {
        return res.status(400).send(err.message)
    }
})

export default router;