import React from 'react';
import PropTypes from "prop-types";
import { Snackbar } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';

class AlertSnackbar extends React.Component {

	static SEVERITY_ERROR = "error";
	static SEVERITY_WARNING = "warning";
	static SEVERITY_INFO = "info";
	static SEVERITY_SUCCESS = "success";

    render() {
        let {
            open, handleClose,
            vertical, horizontal, 
            autoHideDuration, message,
            severity             
		} = this.props;
        return (
            <Snackbar 
                anchorOrigin={{ vertical, horizontal }}
                open={open} 
                autoHideDuration={autoHideDuration} 
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        );
    }
}

AlertSnackbar.propTypes = {
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
	 * The severity of the alert.
	 */
	severity: PropTypes.string,
	/**
	 * Handle the on close event.
	 */
	handleClose: PropTypes.func.isRequired,
};

AlertSnackbar.defaultProps = {
    vertical: 'bottom', 
    horizontal: 'center',
    autoHideDuration: 5000,
	severity: AlertSnackbar.SEVERITY_SUCCESS,
};

export default AlertSnackbar