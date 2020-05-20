import {session} from "../../session";
import {api} from "../../../../App"

export default function getUsedQuizQuestions(quiz_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/quiz/used/question/${quiz_id}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}