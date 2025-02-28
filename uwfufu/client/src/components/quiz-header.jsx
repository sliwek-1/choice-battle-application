import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export function QuizHeader() {
    const emptyState ={
        title: "",
        filepath: "",
        category: "",
        status: ""
    }
    const quiz = useSelector(state => state.quiz) || emptyState;
    
    return (
        <div className="d-flex flex-column">
            <div className="header d-flex flex-column align-items-center">
                <Card style={{width: "40vw", height: "55vh"}}>
                    <Card.Img style={{width: "40vw", height: "350px", objectFit: "cover"}} src={"http://188.47.93.39:4000/" + quiz.filepath} />
                    <Card.Title className="p-3">{quiz.title}</Card.Title>
                    <div className="d-flex flex-column justify-content-around p-3">
                        <p>Kategoria: {quiz.category}</p>
                        {quiz.status == "Publiczne" ? <p style={{fontWeight: 'bold'}}>Publiczne</p> : <p style={{fontWeight: 'bold'}}>Prywatne</p>}
                    </div>
                </Card>
            </div>
        </div>
    )
} 