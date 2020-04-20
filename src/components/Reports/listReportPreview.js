import React from "react";
import getReportList from "../../services/adminAPI/reports";
import ReportPreview from "./ReportPreview";
import s from './ListReportPreview.module.css'
import CircularProgress from "@material-ui/core/CircularProgress";


class ListReportPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reports : []
        };
    }

    render() {
        if(this.state.report === []){
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
                        {this.state.reports !== [] ? this.state.reports.map((val, index) =>
                            <ReportPreview id={index} key={val.id} val={val}/>) : ' '}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        getReportList().then(val => this.setState({reports: val['Reports']}));
    }
}

export default ListReportPreview;