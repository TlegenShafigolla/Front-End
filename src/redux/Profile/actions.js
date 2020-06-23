import postFeedback from "../../services/API/adminAPI/feedback";

export const SUCCESS_FEEDBACK = 'FEEDBACK/SUCCESS_FEEDBACK'
const success = () => ({type: SUCCESS_FEEDBACK})
export const feedback = (feedback) => async (dispatch) => {
    let data = await postFeedback(feedback)
    if (data.Status === "Success") {
        dispatch(success(data))
    }
}