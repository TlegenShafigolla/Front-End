import {api} from "../../App"

export function postQuizAnswer(link, session_id, finished, answers) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            link: link,
            finished: finished,
            answers:answers,
        }),
    };
    return fetch(`${api}/quiz/take/${session_id}`, requestOptions).then(res => {
        return res.json();
    });
}
