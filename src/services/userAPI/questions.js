export function postTakeQuestion(session_id) {
    const requestOptions = {
        method: 'GET',
    };
    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/take/${session_id}`, requestOptions).then(res => {
        return res.json();
    });
}


