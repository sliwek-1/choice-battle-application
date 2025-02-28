import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGetRandomQuestions } from "../hooks/getRandomQuestion";
import { useGetQuizDetails } from "../hooks/getQuizDetails";
import { Header } from "../components/header";
import { Button } from "react-bootstrap";


export function Quiz() {
    const {count, id} = useParams();
    const {loading, getRandomQuestions} = useGetRandomQuestions();
    const {loadingQuiz, getQuizDetails} = useGetQuizDetails();
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState({});
    const [round, setRound] = useState(0);
    const [stages, setStages] = useState([]);
    const [roundOfStage, setRoundOfStage] = useState(0);
    const [winner, setWinner] = useState("")
    
    useEffect(() => {
        const getData = async () => {
            try {
                const questionsData = await getRandomQuestions({count: count, id: id})
                const quizData = await getQuizDetails(id);

                if (questionsData && questionsData.length) {
                    setQuestions(questionsData)
                }
                setQuiz(quizData)


                setTournament(questionsData)
                setRound(0)
            } catch (error) {
                throw error;
            }
        }

        getData()
    }, []);


    const setTournament = (questions) => {
        let stages = [];
        let participants = questions.length;
        let initialPairs = [];

        for(let i = 0; i < participants; i+= 2) {
            initialPairs.push([questions[i], questions[i+1]])
        }

        while(participants >= 2) {
            let round = participants / 2;

            stages.push({
                round: round,
                participants: [],
                pairs: []
            })
            participants /= 2
        }

        stages[0].participants = questions;
        stages[0].pairs = initialPairs;
        
        setStages(stages)
    }
    
    const getToNextRound = (id) => {
        let nextRound = roundOfStage + 1;
        let nextStage = stages[round + 1];
        let currentRoundParticipants = stages[round].participants
        let choosenValue = currentRoundParticipants.filter(value => value.id == id)[0];
        
        //console.log(nextRoundParticipants.participants)

        if(stages[round].participants.length == 2) {
            let winner = stages[round].participants.filter(winner => winner.id == id)
            
            setWinner(winner[0])
        } else {
            console.log(roundOfStage, stages[round].pairs.length)

            if(nextStage.participants.length < stages[round].participants.length / 2) {
                nextStage.participants.push(choosenValue);
                //console.log(nextStage.participants)

                setRoundOfStage(nextRound);
            } 

            if(nextStage.participants.length == stages[round].participants.length / 2) {
                let nextRoundLen = nextStage.participants.length
                let parts = nextStage.participants
                
                for(let i = 0; i < nextRoundLen; i+= 2) {
                    nextStage.pairs.push([parts[i], parts[i+1]])
                }

                setStages(stages)
                setRound(round + 1)
                setRoundOfStage(0)
            }
        }
    }   


    return (
        <>
            <Header />
            {quiz ? 
            <>  
                <div className="d-flex justify-content-center align-items-center flex-column" style={{width: "100vw", height: "10vh"}}>
                    <h1>{quiz.title}</h1>
                    {stages[round] && stages[round].pairs[roundOfStage] && stages[round].pairs.length ? 
                            stages[round].pairs.length == 1 ? <h2>Finał</h2> : <h2>Round of {roundOfStage}/{stages[round].pairs.length}</h2> 
                    : null}
                </div>  
                
                {winner == "" ?  
                    <div className="d-flex justify-content-around align-items-center" style={{width: "100vw", height: "50vh"}}>
                        {
                            stages[round] && stages[round].pairs[roundOfStage] && stages[round].pairs.length > 0 ? 
                                stages[round].pairs[roundOfStage].map(stage => (
                                    <>
                                        <div className="d-flex flex-column align-items-center justify-content-center border" style={{width: "45vw", height: "45vh", borderRadius: "15px"}}>
                                            <img src={"http://188.47.93.39:4000/" + stage.source} style={{width: "15vh", height: "15vh", objectFit: "contain"}} />
                                            <p>{stage.title}</p>
                                            <Button className="primary" onClick={() => getToNextRound(stage.id)}>Wybierz</Button>
                                        </div>
                                    </>
                                )
                            ) : null
                        }
                    </div>
                    :
                    <div className="d-flex justify-content-around align-items-center flex-column" style={{width: "100vw", height: "50vh"}}>
                        <h1>Wygrywa</h1>
                        <img src={"http://188.47.93.39:4000/" + winner.source} alt="" style={{width: "15vh", height: "15vh", objectFit: "contain"}} />
                        <p>{winner.title}</p>    
                        <Button href={"http://188.47.93.39:3000/quiz-details/" + id }>Zagraj jeszcze raz!</Button>
                    </div>
                }
            </>
            : <p>Nie znaleziono takiego quizu</p>}
        </>
    )
}