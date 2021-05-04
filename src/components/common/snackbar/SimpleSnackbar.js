import React from 'react';
import PropTypes from "prop-types";
import {
    Button,
    Snackbar,
    IconButton,
} from '@material-ui/core/';

import CloseIcon from '@material-ui/icons/Close';

class SimpleSnackbar extends React.Component {
    render() {
        let {
            open, handleClose,
            vertical, horizontal, 
            autoHideDuration, message,
            handleButtonClick, buttonContent             
        } = this.props;
        return (
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={autoHideDuration}
                message={message}
                onClose={handleClose}
                open={open}
                action={
                    <React.Fragment>
                        {handleButtonClick && (
                            <Button color="secondary" size="small" onClick={handleButtonClick}>
                                {buttonContent}
                            </Button>
                        )}
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        );
    }
}

SimpleSnackbar.propTypes = {
	/**
	 * Wether the snackbar is open.
	 */
	open: PropTypes.bool.isRequired,
	/**
	 * The vertical position of the snackbar.
	 */
	vertical: PropTypes.string,
	/**
	 * The horizontal position of the snackbar.
	 */
	horizontal: PropTypes.string,
	/**
	 * The duration of the snackbar.
	 */
	autoHideDuration: PropTypes.number,
	/**
	 * The message of the dialog.
	 */
	message: PropTypes.string.isRequired,
	/**
	 * Handle the button click event.
	 */
	handleButtonClick: PropTypes.func,
	/**
	 * Handle the on close event.
	 */
	handleClose: PropTypes.func.isRequired,
	/**
	 * The content of the button.
	 */
	buttonContent: PropTypes.any,
};

SimpleSnackbar.defaultProps = {
    vertical: 'bottom', 
    horizontal: 'center',
    autoHideDuration: 5000,
	buttonContent: "OK",
};

export default SimpleSnackbar