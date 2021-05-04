import React from "react";
import PropTypes from "prop-types";
import {
    Grid, Box, Avatar,
    Typography, Divider,
    Card, CardContent, CardHeader,
    Modal, Tabs, Tab,
    TextField, InputAdornment,
    Button, IconButton, Icon,
    CircularProgress
} from '@material-ui/core/';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { RestAPI, Encryption } from "../../module";

import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from "./LoginRegisterModal.style";

class LoginRegisterModal extends React.Component {

    static COLOR = "primary";

    static STEP = {
        LOGIN: "1",
        REGISTER: "2",
        RESET_PASSWORD: "3",
    };

    constructor(props) {
        super(props)
        this.state = {
            step: LoginRegisterModal.STEP.LOGIN,
            showPassword: false,
            awaitingLogin: false,
            awaitingRegister: false,
            form: {
                name: {
                    id: "name",
                    value: ""
                },
                nick: {
                    id: "nick",
                    value: ""
                },
                email: {
                    id: "email",
                    value: ""
                },
                password: {
                    id: "password",
                    value: ""
                }
            }
        }
    }

    onInputChange(id, value) {
        let { form } = this.state;
        form[id].value = value;
        this.setState({ form });
    }

    handleClickShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleLogin(e) {
        e.preventDefault();
        this.setState({ awaitingLogin: true });
      /*   RestAPI.getPasswordKey().then((res) => {
            if (res && res.svStatus) {
                const { form } = this.state;
                const body = {
                    email: form.email.value,
                    password: Encryption.encrypterInAES(form.password.value, res.data.key),
                }
            } else {
                this.setState({ awaitingLogin: false }, () => this.props.actions.showAlertSnackbar(res.msg || "Não foi possível autenticar o usuário.", "error"));
            }
        }).catch((e) => this.setState({ awaitingLogin: false }, () => {
            this.props.actions.showAlertSnackbar("Não foi possível autenticar o usuário.", "error");
        })); */
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({ awaitingRegister: true });
        const { form } = this.state;

        let user = {
            name: form.name.value,
            nick: form.nick.value,
            email: form.email.value,
            createdAt: new Date(),
            status: 1,
        }

        RestAPI.getPasswordKey().then((res) => {
            if (res && res.svStatus) {
                user.password = Encryption.encrypterInAES(form.password.value, res.data.key);
                return RestAPI.addUser(user);
            } else {
                this.setState({ awaitingRegister: false }, () => this.props.actions.showAlertSnackbar("Não foi possível cadastrar o usuário.", "error"));
            }
        }).then((res) => {
            if (res && res.svStatus) {
                this.setState({ awaitingRegister: false }, () => this.props.actions.showAlertSnackbar("Usuário cadastrado com sucesso.", "success"));
            } else {
                this.setState({ awaitingRegister: false }, () => this.props.actions.showAlertSnackbar(res.msg || "Não foi possível cadastrar o usuário.", "error"));
            }
        }).catch((e) => this.setState({ awaitingRegister: false }, () => {
            this.props.actions.showAlertSnackbar("Não foi possível cadastrar o usuário.", "error");
        }));
    }

    handleResetPassword(e) {
        e.preventDefault();
        this.setState({ awaitingResetPassword: true });
        const { form } = this.state;

        RestAPI.resetPasswordUser(form.email.value).then((res) => {
            if (res && res.svStatus) {
                this.setState({ awaitingResetPassword: false }, () =>
                    this.props.actions.showAlertSnackbar("E-mail de redefinição foi enviado com sucesso.", "success"));
            } else {
                this.setState({ awaitingResetPassword: false }, () =>
                    this.props.actions.showAlertSnackbar(res.msg || "Não foi possível concluir a requisição.", "error"));
            }
        }).catch((e) => this.setState({ awaitingResetPassword: false }, () => {
            this.props.actions.showAlertSnackbar("Não foi possível concluir a requisição.", "error");
        }));
    }

