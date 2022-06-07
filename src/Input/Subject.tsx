import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Subject.css';

type Score = {
    midTerm: number;
    endTerm: number;
    perf: number;
}

interface SubList {
    index: number;
    subjectList: string[];
    setSubjectList: (subjectList: string[]) => void;
    scoreList: number[];
    setScoreList: (scoreList: number[]) => void;
    creditList: number[];
    setCreditList: (creditList: number[]) => void;
    testScore: Score[];
    setTestScore: (testScore: Score[]) => void;
    ratio: Score[];
    setRatio: (ratio: Score[]) => void;
}

const update_list = (idx: number, value: any, List: any[]) => {
    let newList = [...List];
    newList[idx] = value;
    return newList;
}

const getScore = (score: Score, value: Score) => {
    return score.midTerm * value.midTerm / 100 + score.endTerm * value.endTerm / 100 + score.perf / 1;
}

export const Subject: React.FC<SubList> = (props) => {
    const { index, subjectList, setSubjectList, scoreList, setScoreList, creditList, setCreditList, testScore, setTestScore, ratio, setRatio } = props;
    const [ open, setOpen ] = useState(false);
    const [ midTermFlag, setMidTermFlag ] = useState(true);
    const [ endTermFlag, setEndTermFlag ] = useState(true);
    const [ perfFlag, setPerfFlag ] = useState(true);
    

    const changeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestScore(update_list(index, {
            ...testScore[index],
            [e.target.name]: Number(e.target.value)
        }, testScore))
    }

    const changeRatio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRatio(update_list(index, {
            ...ratio[index],
            [e.target.name]: Number(e.target.value)
        }, ratio))
    }

    const changeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectList(update_list(index, e.target.value, subjectList));
    }
    
    const changeCredit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreditList(update_list(index, Number(e.target.value), creditList));
    }

    if(!midTermFlag) {
        testScore[index].midTerm = 0; 
        ratio[index].midTerm = 0;
    }
    if(!endTermFlag) {
        testScore[index].endTerm = 0;
        ratio[index].endTerm = 0;
    }
    if(!perfFlag) {
        testScore[index].perf = 0
        ratio[index].perf = 0;
    }

    useEffect((() => {
        setScoreList(update_list(index, getScore(testScore[index], ratio[index]), scoreList))
    }), [getScore(testScore[index], ratio[index])]);
    
    return (
        <div>
            <input type='text' className='SubjectInput' placeholder='과목명' value={subjectList[index]} onChange={changeSubject}/>
            <text> </text>
            <input type='text' className='SubjectInput' placeholder='학점' value={creditList[index]} onChange={changeCredit}/>
            <text>학점 </text>
            <button onClick={() => setOpen(!open)}>
                {open ? '닫기' : '열기'}
            </button>
            {open ? (
                <div>
                    <div>
                        <input type='checkbox' onChange={() => setMidTermFlag(!midTermFlag)} checked={midTermFlag}></input>
                        <text> 중간고사 </text>
                        <input type='checkbox' onChange={() => setEndTermFlag(!endTermFlag)} checked={endTermFlag}></input>
                        <text> 기말고사 </text>
                        <input type='checkbox' onChange={() => setPerfFlag(!perfFlag)} checked={perfFlag}></input>
                        <text> 수행평가 </text>
                    </div>
                    <div>
                        {midTermFlag ? (
                            <div>
                                <text>중간고사 </text>
                                <input type='text' className='InputBox' name='midTerm' placeholder='중간 점수' value={testScore[index].midTerm} onChange={changeScore}/>
                                <text>점 </text>
                                <input type='text' className='InputBox' name='midTerm' placeholder='중간 반영 비율' value={ratio[index].midTerm} onChange={changeRatio}/>
                                <text>%</text>
                            </div>
                        ) : null}
                        {endTermFlag ? (
                            <div>
                                <text>기말고사 </text>
                                <input type='text' className='InputBox' name='endTerm' placeholder='기말 점수' value={testScore[index].endTerm} onChange={changeScore}/>
                                <text>점 </text>
                                <input type='text' className='InputBox' name='endTerm' placeholder='기말 반영 비율' value={ratio[index].endTerm} onChange={changeRatio}/>
                                <text>%</text>
                            </div>
                        ) : null}
                        {perfFlag ? (
                            <div>
                                <text>수행평가 </text>
                                <input type='text' className='InputBox' name='perf' placeholder='수행 점수' value={testScore[index].perf} onChange={changeScore}/>
                                <text>점 </text>
                                <input type='text' className='InputBox' name='perf' placeholder='수행 반영 비율' value={ratio[index].perf} onChange={changeRatio}/>
                                <text>%</text>
                            </div>
                        ) : null}
                        <br/>
                    </div>
                </div>
            ) : null}
        </div>
    )
}