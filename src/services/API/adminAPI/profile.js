import {session} from "../session";
import {api} from "../../../App"


export default function Profile() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/profile`, requestOptions).then(res => {
        return res.json();
    }).catch(() => {
            return "403"
        }
    )
    return json;
}