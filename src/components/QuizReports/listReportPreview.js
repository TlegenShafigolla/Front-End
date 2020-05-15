import React from "react";
import getReportList from "../../services/API/adminAPI/Quiz/reports";
import ReportPreview from "./ReportPreview";
import s from './ListReportPreview.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";


class ListReportPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Reports : []
        };
    }

    render() {
        if(this.state.Reports === []){
            return (
                <div className={s.CircularProgress}>
                    <CircularProgress size={70}/>
                </div>
            );
        }
        return(
            <div className={s.Container}>
                <div className={s.Box}>
                    <div>
                        {this.state.Reports !== [] ? this.state.Reports.map((val, index) =>
                            <ReportPreview id={index} key={val._id} val={val}/>) : ' '}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        getReportList().then(val => {
            this.setState({Reports: val.Reports})
        });
    }
}

export default ListReportPreview;