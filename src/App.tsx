import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { List } from './Input/Screen';
import { Calc } from './Output/Screen';

type Score = {
    midTerm: number;
    endTerm: number;
    perf: number;
}

function App() {
    const [countList, setCountList] = useState([0]);
    const [subjectList, setSubjectList] = useState(['']);
    const [scoreList, setScoreList] = useState(Array<number>);
    const [creditList, setCreditList] = useState([0]);
    const [ testScore, setTestScore ] = useState<Array<Score>>([{
        midTerm: 0, endTerm: 0, perf: 0
    }]);
    const [ ratio, setRatio ] = useState<Array<Score>>([{
        midTerm: 0, endTerm: 0, perf: 0
    }]);

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={
                        <List countList={countList} setCountList={setCountList} 
                        subjectList={subjectList} setSubjectList={setSubjectList} 
                        scoreList={scoreList} setScoreList={setScoreList}
                        creditList={creditList} setCreditList={setCreditList}
                        testScore={testScore} setTestScore={setTestScore}
                        ratio={ratio} setRatio={setRatio}/>
                    }/>
                    <Route path='/result' element={
                        <Calc subjectList={subjectList} scoreList={scoreList} creditList={creditList}/>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
