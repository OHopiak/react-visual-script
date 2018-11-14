import React, {Component} from 'react';
import {ThemeProvider} from 'react-jss'
import Layout from "./components/Layout";
import createTheme from "./styles/createTheme";
import CSSBaseline from "./styles/CSSBaseline";

const theme = createTheme({
	palette: {
	}
});

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<React.Fragment>
					<CSSBaseline/>
					<Layout/>
				</React.Fragment>
			</ThemeProvider>
		);
	}
}

export default App;
