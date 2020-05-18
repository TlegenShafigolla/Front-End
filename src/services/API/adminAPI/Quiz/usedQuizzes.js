import {session} from "../../session";
import {api} from "../../../../App"

export default function getUsedQuiz() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/quiz/used`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}