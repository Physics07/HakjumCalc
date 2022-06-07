import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Subject } from './Subject';

type Score = {
    midTerm: number;
    endTerm: number;
    perf: number;
}

interface Counter {
    countList: number[];
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

const update_list = (idx: number, value: number, List: number[]) => {
    let newList = [...List];
    newList[idx] = value;
    return newList;
}

export const SubjectList: React.FC<Counter> = (props) => {
    const { countList, subjectList, setSubjectList, 
        scoreList, setScoreList, creditList, setCreditList,
        testScore, setTestScore, ratio, setRatio
    } = props;
    return (
        <div>
            {countList && countList.map((item, idx) => {
                return (
                    <div key={idx}>
                        <Subject index={idx} 
                        subjectList={subjectList} setSubjectList={setSubjectList} 
                        scoreList={scoreList} setScoreList={setScoreList}
                        creditList={creditList} setCreditList={setCreditList}
                        testScore={testScore} setTestScore={setTestScore}
                        ratio={ratio} setRatio={setRatio}/>
                    </div>
                );
            })}
        </div>
    )
}