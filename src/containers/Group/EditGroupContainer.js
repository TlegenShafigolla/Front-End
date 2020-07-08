import EditGroup from "../../components/Groups/EditGroup";
import {connect} from "react-redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    addNewMember,
    changeGroupName, deleteMembers, putGroup,
    requestGroupQuizzes,
    requestGroupSurveys,
    requestMembers
} from "../../redux/Group/actions";
import {
    disableButton,
    getMembers,
    group_name_change,
    groupName,
    isFetching,
    quizzes,
    surveys
} from "../../redux/Reselects/Group-reselect";

let mapStateToProps = (state) => {
    return {
        group_name_change: group_name_change(state),
        disableButton: disableButton(state),
        members:getMembers(state),
        group_name:groupName(state),
        quizzes:quizzes(state),
        surveys:surveys(state),
        isFetching:isFetching(state),
    }
}
export default compose(connect(mapStateToProps, {putGroup,deleteMembers,changeGroupName,addNewMember,requestMembers,requestGroupQuizzes,requestGroupSurveys}), withRouter)(EditGroup)