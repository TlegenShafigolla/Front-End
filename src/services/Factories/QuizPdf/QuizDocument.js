import React from 'react';
import {Document, StyleSheet, Font } from '@react-pdf/renderer';
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
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    description: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
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
    },
    blank_space: {
        marginLeft: 12,
        marginRight: 12,
        border: 1,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5
    },
    top_left_corner_text: {
        fontSize: 10,
        position: 'absolute',
        top: 15,
        left: 15,
    },
    top_right_corner_text: {
        fontSize: 10,
        position: 'absolute',
        top: 15,
        right: 15
    }
});

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

// Create Document Component
const QuizDocument = (props) => (
    <Document>
        {props.settings.showAnswers ? QuizWithAnswers(props) : Quiz(props)}
    </Document>
);


export default QuizDocument;