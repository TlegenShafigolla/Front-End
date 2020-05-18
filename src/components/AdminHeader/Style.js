import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        margin: 'auto',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,

            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: "100%",
        marginLeft: 240,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },


    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

}));

