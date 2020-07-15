import {getListGroup} from "../../../services/API/adminAPI/Group/group";
import {postInvitations} from "../../../services/API/adminAPI/Survey/invitations";

export const SET_LINK = 'SURVEY_INVITE/SET_LINK';
export const GROUPS = "SURVEY_INVITE/GROUPS";
export const SET_PERSONS = "SURVEY_INVITE/SET_PERSONS";
export const CHECK_PERSON = "SURVEY_INVITE/CHECK_PERSON";

const setLink = (data) => ({type: SET_LINK, data});
const setGroups = (data) => ({type: GROUPS, data});

export const checkPerson = (id,index) => ({type: CHECK_PERSON, id,index});
export const setPerson = (index) => ({type: SET_PERSONS, index});
export const requestGroup = () => async (dispatch) => {
    let data = await getListGroup();
    dispatch(setGroups(data.groups));
    dispatch(setPerson(0))
};
export const postInvite = (value, id,groups,group_id,invite) => async (dispatch) => {
    let Start = value.StartDate === null ? null : value.StartDate.replace('T', ' ');
    let End = value.EndDate === null ? null : value.EndDate.replace('T', ' ');
    let invitations = {
        survey_id: id,
        start_date: Start,
        end_date: End,
    };
    switch (value.type) {
        case 'person': {
            invitations = {
                ...invitations, name: value.name,
                surname: value.surname,
                email: value.email,
            };
            break
        }
        case 'group': {
            const group=groups.filter(id=>id._id!==0);
            const groupPerson=group.map(val=>val.email);
            invitations = {
                ...invitations,
                group_id:group_id,
                group: groupPerson,
            };
            break
        }
        case 'link': {
            invitations = {
                ...invitations,
                public: true,
            };
            break
        }
        default:
            return null;
    }
    let val = await postInvitations(invitations);
    dispatch(setLink(val.link));
    invite(false)
    console.log(val)
};