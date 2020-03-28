import React from 'react'
import s from './editQuizz.module.css'
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

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
                    </div>
                    <div className={s.questions}>
                        questions
                    </div>
                </div>

        );
    }
}

export default editQuiz;
