import {getSession} from "../GetSession";
import {api} from "../../App"

export default function postFeedback(feedback) {
    const authToken = `Bearer ${getSession()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "feedback": feedback,
        }),
    };

    return fetch(`${api}/feedback`, requestOptions).then(res => {
        return res.json();
    });
}