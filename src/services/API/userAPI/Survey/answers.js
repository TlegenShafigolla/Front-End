import {api} from "../../../../App"

export function postAnswer(link, session_id, finished, answers) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            link: link,
            finished: finished,
            answers: answers,
        }),
    };
    return fetch(`${api}/survey/take/${session_id}`, requestOptions).then(res => {
        return res.json();
    });
}
