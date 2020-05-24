import React from "react";
import {getReportGroup} from "../../services/API/adminAPI/Group/Report";

class GroupReport extends React.Component {
    componentDidMount() {
        const path = window.location.pathname.split('/');
        getReportGroup(path[4]).then(val => console.log(val))
    }

    render() {
        return (
            <div>Report</div>
        );
    }
}

export default GroupReport;