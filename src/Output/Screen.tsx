import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

interface List {
    subjectList: string[];
    scoreList: number[];
    creditList: number[];
}

const gradeCut = [
    {grade: 'A+', cutLine: 90, credit: 4.3},
    {grade: 'A0', cutLine: 85, credit: 4.0},
    {grade: 'A-', cutLine: 80, credit: 3.7},
    {grade: 'B+', cutLine: 75, credit: 3.3},
    {grade: 'B0', cutLine: 70, credit: 3.0},
    {grade: 'B-', cutLine: 65, credit: 2.7},
    {grade: 'C+', cutLine: 60, credit: 2.3},
    {grade: 'C0', cutLine: 55, credit: 2.0},
    {grade: 'C-', cutLine: 50, credit: 1.7},
    {grade: 'D+', cutLine: 45, credit: 1.3},
    {grade: 'D0', cutLine: 40, credit: 1.0},
    {grade: 'D-', cutLine: 35, credit: 0.7},
    {grade: 'F', cutLine: 0, credit: 0.0}
]

const getGrade = (score: number) => {
    for(let idx = 0; idx < gradeCut.length; idx++) {
        if(gradeCut[idx].cutLine <= score) 
            return idx;
    }
    return 12;
}

export const Calc: React.FC<List> = (props) => {
    const { subjectList, scoreList, creditList } = props;
    let creditSum = 0, avg = 0;
    for(let idx = 0; idx < creditList.length; idx++) {
        creditSum += creditList[idx];
        avg += creditList[idx] * gradeCut[getGrade(scoreList[idx])].credit;
    }
    avg /= creditSum;

    return (
        <div>
            <h1>학점계산기</h1>
            <h2>총학점: {Math.round(avg * 1000) / 1000}</h2>
            <h2>이수학점: {creditSum}</h2>
            {subjectList && subjectList.map((item, idx) => {
                if(creditList[idx]===0) return null;
                const grade = gradeCut[getGrade(scoreList[idx])];
                return (
                    <div>
                        <text>{subjectList[idx]} </text>
                        <text>{scoreList[idx]} </text>
                        <text>{grade.grade} ({grade.credit})</text>
                    </div>
                )
            })}
            <br/>
            <Link to='/'>
                <button>뒤로가기</button>
            </Link>
        </div>
    )
}