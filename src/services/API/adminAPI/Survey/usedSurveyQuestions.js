import {session} from "../../session";
import {api} from "../../../../App"

export default function getUsedSurveyQuestions(survey_id) {
    const authToken = `Bearer ${session()}`;
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: authToken},
    };

    const json = fetch(`${api}/survey/used/question/${survey_id}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
}