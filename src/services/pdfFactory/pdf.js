import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
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

    }
});

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

// Create Document Component
const QuizDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.quiz_name}>{props.quiz_name}</Text>
            <Text style={styles.description}>{props.description}</Text>
            {props.questions.map((val,index) => {
                return QuizQuestion(val, index);
            })}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);

const QuizQuestion = (val, index) => (
    <Text break>{index + ". " + val.question}</Text>
);

export default QuizDocument;