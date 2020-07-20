import SignIn from "../components/Login/login";
import {connect} from "react-redux";
import {LogIn} from "../redux/Auth/actions";
import {isLoggedIn} from "../redux/Reselects/Auth-reselect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

let mapStateToProps = (state) => {
    return {
        isLoggedIn: isLoggedIn(state)
    }
}

export default compose (connect(mapStateToProps,{LogIn}),withRouter)(SignIn);

