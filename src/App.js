import React, {Component} from 'react';
import {ThemeProvider} from 'react-jss'
import {Provider} from 'react-redux';
import jss from 'jss'
import preset from 'jss-preset-default'
import Layout from "./components/Layout";
import createTheme from "./styles/createTheme";
import CSSBaseline from "./styles/CSSBaseline";
import store from "./data/store";

jss.setup(preset());

const theme = createTheme();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<React.Fragment>
						<CSSBaseline/>
						<Layout/>
					</React.Fragment>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;
