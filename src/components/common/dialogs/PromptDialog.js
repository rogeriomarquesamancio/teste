import React from 'react';
import PropTypes from "prop-types";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core/';

class PromptDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            input: ""
        }   
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.handleConfirm(this.state.input);
    }

    render() {
        let {
            open,
            title, text, 
            inputLabel, inputType,
            handleClickAway, handleClose,
            closeButtonContent, confirmButtonContent
        } = this.props;
        return (
            <Dialog
                fullWidth 
                open={open} 
                onClose={handleClickAway} 
                aria-labelledby="form-dialog-title"
            >
                {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
                <form onSubmit={this.handleSubmit.bind(this)}>                    
                    <DialogContent>
                        {text && <DialogContentText>{text}</DialogContentText>}
                        <TextField
                            required
                            autoFocus
                            fullWidth
                            margin="dense"
                            id="form-dialog-input"
                            label={inputLabel || ""}
                            type={inputType || "text"}
                            value={this.state.input}
                            onChange={(e) => this.setState({input: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleClose} 
                            variant="outlined" 
                            color="secondary"
                            disableElevation 
                        >
                            {closeButtonContent}
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="secondary"
                            disableElevation 
                        >
                            {confirmButtonContent}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

PromptDialog.propTypes = {
	/**
	 * Wether the dialog is open.
	 */
	open: PropTypes.bool.isRequired,
	/**
	 * The input label.
	 */
	inputLabel: PropTypes.string,
	/**
	 * Handle the 'yes' button click.
	 */
	handleConfirm: PropTypes.func.isRequired,
	/**
	 * The title of the dialog.
	 */
	title: PropTypes.string,
	/**
	 * The text of the dialog.
	 */
	text: PropTypes.string,
	/**
	 * The type of the input.
	 */
	inputType: PropTypes.string,
	/**
	 * Handle the click away event.
	 */
	handleClickAway: PropTypes.func,
	/**
	 * Handle the on close event.
	 */
	handleClose: PropTypes.func,
	/**
	 * The content of the 'no' button.
	 */
	closeButtonContent: PropTypes.string,
	/**
	 * The content of the 'yes' button.
	 */
	confirmButtonContent: PropTypes.string
};

PromptDialog.defaultProps = {
    inputLabel: "",
    inputType: "text",
	handleClickAway: () => {},
	closeButtonContent: "CANCELAR",
	confirmButtonContent: "CONFIRMAR",
};

export default PromptDialog