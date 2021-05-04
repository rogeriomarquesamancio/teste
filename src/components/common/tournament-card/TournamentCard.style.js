import {defaultStyles} from "../../../assets/jss/";

const TournamentCardStyle = theme => ({
    tableTitle: {
        textAlign: "left",
        opacity: "0.65",
        fontSize: "11px",
        width: "160px",
    },
    tableContent: {
        fontSize: "12px",
        fontWeight: 700,
	},
    cardMedia: {
        height: "250px"
    }
	,...defaultStyles(theme)
});

export default TournamentCardStyle;
