import {session} from "../../session";
import {api} from "../../../../App";

export function getGroupSurveys(group_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {

        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/group/survey/${group_id}`, requestOptions).then(res => {
        return res.json();
    });
}