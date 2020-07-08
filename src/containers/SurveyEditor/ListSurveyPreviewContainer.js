import {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import React from "react";
import ListSurveyPreviewPage from "../../components/SurveyEditor/Preview/listSurveysPreview";
import {addNewSurvey, deleteSurveys, requestSurvey} from "../../redux/SurveyEditor/actions";
import {disableButton, getId, getSurvey, isFetching} from "../../redux/Reselects/SurveyEditor-reselect";
import Preloader from "../../components/common/Preloader";
import {postInvite} from "../../redux/SurveyEditor/Invite/actions";
import {getGroups, getPerson, getSelectGroup} from "../../redux/Reselects/Survey_invite-reselect";


const ListSurveyPreview = (props) => {
    let [DeleteSurvey, openDeleteSurvey] = useState(false);
    let [Invite, openInvite] = useState(false);
    let [id, setId] = useState(null);
    let [noQuestionSnackbar, openNoQuestionSnackbar] = useState(false);

    let addNewSurvey = () => {
        if (props.disabledButton) {
            return null;
        }
        props.addNewSurvey()
    };
    let onClickInvite = () => {
        openInvite(false)
    };
    let onClickDelete = (action, id) => {
        openDeleteSurvey(false);
        if (!action) {
            return;
        }
        deleteSurveys(id)
    };
    let deleteSurvey = (id) => {
        if (props.disabledButton) {
            return null;
        }
        props.deleteSurveys(id)
    };
    useEffect(() => {
        props.requestSurvey()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.surveys===[]]);
    let inviteDialog = (count,id) => {
        if (count === 0) {
            openNoQuestionSnackbar(true)
        } else {
            setId(id);
            openInvite(!Invite)
        }
    };
    let onSubmit = (values) => {
        const group_id=props.groups[props.selectGroup]._id;
        props.postInvite(values, id,props.group,group_id);
    };

    let openDeleteDialog = () => {
        openDeleteSurvey(true)
    };
    if (props.isFetching) {
        return <Preloader/>
    }
    if (props.id !== null) {
        props.history.push(`/admin/survey/editor/${props.id}`)
    }
    return (
        <ListSurveyPreviewPage
            addNewSurvey={addNewSurvey}
            surveys={props.surveys}
            Invite={Invite}
            onInvite={onClickInvite}
            openSnackbar={noQuestionSnackbar}
            onClickDelete={onClickDelete}
            onSubmit={onSubmit}
            postInvite={props.postInvite}
            onClickInvite={inviteDialog}
            openDeleteDialog={openDeleteDialog}
            DeleteSurvey={DeleteSurvey}
            deleteSurvey={deleteSurvey}
        />
    )
};
let mapStateToProps = (state) => {
    return {
        id: getId(state),
        surveys: getSurvey(state),
        disabledButton: disableButton(state),
        isFetching: isFetching(state),
        selectGroup:getSelectGroup(state),
        groups:getGroups(state),
        group:getPerson(state)
    }
};
export default compose(
    connect(mapStateToProps, {
        addNewSurvey,
        requestSurvey,
        deleteSurveys,
        postInvite,
    }),
    withRouter
)(ListSurveyPreview)