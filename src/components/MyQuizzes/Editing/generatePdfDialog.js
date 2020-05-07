import React from "react";
import PDFpreview from "../../../services/pdfFactory/preview";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import s from "./css/generatePdfDialog.module.css";

class GeneratePdfDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

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
                            quiz_name={this.props.quiz_name}
                            description={this.props.description}
                            questions={this.props.questions}
                        />
                        <div>
                            Settings asdnas bdabsdhasdasdasdasdasdasdasdasdasdasd
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default GeneratePdfDialog;