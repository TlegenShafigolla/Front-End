import {api} from "../../../App"

export function registration(name,surname,password,occupation,email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            name: name,
            password: password,
            occupation: occupation,
            surname: surname
        }),
    };
    return fetch(`${api}/register`, requestOptions).then(res => {
        return res.json();
    })
}