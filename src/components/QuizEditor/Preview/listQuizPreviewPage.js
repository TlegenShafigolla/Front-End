import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import ShowQuiz from "./showQuiz";

const ListQuizPreviewPage = (props) => {
    return (
        <Grid container
              justify="center"
              alignItems="center"
        >
            <Grid item lg={6} md={6} sm={8} xs={12}>
                {props.quizzes.map((val, index) =>
                    <ShowQuiz
                        key={val._id}
                        onSubmit={props.onSubmit}
                        {...props}
                        index={index}
                        value={val}
                        last_edited_date={new Date(val.last_edited_date).toLocaleString()}
                    />
                )}
                <Grid container
                      alignItems="center"
                      justify="center"
                >
                    <IconButton color="primary" onClick={props.addNewQuiz}>
                        <AddIcon fontSize='large'/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default ListQuizPreviewPage;
