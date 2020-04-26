export function postQuizAnswer(link, session_id, finished, answers) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            link: link,
            session_id: session_id,
            finished:finished,
            answers:answers,

        }),
    };
    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/take/answer`, requestOptions).then(res => {
        return res.json();
    });
}
