import React from 'react';
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core/';

class ConfirmDialog extends React.Component {
    render() {
        let {
            open, handleClickAway,
            title, text,
            handleNo, handleYes,
            noButtonContent, yesButtonContent
        } = this.props;
        return (
            <Dialog
                fullWidth 
                open={open}
                onClose={handleClickAway}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleNo} 
                        variant="contained" 
                        color="secondary"
                        disableElevation 
                    >
                        {noButtonContent}
                    </Button>
                    <Button 
                        onClick={handleYes} 
                        variant="contained" 
                        color="primary" 
                        disableElevation 
                        autoFocus
                    >
                        {yesButtonContent}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
	/**
	 * Wether the dialog is open.
	 */
	open: PropTypes.bool.isRequired,
	/**
	 * The title of the dialog.
	 */
	title: PropTypes.string.isRequired,
	/**
	 * The text of the dialog.
	 */
	text: PropTypes.string.isRequired,
	/**
	 * Handle the click away event.
	 */
	handleClickAway: PropTypes.func,
	/**
	 * Handle the 'no' button click.
	 */
	handleNo: PropTypes.func.isRequired,
	/**
	 * Handle the 'yes' button click.
	 */
	handleYes: PropTypes.func.isRequired,
	/**
	 * The content of the 'no' button.
	 */
	noButtonContent: PropTypes.string,
	/**
	 * The content of the 'yes' button.
	 */
	yesButtonContent: PropTypes.string
};

ConfirmDialog.defaultProps = {
	handleClickAway: () => {},
	noButtonContent: "FECHAR",
	yesButtonContent: "CONFIRMAR",
};

export default ConfirmDialog