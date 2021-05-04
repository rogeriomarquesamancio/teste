//Layouts
import {AdLayout, DefaultLayout } from "./layouts";
import { Redirect } from "react-router-dom";
// Route Views
import Home from "./views/home";

export default [{
	path: "/",
	exact: true,
	layout: AdLayout,
	component: () => <Redirect to="/home" />
}, {
	path: "/home",
	exact: true,
	layout: AdLayout,
	component: Home
}];
