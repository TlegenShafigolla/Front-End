import {createGroup, deleteGroup, getListGroup} from "../../services/API/adminAPI/Group/group";

export const SET_GROUP = "GROUPS/SET_GROUP"
export const DELETE_GROUP = "GROUPS/DELETE_GROUP"
export const PUSH_GROUP = "GROUPS/PUSH_GROUP"
export const DISABLE_BUTTON = "GROUPS/DISABLE_BUTTON"

const setGroup = (data) => ({type: SET_GROUP, data})
const deleteGroupDispatch = (data) => ({type: DELETE_GROUP, data})
const pushGroup=(data)=>({type:PUSH_GROUP,data})
const disableButton=(data)=>({type:DISABLE_BUTTON,data})

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