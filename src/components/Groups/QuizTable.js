import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import s from "./QuizTable.module.css";

class QuizTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
        };
    }

    columns = [
        {id: 'quiz', label: 'Quiz', minWidth: 130},
        {id: 'invited_date', label: 'Invited date', minWidth: 70},
        {
            id: 'completed',
            label: 'Completed',
            minWidth: 60,
            align: 'right',
        },
    ];

    createData = (quiz, completed, invited_date) => {
        return {quiz, completed, invited_date};
    };

    initializeRows = (invitations) => {
        const arr = [];
        invitations.map(invitation => {
            const completed = `${invitation.completed}/${invitation.group.length}`;
            arr.push(this.createData(invitation.used_quiz.quiz_name, completed, invitation.invited_date));
        });
        return arr;
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({page: 0, rowsPerPage: +event.target.value});
    };


    render() {
        const rows = this.props.quizzes ? this.initializeRows(this.props.quizzes) : [];
        return (
            <div className={s.Root}>
                <TableContainer className={s.Container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row,index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {this.columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

export default QuizTable;