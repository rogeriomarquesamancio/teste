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

class SimpleDialog extends React.Component {
    render() {
        let {
            open, 
            handleClickAway, handleClose,
            title, text,
            closeButtonContent
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
                    <Button onClick={handleClose} color="primary" autoFocus>
                        {closeButtonContent}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
	/**
	 * Wether the dialog is open.
	 */
	open: PropTypes.bool.isRequired,
	/**
	 * Handle the click away event.
	 */
	handleClickAway: PropTypes.func,
	/**
	 * Handle the on close event.
	 */
	handleClose: PropTypes.func.isRequired,
	/**
	 * The title of the dialog.
	 */
	title: PropTypes.string.isRequired,
	/**
	 * The text of the dialog.
	 */
	text: PropTypes.string.isRequired,
	/**
	 * The content of the close button.
	 */
	closeButtonContent: PropTypes.string,
};

SimpleDialog.defaultProps = {
	handleClickAway: () => {},
	closeButtonContent: "OK"
};

export default SimpleDialog