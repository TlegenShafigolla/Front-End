export function postTakeQuestion(link, session_id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            link: link,
            session_id: session_id
        }),
    };
    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/quiz/take/question`, requestOptions).then(res => {
        return res.json();
    });
}


