import { colors } from '@material-ui/core/';

const facebook = {
	main: "#1877f2",
	dark: "#166fe5"
};

const discord = {
	main: "#7289da",
	dark: "#677bc4"
};

const twitch = {
	main: "#9147ff",
	dark: "#772ce8"
};

const button = (backgroundColor, hoverBackgroundColor, color = "white") => ({
	backgroundColor, color,
	'&:hover': {backgroundColor: hoverBackgroundColor}
})

/* const outlinedButton = (color = "white", hoverColor = "white") => ({
	backgroundColor: "transparent", 
	color,
    border: `1px solid ${color}`,
	'&:hover': {
		color: hoverColor,
		border: `1px solid ${hoverColor}`
	},
}) */
/* 
const txtColor = (color) => ({color})

const bgColor = (backgroundColor) => ({backgroundColor}) */

const containerFluid = {
	paddingRight: "15px",
	paddingLeft: "15px",
	marginRight: "auto",
	marginLeft: "auto",
	width: "100%"
};

const container = theme => ({
	...containerFluid,
	[theme.breakpoints.up('xs')]: {
		maxWidth: "540px"
	},
	[theme.breakpoints.up('sm')]: {
		maxWidth: "720px"
	},
	[theme.breakpoints.up('md')]: {
		maxWidth: "960px"
	},
	[theme.breakpoints.up('lg')]: {
		maxWidth: "1140px"
	},
	[theme.breakpoints.up('xl')]: {
		maxWidth: "1140px"
	}
})

const dialogScrollBody = {
	overflowY: "scroll"
}

const dialogCard = theme => ({
	[theme.breakpoints.up('xs')]: {
		width: "350px"
	},
	[theme.breakpoints.up('sm')]: {
		width: "600px"
	},
	[theme.breakpoints.up('md')]: {
		width: "960px"
	}
})

const backdrop = theme => ({
	zIndex: theme.zIndex.tooltip + 1,
	color: '#fff',
})

const sectionDesktop = theme => ({
	display: 'none',
	[theme.breakpoints.up('lg')]: {
		display: 'flex',
	}
})

const sectionMobile = theme => ({
	display: 'flex',
	[theme.breakpoints.up('lg')]: {
		display: 'none',
	}
})

const grow = {
	flexGrow: 1
}

const maxHeight = {
	height: "100%"
}

const outlineNone = {
	'&:focus': {
		outline: "none"
	}
}

const fadeBackground = {
	backgroundColor: "rgb(0, 0, 0, 0.5)"
}

const fluidImg = {
	objectFit: "contain!important",
	width: "100%",
	height: "auto",
}

const coverImg = {
	objectFit: "cover!important",
	width: "100%",
	height: "auto",
}

const dBlock = {
	display: 'block'
}

const dFlex = {
	display: 'flex'
}

const dNone = {
	display: "none!important"
}

const styles = theme => ({
	//variables
	facebookButton: button(facebook.main, facebook.dark),
	discordButton: button(discord.main, discord.dark),
	twitchButton: button(twitch.main, twitch.dark),
	redButton: button(colors.red[800], colors.red[900]),
	purpleButton: button(colors.deepPurple[500], colors.deepPurple[800]),
	blueButton: button(colors.indigo[500], colors.indigo[800]),
	greyButton: button(colors.grey[800], colors.grey[900]),
	containerFluid,
	container: container(theme),
	dialogScrollBody,
	dialogCard: dialogCard(theme),
	backdrop: backdrop(theme),
	sectionDesktop: sectionDesktop(theme),
	sectionMobile: sectionMobile(theme),
	grow,
	maxHeight,
	outlineNone,
	fadeBackground,
	fluidImg,
	coverImg,
	dBlock,
	dFlex,
	dNone
});

export default styles;