import SignIn from "../components/Login/login";
import {connect} from "react-redux";
import {LogIn} from "../redux/Auth/actions";
import {isLoggedIn} from "../redux/Reselects/Auth-reselect";

let mapStateToProps = (state) => {
    return {
        isLoggedIn: isLoggedIn(state)
    }
}

export default connect(mapStateToProps,{LogIn})(SignIn);

