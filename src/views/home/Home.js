import React from "react";
import { RestAPI, Cookies } from "../../module";
import {
    Box, Grid,
    Button, Card,
    TextField, CardContent,
    CardHeader, Typography
} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import styles from "./Home.style";
import LoginRegisterModal from "../../components/login-register-modal";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openLoginModal: false,
            form: {
                filter: {
                    id: "filter",
                    value: ""
                },
                nome: {
                    id: "nome",
                    value: ""
                },
                preco:
                {
                    id: "preco",
                    value: ""
                },
                imagem:
                {
                    id: "imagem",
                    value: ""
                },
            },
            filter: {
                id: "preco",
                value: ""
            },
            lista: [],
            typePage: "list"
        }
    }

    toggleLoginModal() {
        console.log(this.state.openLoginModal)
        this.setState({ openLoginModal: !this.state.openLoginModal });
        window.alert("a")
        this.get()
    }


    onInputChange(id, value) {
        let { form } = this.state;
        form[id].value = value;
        this.setState({ form });
    }
    handleLogin() {
        window.alert("teste")
    }

    changeView() {
        let { typePage } = this.state
        let newType = typePage == "list" ? "create" : "list"
        this.setState({ typePage: newType })
    }

    createItem() {
        let { form } = this.state
        let body = {
            nome: form.nome.value,
            preco: form.preco.value,
            imagem: form.imagem.value
        }
        console.log(body)
        let localStore = localStorage.getItem("database")
        let database = [];



        if (localStore) {
            const cache = JSON.parse(localStore)
            cache.push(body)
            localStorage.setItem("database", JSON.stringify(cache));
            this.clearForm()
            this.setState({ typePage: "list" })
        } else {
            database[0] = body
            localStorage.setItem("database", JSON.stringify(database));
            console.log(database)
        }


    }

    clearForm() {
        let { form } = this.state
        form.imagem.value = ""
        form.preco.value = ""
        form.nome.value = ""

        this.setState({ form })
    }
    componentDidMount() {
        let localStore = localStorage.getItem("database")
        console.log(localStore)
    }

    removeItem(l, idx) {
        console.log(l, idx)
        let localStore = localStorage.getItem("database")
        const cache = JSON.parse(localStore)
        cache.splice(idx, 1)
        localStorage.setItem("database", JSON.stringify(cache));
        this.setState({ typePage: "list" })
    }

    render() {
        let { form, typePage } = this.state
        let lista = localStorage.getItem('database');
        let cacheLista = JSON.parse(lista);
        let listaFiltrada = cacheLista?.filter((l) => {
            const filter = form?.filter?.value?.toLowerCase();
            const nome = l.nome.toLowerCase();
            return nome.includes(filter);
        });
        return (
            <Box style={{ height: "100%" }} className="mt-4">
                {typePage == "list" ?
                    <Card>
                        <CardContent>
                            <form onSubmit={this.handleLogin.bind(this)}>
                                <TextField
                                    requireds
                                    size="small"
                                    label="Filtro"
                                    id={this.state.form.filter.id}
                                    value={this.state.form.filter.value}
                                    style={{ width: "100%" }}
                                    onChange={(e) => this.onInputChange(this.state.form.filter.id, e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={() => this.changeView()}
                                >
                                    Novo
                                </Button>
                            </form>
                            {listaFiltrada?.map((l, idx) => {
                                return (
                                    <Grid key={idx} item xs={12}>
                                        <Card className="mt-3">
                                            <Grid>
                                                {l.nome}
                                            </Grid>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={() => this.removeItem(l, idx)}
                                            >
                                                Remove
                                            </Button>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </CardContent>
                    </Card>
                    : <Card>
                        <Typography variant="h4">Criação</Typography>
                        <Grid container>
                            <TextField
                                required
                                size="small"
                                label="Nome"
                                id={this.state.form.nome.id}
                                value={this.state.form.nome.value}
                                style={{ width: "100%" }}
                                onChange={(e) => this.onInputChange(this.state.form.nome.id, e.target.value)}
                            />
                            <TextField
                                required
                                size="small"
                                label="Preço"
                                id={this.state.form.preco.id}
                                value={this.state.form.preco.value}
                                style={{ width: "100%" }}
                                onChange={(e) => this.onInputChange(this.state.form.preco.id, e.target.value)}
                            />
                            <TextField
                                required
                                size="small"
                                label="URL da imagem"
                                id={this.state.form.imagem.id}
                                value={this.state.form.imagem.value}
                                style={{ width: "100%" }}
                                onChange={(e) => this.onInputChange(this.state.form.imagem.id, e.target.value)}
                            />
                            <Grid item md={6} style={{ justifyContent: "center", display: "flex" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                    autoFocus
                                    onClick={() => this.changeView()}
                                >
                                    VOLTAR
                                </Button>
                            </Grid>
                            <Grid item md={6} style={{ justifyContent: "center", display: "flex" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    autoFocus
                                    onClick={() => this.createItem()}
                                >
                                    CRIAR
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                }
            </Box>
        )
    };
}

export default Home;