    cardContentLogin() {
        let { form, showPassword } = this.state;
        let { classes } = this.props;
        return (
            <form onSubmit={this.handleLogin.bind(this)}>
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    label="Email"
                    className={classes.input}
                    id={`login-${form.email.id}`}
                    value={form.email.value}
                    onChange={(e) => this.onInputChange(form.email.id, e.target.value)}
                    variant="outlined"
                    color={LoginRegisterModal.COLOR}
                    size="small"
                />
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword.bind(this)}
                                    edge="end"
                                    size="small"
                                >
                                    {showPassword ? <VisibilityOff fontSize="small" color="action" /> : <Visibility fontSize="small" color="action" />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    label="Senha"
                    className={classes.input}
                    type={showPassword ? 'text' : 'password'}
                    id={`login-${form.password.id}`}
                    value={form.password.value}
                    onChange={(e) => this.onInputChange(form.password.id, e.target.value)}
                    color={LoginRegisterModal.COLOR}
                    variant="outlined"
                    size="small"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color={LoginRegisterModal.COLOR}
                    disabled={this.state.awaitingLogin}
                    disableElevation
                    fullWidth
                    classes={{ label: classes.buttonLabel }}
                >
                    {this.state.awaitingLogin
                        ? <CircularProgress className="text-white" size={22} />
                        : "Entrar"
                    }
                </Button>
                <Grid container justify="center">
                    <Button size="small" onClick={() => this.setState({ step: LoginRegisterModal.STEP.RESET_PASSWORD })} className={classes.resetPasswordButton}>
                        <Typography variant="caption" color="textSecondary">
                            Esqueci minha senha
                        </Typography>
                    </Button>
                </Grid>
            </form>
        );
    }

