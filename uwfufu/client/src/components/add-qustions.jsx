import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { useQuestion } from "../hooks/useAddQuestions";
import { useSelector } from "react-redux";
import {v4 as uuid} from "uuid";

export function AddQuestions() {

    const [isDragging, setIsDragging] = useState([]);
    const [selectedFiles, setSelectedFile] = useState([]);
    const {loading, createQuestions} = useQuestion();
    const quiz = useSelector(state => state.quiz);
        
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0]

        const files = Array.from(e.dataTransfer.files)

        const images = files.map(file => ({
            file,
            title: file.name,
            id: uuid()
        }))
        setSelectedFile((prevFiles) => [...prevFiles, ...images])
    }
    
    return (
        <>
            <div className="mt-3" style={{width: "40vw"}}>
                <label className="mb-1" htmlFor="images">Dodaj twoje wybory</label>
                <p style={selectedFiles.length < 8 ? {} : { color: "green" }}>
                    {selectedFiles.length < 8 ? <p>{selectedFiles.length}/8</p> : <p>Masz minimalną ilośc pytań ({selectedFiles.length})</p> }
                </p>
                <div className="border p-3"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    id="images">
                <p>Dodaj zdjęcie PNG, JPG, JPEG lub WEBP</p>
                {selectedFiles && selectedFiles.length > 0 ?
                    selectedFiles.map((images, i) => (
                        <div key={i} className="mt-3 d-flex justify-content-around align-items-center p-3" style={{backgroundColor: "#eee", borderRadius: "10px"}}>
                            <img src={URL.createObjectURL(images.file)} alt={images.name} title={images.name} style={{width: "10vw", height: "10vh", objectFit: "contain"}}/>
                            <input type="text" value={images.title} className="form-control mx-5" onChange={(e) => {
                                const updatedFiles = [...selectedFiles]
                                updatedFiles[i].title = e.target.value
                                setSelectedFile(updatedFiles)
                            }}/>
                            <Button className="btn-danger" onClick={(e) => {
                                const updatedFiles = selectedFiles.filter(image => image.id !== images.id)
                                setSelectedFile(updatedFiles)
                            }}>X</Button>
                        </div>)) 
                : <>
                    <p>Nie dodano zdjęć (Przeciągnij i upuść zdjęcie tutaj)</p>
                    <p>Dodaj conajmniej 8 wyborów do twojego quizu</p>
                </>}
                </div>
                {Object.keys(quiz).length > 1 ? <Button className="mt-3" onClick={() => createQuestions(selectedFiles)}>{loading ? <p>Loading...</p> : <p>Zapisz Pytania</p>}</Button> : null}
            </div>
        </>
    )
}