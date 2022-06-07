import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SubjectList } from './SubjectList';

type Score = {
    midTerm: number;
    endTerm: number;
    perf: number;
}

interface List {
    countList: number[];
    setCountList: (countList: number[]) => void;
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

export const List: React.FC<List> = (props) => {
    const { countList, setCountList, subjectList, setSubjectList, 
        scoreList, setScoreList, creditList, setCreditList,
        testScore, setTestScore, ratio, setRatio
    } = props;
    return (
        <div>
            <h1>학점계산기</h1>
            <br/>
            <div>
                <button onClick={() => {
                    setCountList([...countList, 0]);
                    setSubjectList([...subjectList, '']);
                    setCreditList([...creditList, 0]);
                    setTestScore([...testScore, {midTerm: 0, endTerm: 0, perf: 0}]);
                    setRatio([...ratio, {midTerm: 0, endTerm: 0, perf: 0}]);
                }}>과목 추가</button>
                <text> </text>
                <button onClick={() => {
                    setCountList(countList.slice(0, -1));
                    setSubjectList(subjectList.slice(0, -1));
                    setCreditList(creditList.slice(0, -1));
                    setTestScore(testScore.slice(0, -1));
                    setRatio(ratio.slice(0, -1));
                }}>과목 삭제</button>
            </div>
            <br/>
            <SubjectList countList={countList} 
            subjectList={subjectList} setSubjectList={setSubjectList} 
            scoreList={scoreList} setScoreList={setScoreList}
            creditList={creditList} setCreditList={setCreditList}
            testScore={testScore} setTestScore={setTestScore}
            ratio={ratio} setRatio={setRatio}/>
            <br/>
            <Link to='/result'>
                <button>계산하기</button>
            </Link>
        </div>
    )
}