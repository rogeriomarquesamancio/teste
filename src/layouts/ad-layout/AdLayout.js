import React from "react";
import { Grid, Hidden } from "@material-ui/core/";
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import { red, indigo } from '@material-ui/core/colors';

import styles from "./AdLayout.style";
import '../layout.css';

import { SimpleDialog, PromptDialog, ConfirmDialog } from "../../components/common/dialogs";
import { SimpleSnackbar, AlertSnackbar } from "../../components/common/snackbar";

var palette = {
	type: "dark",
	primary: {
		main: indigo[500],
		contrastText: "#fff"
	},
	secondary: {
		main: red[800],
		contrastText: "#fff"
	},
	divider: "#ffffff80",
	contrastThreshold: 3,
	tonalOffset: 0.2,
}

var typography = {
	fontFamily: [
		'Montserrat',
		'Roobert',
		'"Helvetica Neue"',
		'Helvetica',
		'Arial',
		'sans-serif'
	].join(','),
}

class AdLayout extends React.Component {


	constructor(props) {
		super(props);

		let theme = createMuiTheme({ palette, typography });
		theme = responsiveFontSizes(theme);

		this.state = {
			theme: theme,
			dialogType: null,
			dialogOptions: null,
			snackbarType: null,
			snackbarOptions: null,
			modalLogin: false
		};
	}




	render() {
		const { classes, children } = this.props;
		const { theme } = this.state;


		const childrenWithProps = React.Children.map(children, child =>
			React.cloneElement(child)
		);

		return (
			<ThemeProvider theme={theme}>
				<div className={classes.root}>
					<Grid
						container
						spacing={3}
						className={classes.container}
					>
						<Grid item md={3} xs={2}>

						</Grid>
						<Grid item md={6} xs={12}>
							<main>
								{childrenWithProps}
							</main>
						</Grid>
						<Grid item md={3} xs={2}>

						</Grid>
					</Grid>
				</div>
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(AdLayout)