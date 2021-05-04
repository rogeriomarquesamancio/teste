import React from "react";
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import { red, indigo } from '@material-ui/core/colors';

import styles from "./DefaultLayout.style";
import '../layout.css';

import { SimpleDialog, PromptDialog, ConfirmDialog } from "../../components/common/dialogs";
import { SimpleSnackbar, AlertSnackbar } from "../../components/common/snackbar";

const palette = {
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

const typography = {
    fontFamily: [
		'Montserrat',
		'Roobert',
		'"Helvetica Neue"',
		'Helvetica',
		'Arial',
		'sans-serif'
    ].join(','),
}

class DefaultLayout extends React.Component {
	
	static DIALOG_SIMPLE = 1;
	static DIALOG_PROMPT = 2;
	static DIALOG_CONFIRM = 3;
	
	static SNACKBAR_SIMPLE = 1;
	static SNACKBAR_ALERT = 2;

	constructor(props) {
		super(props);

		let theme = createMuiTheme({palette, typography});
		theme = responsiveFontSizes(theme);

		this.state = {
			theme,
			dialogType: null,
			dialogOptions: null,
			snackbarType: null,
			snackbarOptions: null
		};
	}

    showSimpleDialog(title, text, onClose){
        this.setState({
			dialogType: DefaultLayout.DIALOG_SIMPLE,
            dialogOptions: { 
                open: true, 
                title, text, 
                handleClose: () => this.closeDialog(onClose)
            }
        })
	}
	
	showConfirmDialog(title, text, handleNo, handleYes, noButtonContent, yesButtonContent) {
		this.setState({
			dialogType: DefaultLayout.DIALOG_CONFIRM,
			dialogOptions: {
				open: true,
				title, text,
				handleNo: () => this.closeDialog(handleNo),
				handleYes: () => this.closeDialog(handleYes),
				noButtonContent, yesButtonContent
			}
		})
	}
	
	showPromptDialog(inputLabel, onConfirm, onClose, title, text, inputType) {
		this.setState({
			dialogType: DefaultLayout.DIALOG_PROMPT,
			dialogOptions: {
				open: true,
				title, text,
				inputLabel, inputType,
				handleClose: () => this.closeDialog(onClose),
				handleConfirm: (text) => this.closeDialog(onConfirm, text),
			}
		})
	}

    closeDialog(callback, res){
        let {dialogOptions} = this.state;
        dialogOptions.open = false;
        this.setState({dialogOptions}, () => {
            if(typeof(callback) === "function") callback(res);
        })
	}	

    showSimpleSnackbar(message, onClose, vertical, horizontal){
        this.setState({
			snackbarType: DefaultLayout.SNACKBAR_SIMPLE,
            snackbarOptions: { 
                open: true, 
				message, 
				vertical, horizontal,
                handleClose: () => this.closeSnackbar(onClose)
            }
        })
	}

    showAlertSnackbar(message, severity, onClose, vertical, horizontal){
        this.setState({
			snackbarType: DefaultLayout.SNACKBAR_ALERT,
            snackbarOptions: { 
                open: true, 
				message, severity,
				vertical, horizontal,
                handleClose: () => this.closeSnackbar(onClose)
            }
        })
	}

	closeSnackbar(callback){
        let {snackbarOptions} = this.state;
        snackbarOptions.open = false;
        this.setState({snackbarOptions}, () => {
            if(typeof(callback) === "function") callback();
        })
	}	

	dialog(){
		const { dialogType, dialogOptions } = this.state;
		if(dialogType === DefaultLayout.DIALOG_SIMPLE) {
			return <SimpleDialog {...dialogOptions}/>
		} else if(dialogType === DefaultLayout.DIALOG_PROMPT) {
			return <PromptDialog {...dialogOptions}/>
		} else if(dialogType === DefaultLayout.DIALOG_CONFIRM) {
			return <ConfirmDialog {...dialogOptions}/>
		} else return;
	}

	snackbar(){
		const { snackbarType, snackbarOptions } = this.state;
		if(snackbarType === DefaultLayout.SNACKBAR_SIMPLE) {
			return <SimpleSnackbar {...snackbarOptions}/>
		} else if(snackbarType === DefaultLayout.SNACKBAR_ALERT) {
			return <AlertSnackbar {...snackbarOptions}/>
		} else return;
	}

	render() {
		const { classes, children } = this.props;
		const { theme } = this.state;

		const actions = {
			showSimpleDialog: this.showSimpleDialog.bind(this),
			showConfirmDialog: this.showConfirmDialog.bind(this),
			showPromptDialog: this.showPromptDialog.bind(this),
			showSimpleSnackbar: this.showSimpleSnackbar.bind(this),
			showAlertSnackbar: this.showAlertSnackbar.bind(this),
		}

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, {actions})
		);
		
		return (
			<ThemeProvider theme={theme}>
				<div className={classes.root}>
					<main>
						{childrenWithProps}
						{this.dialog()}
						{this.snackbar()}
					</main>
				</div>
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(DefaultLayout)