import {session} from "../../session";
import {api} from "../../../../App"

export default function getUsedQuizInvitations(quiz_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/quiz/used/invitation/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}