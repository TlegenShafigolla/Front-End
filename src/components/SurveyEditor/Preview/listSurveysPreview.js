import React from "react";
import Survey from "./survey";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const ListSurveyPreviewPage = (props) => {
    return (
        <Grid container
              justify="center"
              alignItems="center">
            <Grid item lg={6} md={6} sm={8} xs={12}>
                {props.surveys.map((val, index) =>
                    <Survey key={val._id}
                            index={index}
                            onSubmit={props.onSubmit}
                            {...props}
                            last_edited_date={new Date(val.last_edited_date).toLocaleString()}
                            value={val}/>)}
                <Grid container
                      alignItems="center"
                      justify="center">
                    <Button color="primary" onClick={props.addNewSurvey}>
                        Add New Survey
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ListSurveyPreviewPage