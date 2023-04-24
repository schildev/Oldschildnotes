'use client'

import { ChangeEvent, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { KeyboardEvent } from "react";
import Recap from "./Recap";
type answ = string[]
type ref = (0|1)[]
const QuizzForm = (props:{definitions:string[], questions:[]}) => {
    const {questions, definitions} = props;
    const [answerState, updateAnswerState] = useImmer<answ>([])
    const [answerText, setAnswerText] = useState("");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isRecapTime, setIsRecapTime] = useState(false);
    const roundRef = useRef<ref>([]);
    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setAnswerText(e.target.value);
    }
    const addAnswer = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && answerText !== ""){
            updateAnswerState(draft => {
                draft.push(answerText)
            })
            if(questionIndex + 1 !== questions.length + definitions.length){
                setQuestionIndex(s => s + 1);
                if(questionIndex + 1 < definitions.length){
                    const f = Math.round(Math.random())
                    if(f === 0 || f === 1)roundRef.current.push(f)
                } 
            }
            else{
                setIsRecapTime(true);
            }
            setAnswerText(""); 
        }
    }
    let question : string;

    if(questionIndex + 1 <= definitions.length){
        if(roundRef.current.length === 0){
            const f = Math.round(Math.random())
            if(f === 0 || f === 1)roundRef.current.push(f)
        }
        const actualRound = roundRef.current[roundRef.current.length - 1]
        question = definitions[questionIndex]
        question = question.split(":")[actualRound]
        
    }else{
        question = questions[questionIndex - definitions.length];
        question = question.split(":")[0]
    }
    
    return (
        <>
        {!isRecapTime ?
        (<div className={"field m-0"}>
            <label>{question}</label>
            <input type="text" value={answerText} onChange={handleInput} onKeyDown={addAnswer} className={"rounded-sm col-span-3 border outline-none border-emerald-300"} />
        </div>)
        : <Recap refState={roundRef.current} userAnswers={answerState} answers={[...definitions, ...questions]} />
        }
        </>
    );
}
 
export default QuizzForm;