import sqlite3 from "sqlite3";
import bcrypt from "bcrypt"
import { resolve } from "path";

const db = new sqlite3.Database('./mydb.db', (err) => {
    if(err) {
        console.log('something went worng with opening database', err.message)
    } else {
        console.log('Connected to database')
    }
})

function createTable() {
    db.run(
        `create table if not exists user (
            id INTEGER primary key,
            login varchar(100),
            email varchar(100),
            password varchar(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, 
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists quizes (
            id INTEGER primary key,
            title varchar(500),
            title_img varchar(500),
            category varchar(100),
            status varchar(100),
            owner_id int,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists quiz_views (
            id INTEGER primary key,
            quiz_id int,
            user_id int,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists quiz_views (
            id INTEGER primary key,
            quiz_id int,
            user_id int,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists quiz_likes (
            id INTEGER primary key,
            quiz_id int,
            user_id int,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists question_quiz_winners (
            id INTEGER primary key,
            quiz_id int,
            question_id int,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('question_quiz_winners Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists questions (
            id INTEGER primary key,
            quiz_id int,
            user_id int,
            title varchar(500),
            source varchar(500),
            type varchar(30),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Question Table are created');
            }
        }
    )

    db.run(
        `
        create table if not exists categories (
            id INTEGER primary key,
            type varchar(40)
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if(err) {
                console.log('Something went wrong with creating tables', err.message);
            } else {
                console.log('Categories Table are created');
            }
        }
    )
}


const checkUser = async (email) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare('SELECT login, email, password from user WHERE email = ?');
        query.get(email, (err, row) => {
            if(err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

const addUser = async (user) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare('INSERT INTO user(login, email, password) VALUES (?, ?, ?)');
        
        bcrypt.hash(user.password, 10, (err, hashedPassword) => {
            if(err) {
                reject('Something went wrong')
            } else {
                query.run(user.login, user.email, hashedPassword, (err) => {
                    if(err) {
                        reject('Error inserting user: ', err.message)
                    } else {
                        resolve('succes')
                    }
                })
            }
        })
    })
}

const addQuiz = async (quiz) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare('INSERT INTO quizes(title, title_img, category, status, owner_id) VALUES (?, ?, ?, ?, ?)');

        query.run(quiz.title, quiz.title_img, quiz.category, quiz.status, quiz.owner_id, (err) => {
            if(err) {
                reject("Something went wrong " + err);
            } else {
                resolve('Quiz added successfuly');
            }
        })
    })
}

const getUserIdByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare('SELECT id FROM user WHERE email = ?');

        query.get(email, (err, row) => {
            if(err) {
                reject("Something went wrong " + err);
            } else {
                resolve(row)
            }
        })
    })
}

const addNewQuiz = async (data) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare('INSERT INTO quizes(title, title_img, category, status, owner_id) VALUES (?, ?, ?, ?, ?)');

        query.run(data.title, data.filepath, data.category, data.status, data.owner_id, function(err)  {
            if(err) {
                reject("Somethign went wrong " + err);
            } else {
                console.log(this)
                resolve(this.lastID);
            }
        })
    })
}

const addNewQuestion = async (data) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare('INSERT INTO questions(quiz_id, user_id, title, source) VALUES (?, ?, ?, ?)');

        query.run(data.quiz_id, data.user_id, data.title, data.filepath, function(err) {
            if(err) {
                reject("Something went wrong", err);
            } else {
                resolve("Success");
            }
        })
    })
}

const getQuizes = async () => {
    return new Promise((resolve, reject) => {
        const query = db.prepare("SELECT * FROM quizes WHERE status = 'Publiczne'");
        query.all((err, row) => {
            if(err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

const getQuizesDetailsQuiz = async (id) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare("SELECT * FROM quizes where id = ?")

        query.get(id, (err, row) => {
            if(err) {
                reject("Something went wrong " + err);
            } else {
                resolve(row)
            }
        })
    })
}

const getQuizesDetailsQuestions = async (id) => { 
    return new Promise((resolve, reject) => {
        const query = db.prepare("SELECT * FROM questions WHERE quiz_id = ?")

        query.all(id, (err, row) => {
            if(err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

const getRandomQuestions = async (id, count) => {
    return new Promise((resolve, reject) => {
        const query = db.prepare("SELECT * FROM questions WHERE quiz_id = ? ORDER BY RANDOM() LIMIT ?");

        query.all(id, count, (err, row) => {
            if(err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

export {db, createTable, checkUser, addUser, addQuiz, getUserIdByEmail, addNewQuiz, addNewQuestion, getQuizes, getQuizesDetailsQuiz, getQuizesDetailsQuestions, getRandomQuestions}