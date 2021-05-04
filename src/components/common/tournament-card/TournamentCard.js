import React from "react";
import PropTypes from "prop-types";
import {
    Box, Grid,
    Card, Typography, CardActionArea
} from '@material-ui/core/';

import {Skeleton} from '@material-ui/lab/';

import { withStyles } from '@material-ui/core/styles';
import styles from "./TournamentCard.style";

import { Link } from "react-router-dom";

import moment from "moment";
import 'moment/locale/pt-br';

import CardMediaFx from "../card-media-fx";
import Timer from "../timer";
import { RestAPI } from "../../../module";

const propTypes = {
    tournamentData: PropTypes.object
};

class TournamentCard extends React.Component {
    render() {
        const { classes, awaitingData, tournament, ...boxProps } = this.props;
        console.log(tournament === 1)
        return (
            <Box {...boxProps}>
                {awaitingData ? (                    
                    <Skeleton animation="wave" variant="rect" height={250} width="100%" />
                ) : (
                    <Card>
                        <CardActionArea component={Link} to={`/escalacao/${tournament.idTournament}`}>      
                            <CardMediaFx
                                alt="tournament-banner"
                                title={tournament.name}
                                image={RestAPI.getPhoto(tournament.banner)}
                                className={classes.cardMedia}
                            >                          
                                <Grid container component={Box} p={1} spacing={2} className={classes.maxHeight} direction="column" justify="space-between">
                                    <Grid item xs="auto" container spacing={3} justify="space-between">
                                        {tournament.status == 2 ? (
                                            <Grid item xs={5}>
                                                <Typography variant="h6" component="h1">
                                                    Abertura do mercado 
                                                </Typography>
                                                <Typography variant="h4" component="h2">
                                                    <Timer date={moment(tournament.startMarket)} dateBefore="Mercado aberto"/>
                                                </Typography>
                                            </Grid>
                                        ) : tournament.status == 3 ? 
                                        (
                                            <Grid item xs={5}>
                                                <Typography variant="h6" component="h1">
                                                    Fechamento do mercado 
                                                </Typography>
                                                <Typography variant="h4" component="h2">
                                                    <Timer date={moment(tournament.endMarket)} dateBefore="Torneio Finalizado" dateAfter="Torneio Finalizado"/>
                                                </Typography>
                                            </Grid>
                                        ):
                                        (
                                            <Grid item xs={5}>
                                                <Typography variant="h6" component="h1">
                                                    Abertura do mercado
                                                </Typography>
                                                <Typography variant="h4" component="h2">
                                                    <Timer date={moment(tournament.endMarket)} dateBefore="Torneio irá iniciar em breve" dateAfter="Torneio irá iniciar em breve"/>
                                                </Typography>
                                            </Grid>
                                        )}
                                    </Grid>
                                    <Grid item xs="auto" className={classes.fadeBackground}>
                                        <Typography variant="h5" component="h1" align="center">
                                            {tournament.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardMediaFx>
                        </CardActionArea>
                    </Card>
                )}
            </Box>
        );
    }
}

TournamentCard.propTypes = propTypes;

export default withStyles(styles)(TournamentCard)