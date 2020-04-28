import {getSession} from "../GetSession";
import {api} from "../../App"


export default function getProfile() {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/profile`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}