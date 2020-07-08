import {createGroup, deleteGroup, getListGroup, putGroupName} from "../../services/API/adminAPI/Group/group";
import {addMembers, deleteMember, getMembers} from "../../services/API/adminAPI/Group/members";
import {getGroupQuizzes} from "../../services/API/adminAPI/Group/quizzes";
import {getGroupSurveys} from "../../services/API/adminAPI/Group/surveys";
import {stopSubmit} from "redux-form";

export const SET_GROUP = "GROUPS/SET_GROUP"
export const DELETE_GROUP = "GROUPS/DELETE_GROUP"
export const PUSH_GROUP = "GROUPS/PUSH_GROUP"
export const DISABLE_BUTTON = "GROUPS/DISABLE_BUTTON"
export const SET_MEMBERS = "GROUPS/SET_MEMBERS"
export const GROUP_NAME = "GROUPS/GROUP_NAME"
export const CHANGE_GROUP_NAME = "GROUPS/CHANGE_GROUP_NAME"
export const QUIZZES = "GROUPS/QUIZZES"
export const SURVEYS = "GROUPS/SURVEYS"
export const IS_FETCHING = "GROUPS/IS_FETCHING"
export const PUSH_MEMBER = "GROUPS/PUSH_MEMBER"
export const POP_MEMBER = "GROUPS/POP_MEMBER"
export const DISABLE_GROUP = "GROUPS/DISABLE_GROUP"

const setGroup = (data) => ({type: SET_GROUP, data})
const deleteGroupDispatch = (data) => ({type: DELETE_GROUP, data})
const pushGroup = (data) => ({type: PUSH_GROUP, data})
const disableButton = (data) => ({type: DISABLE_BUTTON, data})
const setMembers = (data) => ({type: SET_MEMBERS, data})
const setGroupName = (data) => ({type: GROUP_NAME, data})
const setQuizzes = (data) => ({type: QUIZZES, data})
const setSurveys = (data) => ({type: SURVEYS, data})
const isFetching = (data) => ({type: IS_FETCHING, data})
const pushMember = (data) => ({type: PUSH_MEMBER, data})
const popMember = (data) => ({type: POP_MEMBER, data})
const group_name = () => ({type: DISABLE_GROUP})
export const changeGroupName = (data) => ({type: CHANGE_GROUP_NAME, data})
export const deleteGroups = (id) => async (dispatch) => {
    dispatch(disableButton(true))
    let data = await deleteGroup(id);
    dispatch(deleteGroupDispatch(data))
    dispatch(disableButton(false))
}
export const createNewGroup = (id) => async (dispatch) => {
    dispatch(disableButton(true))
    let data = await createGroup("New Group")
    id(data._id)
    dispatch(pushGroup(data))
    dispatch(disableButton(false))
}
export const requestGroup = () => async (dispatch) => {
    let data = await getListGroup()
    dispatch(setGroup(data.groups))
}
export const requestMembers = (id) => async (dispatch) => {
    dispatch(isFetching(true))
    let data = await getMembers(id)
    dispatch(setMembers(data.members))
    dispatch(setGroupName(data.group_name))
    dispatch(isFetching(false))
}
export const requestGroupQuizzes = (id) => async (dispatch) => {
    dispatch(isFetching(true))
    let data = await getGroupQuizzes(id)
    dispatch(setQuizzes(data.invitations))
    dispatch(isFetching(false))
}
export const requestGroupSurveys = (id) => async (dispatch) => {
    dispatch(isFetching(true))
    let data = await getGroupSurveys(id)
    dispatch(setSurveys(data.invitations))
    dispatch(isFetching(false))
}
export const addNewMember = (id, email) => async (dispatch) => {
    let data = await addMembers(id, email)
    if (data.Error === undefined) {
        dispatch(pushMember(data))
    } else {
        let action = stopSubmit("members", {_error: true});
        dispatch(action)
    }
}
export const deleteMembers = (member_id, id) => async (dispatch) => {
    dispatch(disableButton(true))
    let data = await deleteMember(member_id, id)
    dispatch(popMember(data))
    dispatch(disableButton(false))
}
export const putGroup = (id, name) => async (dispatch) => {
    await putGroupName(id,name)
    dispatch(group_name())
}