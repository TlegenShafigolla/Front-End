import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import QuizDocument from './pdf';
import s from "../../components/MyQuizzes/Editing/css/generatePdfDialog.module.css";

const PDFpreview = (props) => (
    <PDFViewer width={props.width} height={props.height}>
        <QuizDocument className={s.MyDocument}
                      quiz_name={props.quiz_name}
                      description={props.description}
                      questions={props.questions}/>
    </PDFViewer>
);

export default PDFpreview;