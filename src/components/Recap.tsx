'use client'
import { Fragment, MouseEvent } from "react";
import { useImmer } from "use-immer";
function compareAnswers(expectedAnswer:string, userAnswer:string) {
    expectedAnswer = expectedAnswer.toLowerCase();
    userAnswer = userAnswer.toLowerCase();
    const expectedSet = new Set(expectedAnswer.split(' '));
    const userSet = new Set(userAnswer.split(' '));

    const intersection = new Set([...expectedSet].filter(x => userSet.has(x)));
    const union = new Set([...expectedSet, ...userSet]);

    const similarity = intersection.size / union.size;
    return similarity;
  }
type answers = {visible:boolean, index:number[]}
const Recap = (props : {userAnswers:string[], answers:string[], refState:(0|1)[]}) => {
    const {userAnswers, answers, refState} = props;
    const [trueAnswerIndex, updateAnswerIndex] = useImmer<answers>({visible:false, index:[]});
    const simis : number[] = [];
    console.log(refState);
    userAnswers.forEach((value, index) => {
        if(refState.length > index){
            let exceptAnswer : (string[]|string) = answers[index].split(":")
            exceptAnswer = exceptAnswer[Math.abs(refState[index]-1)]
            exceptAnswer = (exceptAnswer as string).split(" ").filter(word => word !== "").join(" ")
            const simi = compareAnswers((exceptAnswer as string), value);
            simis.push(simi)
            return;
        }
        let exceptAnswer = answers[index].split(":")[1].split(" ")
        const simi = compareAnswers(exceptAnswer.filter(word => word !== "").join(" "), value);
        simis.push(simi);
    })
    const handleClick = (e:MouseEvent, index:number) => {
        e.stopPropagation();
        updateAnswerIndex(draft => {
            draft.visible = true;
            if(trueAnswerIndex.index.includes(index)){
                draft.index = draft.index.filter(x => x !== index);
                if(trueAnswerIndex.index.length === 1){
                    draft.visible = false;
                }
            }else{
                draft.index = [index]
            }
            
        })
    }
    const handleRemoveModal = (e:MouseEvent) => {
        updateAnswerIndex(draft => {
            draft.visible = false;
        })
    }
    return (
    <div className={"m-0 flex justify-between w-full flex-wrap"}>
        <div className={"basis-full lg:basis-10/12 m-0"}>
            {userAnswers.map((answ, index) => (
                <Fragment key={answ + ` ${index}`}>
                    <p onClick={(e) => {handleClick(e, index)}} className={`${simis[index] > 0.8 ? "success" : "error"} text-sm md:text-base lg:text-base flex items-center justify-center`}>{refState.length > index ? answers[index].split(":")[refState[index]]:answers[index].split(":")[0]} : {answ} 
                    <span className="material-symbols-outlined text-sm">{simis[index] > 0.8 ? "done" : "report" }</span>
                    </p>
                </Fragment>
            ))}
        </div>
        {trueAnswerIndex.visible &&
        <div className={"md:fixed lg:fixed top-[40%] basis-full flex-wrap flex items-center w-[30%] min-h-[50px] right-5 text-emerald-300 border shadow shadow-emerald-300 border-emerald-200 p-2 m-0"}>
            <div className={"m-0 flex flex-wrap gap-2 basis-full"}>
            {trueAnswerIndex.index.map((index) => {
                return (<p key={"true"+answers[index]} className={"basis-full text-center"}>
                    {refState.length > index ? answers[index].split(":")[Math.abs(refState[index] - 1)] : answers[index].split(":")[1]}
                    </p>)
            })}
            </div>
        </div>
        }
    </div>
    );
}
 
export default Recap;