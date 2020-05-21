import {session} from "../../session";
import {api} from "../../../../App"

export default function getUsedSurveyInvitations(survey_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/survey/used/invitation/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}