import React from "react";
import getReportList from "../../services/API/adminAPI/Quiz/reports";
import ReportPreview from "./ReportPreview";
import Grid from "@material-ui/core/Grid";
import Preloader from "../common/Preloader";


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
                <Preloader/>
            );
        }
        return(
            <Grid container
                  alignItems="flex-start"
                  justify="center"
            >
                <Grid item lg={3} md={3} sm={6} xl={9} xs={12}>
                        {this.state.Reports.map((val, index) =>
                            <ReportPreview id={index} key={val._id} val={val}/>) }
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        getReportList().then(val => {
            this.setState({Reports: val.Reports})
        });
    }
}

export default ListReportPreview;