import React from "react";
import PDFpreview from "../../../services/Factories/QuizPdf/preview";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import s from "./css/generatePdfDialog.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

class GeneratePdfDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAnswers: false,
            addTextToTopLeftCorner: false,
            addTextToTopRightCorner: false,
            textTopLeftCorner: '',
            textTopRightCorner: '',
            topLeftCornerTypingTimeout: 0,
            topRightCornerTypingTimeout: 0,
        };
    }

    setShowAnswer = (event) => {
        this.setState({showAnswers: event.target.checked});
    };

    setAddTextToTopLeftCorner = (event) => {
        this.setState({addTextToTopLeftCorner: event.target.checked});
    };

    setAddTextToTopRightCorner = (event) => {
        this.setState({addTextToTopRightCorner: event.target.checked});
    };

    typingTextTopLeftCorner = (event) => {
        if (this.state.topLeftCornerTypingTimeout) {
            clearTimeout(this.state.topLeftCornerTypingTimeout);
        }
        const str = event.target.value;
        this.setState({typingTimeout: setTimeout(() => this.setTextTopLeftCorner(str), 5000)});
    };

    setTextTopLeftCorner(str) {
        this.setState({textTopLeftCorner: str});
    }

    typingTextTopRightCorner = (event) => {
        if (this.state.topRightCornerTypingTimeout) {
            clearTimeout(this.state.topRightCornerTypingTimeout);
        }
        const str = event.target.value;
        this.setState({typingTimeout: setTimeout( () => this.setTextTopRightCorner(str), 5000)});
    };

    setTextTopRightCorner = (str) => {
        this.setState({textTopRightCorner: str});
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
                            width={600}
                            height={700}
                            quiz_name={this.props.quiz_name}
                            description={this.props.description}
                            questions={this.props.questions}
                            answers={this.props.answers}
                            settings={this.state}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.addTextToTopLeftCorner}
                                        onChange={this.setAddTextToTopLeftCorner}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Add text to Top-Left Corner"
                            />
                            <TextField
                                disabled={!this.state.addTextToTopLeftCorner}
                                id="addTextToTopLeftCorner"
                                label="Top-Left Corner"
                                variant="filled"
                                onChange={this.typingTextTopLeftCorner}/>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.addTextToTopRightCorner}
                                        onChange={this.setAddTextToTopRightCorner}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Add text to Top-Right Corner"
                            />
                            <TextField
                                disabled={!this.state.addTextToTopRightCorner}
                                id="addTextToTopRightCorner"
                                label="Top-Right Corner"
                                variant="filled"
                                onChange={this.typingTextTopRightCorner}/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default GeneratePdfDialog;