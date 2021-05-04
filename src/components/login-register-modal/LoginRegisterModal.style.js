import { defaultStyles } from "../../assets/jss";

const style = theme => ({
    modalCard: {
        width: 420,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
    },
    tabs: {
        marginBottom: theme.spacing(4)
    },
    navTab: {
        minWidth: "auto",
        fontWeight: "600",
        fontSize: "16px",
        color: theme.palette.text.primary
    },
    input: {
        width: "100%",
        marginBottom: theme.spacing(3)
    },
    inputLabel: {
        color: `${theme.palette.text.primary}!important`
    },
    notchedOutline: {
        borderColor: "#ffffff80"
    },
    buttonLabel: {
        fontWeight: "600"
    },
    logo: {
        height: theme.spacing(5),
        width: theme.spacing(5),
    },
    authButton: {
        marginBottom: theme.spacing(2)
    },
    authButtonLabel: {
        justifyContent: "flex-start"
    },
    buttonDivider: {
        marginRight: theme.spacing(1)
    },
    cardText: {
        color: "white"
    },
    resetPasswordButton: {
        marginTop: theme.spacing(1)
    },
    ...defaultStyles(theme)
});

export default style;