import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import {getChar} from "../../function/AnswerChar";
import Quiz from "./Quiz";
import QuizWithAnswers from "./QuizWithAnswers";

// Create styles
export const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    quiz_name: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    question: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    answer: {
        margin: 3,
        marginLeft: 25,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    }
});

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

// Create Document Component
const QuizDocument = (props) => (
    <Document>
        {props.showAnswers ? QuizWithAnswers(props) : Quiz(props)}
    </Document>
);


export default QuizDocument;