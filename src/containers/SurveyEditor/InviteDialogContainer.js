import {formValueSelector, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import InviteDialog from "../../components/SurveyEditor/Editing/Invite/inviteDialog";
import {checkPerson, requestGroup, setPerson} from "../../redux/SurveyEditor/Invite/actions";
import {getGroups, getLink, getPerson, getSelectGroup} from "../../redux/Reselects/Survey_invite-reselect";

const selector = formValueSelector('inviteSurvey');
let mapStateToProps = (state) => {
    const type = selector(state, 'type');
    return {
        groups:getGroups(state),
        link: getLink(state),
        person:getPerson(state),
        selectGroup:getSelectGroup(state),
        type,
        initialValues: {
            type: 'person',
            StartDate: null,
            EndDate: null,
        }
    }
};
export default compose(
    connect(mapStateToProps,{requestGroup,checkPerson,setPerson}),
    reduxForm({
        form: 'inviteSurvey',
    }))(InviteDialog);