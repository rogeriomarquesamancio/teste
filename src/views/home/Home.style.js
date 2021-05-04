import {defaultStyles} from "../../assets/jss/";

const styles = theme => ({
    input: {
        width: "100%",
        marginBottom: theme.spacing(3)
    },
    ...defaultStyles(theme)
});

export default styles;