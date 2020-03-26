import makeStyles from "@material-ui/core/styles/makeStyles";
const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
export const useStyle = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        display: 'flex',
        width: 240,
        background:'#272827',
    },

}))

