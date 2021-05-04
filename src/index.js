import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

const history = createBrowserHistory({forceRefresh: true});

ReactDOM.render(
	<Router history={history}>
		<Switch>
			{routes.map((route, idx) => (
				<Route
					key={idx}
					path={route.path}
					exact={route.exact}
					component={(props => (
						<route.layout {...props}>
							<route.component {...props}/>
						</route.layout>
					))}
				/>
			))}			
			{/* <Route component={() => <Redirect to="/home"/>}/> */}
			<Route component={() => (
				<div>teste</div>
            )}/>
		</Switch>
	</Router>,
  	document.getElementById('root')
);