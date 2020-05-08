import {Page, Text, View} from "@react-pdf/renderer";
import {getChar} from "../../../function/AnswerChar";
import React from "react";
import {styles} from "./QuizDocument";

const QuizWithAnswers = (props) => (
    <Page size="A4" style={styles.page}>
        <Text style={styles.quiz_name}>{props.quiz_name}</Text>
        <Text style={styles.description}>{props.description}</Text>
        {props.questions.map((val,index) => {
            return QuizQuestion(val, index, props.answers[val._id]);
        })}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
        )} fixed />
    </Page>
);

const QuizQuestion = (val, index, answers) => (
    <View>
        <Text style={styles.question}>{(index + 1) + ". " + val.question}</Text>
        {val.type === "MULTIPLE CHOICE" ? answers.map((val, index) => {
            return <Text key={val._id} style={styles.answer}>{getChar(index) + ") " + val.answer}</Text>
        }): <Text key={answers[0]._id} style={styles.answer}>{answers[0].answer}</Text>}
    </View>
);

export default QuizWithAnswers;