import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import Preloader from "../../components/common/Preloader";
import ListQuizPreviewPage from "../../components/QuizEditor/Preview/listQuizPreviewPage";
import {addNewQuiz, deleteQuizzes,  requestQuiz} from "../../redux/QuizEditor/actions";
import {disableButton,  getId, getQuiz, isFetching} from "../../redux/Reselects/QuizEditor-reselect";
import {postInvite} from "../../redux/QuizEditor/Invite/actions";
import {getGroups, getPerson, getSelectGroup} from "../../redux/Reselects/Quiz_invite-reselect";

const ListQuizPreview = (props) => {
    let [DeleteQuiz, openDeleteQuiz] = useState(false);
    let [Invite, openInvite] = useState(false);
    let [id, setId] = useState(null);
    let [noQuestionSnackbar, openNoQuestionSnackbar] = useState(false);

    let onClickInvite = () => {
        openInvite(false)
    };

    let inviteDialog = (count,id) => {
        if (count === 0) {
            openNoQuestionSnackbar(true)
        } else {
            setId(id);
            openInvite(!Invite)
        }
    };


    useEffect(() => {
        props.requestQuiz()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.quizzes === []]);

    let addNewQuiz =  () => {
        if (props.disabledButton) {
            return null;
        }
        props.addNewQuiz()
    };
    let deleteQuiz = (quiz_id) => {
        if (props.disabledButton) {
            return null;
        }
        props.deleteQuizzes(quiz_id)
    };
    let openDeleteDialog = () => {
        openDeleteQuiz(true)
    };
    let onClickDelete = (action, id) => {
        openDeleteQuiz(false);
        if (!action) {
            return;
        }
        deleteQuiz(id)
    };
    let onSubmit = (values) => {
        const group_id=props.groups[props.selectGroup]._id;
        props.postInvite(values, id,props.group,group_id,openInvite);
    };

    if (props.isFetching) {
        return <Preloader/>
    }
    if (props.id !== null) {
        props.history.push(`/admin/quiz/editor/${props.id}`)
    }
    return (
        <ListQuizPreviewPage onInvite={onClickInvite}
                             openSnackbar={noQuestionSnackbar}
                             onClickInvite={inviteDialog}
                             quizzes={props.quizzes}
                             onClickDelete={onClickDelete}
                             Invite={Invite}
                             openDeleteDialog={openDeleteDialog}
                             addNewQuiz={addNewQuiz} deleteQuiz={deleteQuiz}
                             DeleteQuiz={DeleteQuiz}
                             onSubmit={onSubmit}
                             />
    );

};

let mapStateToProps = (state) => {
    return {
        quizzes: getQuiz(state),
        id: getId(state),
        disabledButton: disableButton(state),
        isFetching: isFetching(state),
        selectGroup:getSelectGroup(state),
        groups:getGroups(state),
        group:getPerson(state)
    }
};
export default compose(
    connect(mapStateToProps, {
        requestQuiz,
        addNewQuiz, deleteQuizzes,
        postInvite
    }),
    withRouter
)(ListQuizPreview)