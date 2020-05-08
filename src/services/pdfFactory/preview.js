import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import QuizDocument from './QuizDocument';
import s from "../../components/MyQuizzes/Editing/css/generatePdfDialog.module.css";

const PDFpreview = (props) => {
    return (
        <PDFViewer width={props.width} height={props.height}>
            <QuizDocument
                showAnswers={props.showAnswers}
                quiz_name={props.quiz_name}
                description={props.description}
                questions={props.questions}
                answers={props.answers}/>
        </PDFViewer>);
};

export default PDFpreview;