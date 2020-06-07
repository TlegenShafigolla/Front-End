import {connect} from "react-redux";
import {Registration} from "../redux/Auth/actions";
import RegistrationPage from "../components/SignUp/SignUp";

let mapStateToProps = (state) => {
    return {
        register: state.Auth.Register
    }
}

export default connect(mapStateToProps, {Registration})(RegistrationPage);