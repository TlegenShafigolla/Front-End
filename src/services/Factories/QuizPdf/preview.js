import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import QuizDocument from './QuizDocument';

const PDFpreview = (props) => {
    return (
        <PDFViewer width={props.width} height={props.height}>
            <QuizDocument
                quiz_name={props.quiz_name}
                description={props.description}
                questions={props.questions}
                answers={props.answers}
                settings={props.settings}
            />
        </PDFViewer>);
};

export default PDFpreview;