import {api} from "../../../../App"

export function getInvitation(link) {
    const requestOptions = {
        method: 'GET',
    };
    const json = fetch(`${api}/survey/invitation/${link}`, requestOptions).then(res => {
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
    return fetch(`${api}/survey/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    })
}