    cardContentRegister() {
        let { form, showPassword } = this.state;
        let { classes } = this.props;
        return (
            <form onSubmit={this.handleRegister.bind(this)}>
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    color={LoginRegisterModal.COLOR}
                    variant="outlined"
                    size="small"
                    label="Nome"
                    className={classes.input}
                    id={`register-${form.name.id}`}
                    value={form.name.value}
                    onChange={(e) => this.onInputChange(form.name.id, e.target.value)}
                />
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    color={LoginRegisterModal.COLOR}
                    variant="outlined"
                    size="small"
                    label="Apelido"
                    className={classes.input}
                    id={`register-${form.nick.id}`}
                    value={form.nick.value}
                    onChange={(e) => this.onInputChange(form.nick.id, e.target.value)}
                />
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    color={LoginRegisterModal.COLOR}
                    variant="outlined"
                    size="small"
                    label="Email"
                    className={classes.input}
                    id={`register-${form.email.id}`}
                    value={form.email.value}
                    onChange={(e) => this.onInputChange(form.email.id, e.target.value)}
                />
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword.bind(this)}
                                    size="small"
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff fontSize="small" color="action" /> : <Visibility fontSize="small" color="action" />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    color={LoginRegisterModal.COLOR}
                    variant="outlined"
                    size="small"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    className={classes.input}
                    id={`register-${form.password.id}`}
                    value={form.password.value}
                    onChange={(e) => this.onInputChange(form.password.id, e.target.value)}
                />
                <Button
                    color={LoginRegisterModal.COLOR}
                    variant="contained"
                    type="submit"
                    disableElevation
                    disabled={this.state.awaitingRegister}
                    fullWidth
                    classes={{ label: classes.buttonLabel }}
                >
                    {this.state.awaitingRegister
                        ? <CircularProgress className="text-white" size={22} />
                        : "Registrar"
                    }
                </Button>
                <Grid container justify="center">
                    <Button size="small" onClick={() => this.setState({ step: LoginRegisterModal.STEP.RESET_PASSWORD })} className={classes.resetPasswordButton}>
                        <Typography variant="caption" color="textSecondary">
                            Esqueci minha senha
                        </Typography>
                    </Button>
                </Grid>
            </form>
        );
    }

    cardContentResetPassword() {
        const { form } = this.state;
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleResetPassword.bind(this)}>
                <Box mb={1} position="relative">
                    <Typography variant="body1" className={classes.cardText}>
                        Redefinir senha
                    </Typography>
                    <Typography variant="caption" className={classes.cardText}>
                        Diga-nos o endereço de e-mail associado à sua conta e nós lhe enviaremos um e-mail com um link para redefinir sua senha.
                    </Typography>
                </Box>
                <TextField
                    required
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        },
                    }}
                    InputLabelProps={{ className: classes.inputLabel }}
                    color={LoginRegisterModal.COLOR}
                    variant="outlined"
                    size="small"
                    label="Email"
                    className={classes.input}
                    id={`reset-${form.email.id}`}
                    value={form.email.value}
                    onChange={(e) => this.onInputChange(form.email.id, e.target.value)}
                />
                <Button
                    color={LoginRegisterModal.COLOR}
                    variant="contained"
                    type="submit"
                    disableElevation
                    disabled={this.state.awaitingResetPassword}
                    fullWidth
                    classes={{ label: classes.buttonLabel }}
                >
                    {this.state.awaitingResetPassword
                        ? <CircularProgress className="text-white" size={22} />
                        : "Enviar"
                    }
                </Button>
            </form>
        );
    }

    render() {
        let { classes, open, onToggle } = this.props;
        const { step, awaitingRegister, awaitingLogin, awaitingResetPassword } = this.state;
        return (
            <Modal
                open={open}
                onClose={onToggle}
                className="d-flex justify-content-center align-items-center"
                aria-labelledby="login-register-modal-title"
                aria-describedby="login-register-modal-description"
            >
                <Card className={classes.modalCard}>
                    {window.location.pathname.includes("escalacao") && (
                        <CardHeader
                            action={
                                <IconButton aria-label="settings" onClick={onToggle}>
                                    <CloseIcon />
                                </IconButton>
                            }
                        >
                        </CardHeader>
                    )}
                    <CardContent>
                        <Tabs
                            centered
                            indicatorColor={LoginRegisterModal.COLOR}
                            className={classes.tabs}
                            value={step}
                            onChange={(e, step) => this.setState({ step })}
                        >
                            <Tab disabled={awaitingRegister || awaitingResetPassword} className={classes.navTab} value={LoginRegisterModal.STEP.LOGIN} label="Entrar" />
                            <Tab disabled={awaitingLogin || awaitingResetPassword} className={classes.navTab} value={LoginRegisterModal.STEP.REGISTER} label="Registrar" />
                        </Tabs>
                        {step === LoginRegisterModal.STEP.LOGIN ? (
                            this.cardContentLogin()
                        ) : step === LoginRegisterModal.STEP.REGISTER ? (
                            this.cardContentRegister()
                        ) : step === LoginRegisterModal.STEP.RESET_PASSWORD && (
                            this.cardContentResetPassword()
                        )}
                    </CardContent>
                    <CardContent className="py-0">
                        <Grid container spacing={2} justify="center" alignItems="center">
                            <Grid item xs>
                                <Divider />
                            </Grid>
                            <Grid item xs="auto">
                                {/* <Avatar alt="header logo" className={classes.logo} variant="square" src={Logo} /> */}
                            </Grid>
                            <Grid item xs>
                                <Divider />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={1} justify="center" >
                            <Grid item xs={8} sm={7}>
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    aria-label="enter via facebook"
                                    spacing={2}
                                   /*  onClick={this.authFacebook.bind(this)} */
                                    startIcon={<Icon className="fab fa-facebook" />}
                                    classes={{ root: classes.facebookButton, label: classes.authButtonLabel }}
                                >
                                    <Divider flexItem orientation="vertical" className={classes.buttonDivider} /> Entre com Facebook
                                    </Button>
                            </Grid>
                            <Grid item xs={8} sm={7}>
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    aria-label="enter via discord"
                                    /* onClick={this.authDiscord.bind(this)} */
                                    startIcon={<Icon className="fab fa-discord" />}
                                    classes={{ root: classes.discordButton, label: classes.authButtonLabel }}
                                >
                                    <Divider flexItem orientation="vertical" className={classes.buttonDivider} /> Entre com Discord
                                    </Button>
                            </Grid>
                            <Grid item xs={8} sm={7}>
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    aria-label="enter via twitch"
                                   /*  onClick={this.authTwitch.bind(this)} */
                                    startIcon={<Icon className="fab fa-twitch" />}
                                    classes={{ root: classes.twitchButton, label: classes.authButtonLabel }}
                                >
                                    <Divider flexItem orientation="vertical" className={classes.buttonDivider} /> Entre com Twitch
                                    </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>
        );
    }
}

LoginRegisterModal.propTypes = {
    /**
     * Wether the modal is open.
     */
    open: PropTypes.bool.isRequired,
    /**
     * Function to toggle the modal.
     */
    onToggle: PropTypes.func.isRequired,
};

LoginRegisterModal.defaultProps = {
    open: false,
    onToggle: () => { }
};

export default withStyles(styles)(LoginRegisterModal)
