import {Page, Text, View} from "@react-pdf/renderer";
import React from "react";
import {getChar} from "../../function/AnswerChar";
import {styles} from "./QuizDocument";

const Quiz = (props) => (
    <Page size="A4" style={styles.page}>
        {props.settings.addTextToTopLeftCorner ? <Text style={styles.top_left_corner_text}>{props.settings.textTopLeftCorner}</Text> : null}
        {props.settings.addTextToTopRightCorner ? <Text style={styles.top_right_corner_text}>{props.settings.textTopRightCorner}</Text> : null}
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
        }) : <Text style={styles.blank_space}>{"\n\n\n"}</Text>}
    </View>
);

export default Quiz;