import {connect} from "react-redux";
import {Registration} from "../redux/Auth/actions";
import RegistrationPage from "../components/SignUp/SignUp";
import {Register} from "../redux/Reselects/Auth-reselect";

let mapStateToProps = (state) => {
    return {
        register: Register(state)
    }
}

export default connect(mapStateToProps, {Registration})(RegistrationPage);