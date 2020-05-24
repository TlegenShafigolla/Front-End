import {session} from "../../session";
import {api} from "../../../../App";

export function getGroupQuizzes(group_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {

        method: 'GET',
        headers: {Authorization: authToken},
    };

    return fetch(`${api}/group/quiz/${group_id}`, requestOptions).then(res => {
        return res.json();
    });
}