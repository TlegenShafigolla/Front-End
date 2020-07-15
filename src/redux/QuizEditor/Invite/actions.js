import {postInvitations} from "../../../services/API/adminAPI/Quiz/invitations";
import {getListGroup} from "../../../services/API/adminAPI/Group/group";

export const SET_LINK = 'QUIZ_INVITE/SET_LINK';
export const GROUPS = "QUIZ_INVITE/GROUPS";
export const SET_PERSONS = "QUIZ_INVITE/SET_PERSONS";
export const CHECK_PERSON = "QUIZ_INVITE/CHECK_PERSON";

const setLink = (data) => ({type: SET_LINK, data});
const setGroups = (data) => ({type: GROUPS, data});

export const checkPerson = (id,index) => ({type: CHECK_PERSON, id,index});
export const setPerson = (index) => ({type: SET_PERSONS, index});
export const requestGroup = () => async (dispatch) => {
    let data = await getListGroup();
    dispatch(setGroups(data.groups));
    dispatch(setPerson(0))
};
export const postInvite = (values, id,groups,group_id,invite) => async (dispatch) => {
    let Start = values.StartDate === null ? null : values.StartDate.replace('T', ' ');
    let End = values.EndDate === null ? null : values.EndDate.replace('T', ' ');
    let time = values.TimeLimit === null ? null : values.TimeLimit.split(':');
    let t = values.TimeLimit === null ? null : Number(time[0]) * 60 + Number(time[1]);
    let invitation = {
        quiz_id: id,
        start_date: Start,
        end_date: End,
        time_limit: t,
        mixed: values.Mixed,
        showResults: values.ShowResult
    };
    switch (values.type) {
        case 'person': {
            invitation = {
                ...invitation, name: values.name,
                surname: values.surname,
                email: values.email,
            };
            break;
        }
        case 'group': {
            const group=groups.filter(id=>id._id!==0);
            const groupPerson=group.map(val=>val.email);
            invitation = {
                ...invitation,
                group_id:group_id,
                group: groupPerson,
            };
            break
        }
        case 'link': {
            invitation = {
                ...invitation,
                public: true,
            };
            break;
        }
        default:
            return null;
    }
    let data = await postInvitations(invitation);
    dispatch(setLink(data.link));
    invite(false)
    console.log(data)
};