export function getInvitation(link) {
    const requestOptions = {
        method: 'GET',
    };
    const api = 'http://localhost:3000';
    const json = fetch(`${api}/quiz/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
};

export  function postInvitation(link, email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email
        }),
    };
    const api = 'http://localhost:3000';
    return fetch(`${api}/quiz/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    })
}


