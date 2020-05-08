import React from "react";
import PDFpreview from "../../../services/pdfFactory/preview";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import s from "./css/generatePdfDialog.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class GeneratePdfDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAnswers: false,
        };
        console.log(this.props.answers);
    }

    setShowAnswer = (event) => {
        this.setState({showAnswers: event.target.checked});
    };

    render() {
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                onClose={this.props.onClose}
                aria-labelledby="max-width-dialog-title"
                open={this.props.open}>
                <DialogTitle id="max-width-dialog-title">Export PDF</DialogTitle>
                <DialogContent>
                    <div className={s.Pdf}>
                        <PDFpreview
                            width={500}
                            height={700}
                            showAnswers={this.state.showAnswers}
                            quiz_name={this.props.quiz_name}
                            description={this.props.description}
                            questions={this.props.questions}
                            answers={this.props.answers}
                        />
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.showAnswers}
                                        onChange={this.setShowAnswer}
                                        color="primary"
                                    />
                                }
                                label="Show Answers"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default GeneratePdfDialog;