import React from 'react'
import s from './editQuizz.module.css'
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

class editQuiz extends React.Component {
    render() {

        return (

                <div className={s.body}>
                    <div className={s.edit}>
                          <div className={s.settings}>
                              settings
                          </div>
                          <div className={s.questionedit}>
                              test
                          </div>
                        <IconButton color='primary' className={s.plusebutton} >
                            <AddIcon fontSize='large'/>
                        </IconButton>
                    </div>

                    <div className={s.questions}>
                        questions
                    </div>
                </div>

        );
    }
}

export default editQuiz;
