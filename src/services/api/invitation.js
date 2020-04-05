//
import {getSession} from "../GetSession";

export function postInvitation(invitation) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitation),
    };
    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/quiz/invitation`, requestOptions).then(res => {
        return res.json();
    });

}

export  function getInvitation(link) {
    const requestOptions = {
        method: 'GET',
    };
    const api = 'http://35.228.95.87:7000';
    const json = fetch(`${api}/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
};

export async function postEmail(link, email) {
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
    const api = 'http://35.228.95.87:7000';
    return await fetch(`${api}/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    })
}

// export function postInvitation(link, email) {
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body:JSON.stringify( {
//             email: email
//         }),
//     };
//     const api = 'http://35.228.95.87:7000';
//     return fetch(`${api}/invitation/${link}`, requestOptions).then(res => {
//         return res.json();
//     });
// }
