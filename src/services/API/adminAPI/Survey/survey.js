import {session} from "../../session";
import {api} from "../../../../App"

export default function getSurvey() {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/survey`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}

export function postSurvey(survey) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(survey),
    };
    return fetch(`${api}/survey`, requestOptions).then(res => {
        return res.json();
    })
}

export function putSurvey(survey) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(survey),
    };
    return fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    })
}

export function deleteSurvey(survey_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: survey_id
        })
    };

    return fetch(`${api}/quiz`, requestOptions).then(res => {
        return res.json();
    });
}

