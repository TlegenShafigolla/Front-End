import {compose} from "redux";
import GroupsPreview from "../../components/Groups/GroupsPreview";
import {connect} from "react-redux";
import {createNewGroup, deleteGroups, requestGroup} from "../../redux/Group/actions";
import {disableButton, getGroups, id} from "../../redux/Reselects/Group-reselect";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        id: id(state),
        groups: getGroups(state),
        disableButton:disableButton(state)
    }
}
export default compose(
    connect(mapStateToProps, {requestGroup, deleteGroups, createNewGroup}),
    withRouter
)(GroupsPreview)