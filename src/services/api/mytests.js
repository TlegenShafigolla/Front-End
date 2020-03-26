import {getSession} from "../GetSession";

export default function getTests() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const api = 'http://35.228.95.87:7000';
    const json = fetch(`${api}/profile`, requestOptions).then(res => {
        return res.json();
        console.log('request')
    });
    return json;
}