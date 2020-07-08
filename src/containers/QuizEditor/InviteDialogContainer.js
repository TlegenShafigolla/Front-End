import {formValueSelector, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import InviteDialog from "../../components/QuizEditor/Editing/Invite/inviteDialog";
import {getGroups, getLink, getPerson, getSelectGroup} from "../../redux/Reselects/Quiz_invite-reselect";
import {checkPerson, requestGroup, setPerson} from "../../redux/QuizEditor/Invite/actions";

const selector = formValueSelector('invite');
let mapStateToProps = (state) => {
    const type = selector(state, 'type');
    return {
        groups: getGroups(state),
        link: getLink(state),
        person:getPerson(state),
        selectGroup:getSelectGroup(state),
        type,
        initialValues: {
            type: 'person',
            ShowResult: false,
            Mixed: false,
            StartDate: null,
            EndDate: null,
            TimeLimit: null,
        }
    }
};
export default compose(
    connect(mapStateToProps,{requestGroup,setPerson,checkPerson}),
    reduxForm({
        form: 'invite',
    }))(InviteDialog);