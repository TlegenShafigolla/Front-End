import {getSession} from "../GetSession";

export default function getProfile() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://localhost:3000';
    const json = fetch(`${api}/profile`, requestOptions).then(res => {
        return res.json();

    });
    return json;
}