import React, {Component} from 'react';
import {ThemeProvider} from 'react-jss'
import {Provider} from 'react-redux';
import jss from 'jss'
import preset from 'jss-preset-default'
import {DragDropContextProvider} from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; // or any other pipeline
import Layout from "./components/Layout";
import createTheme from "./styles/createTheme";
import CSSBaseline from "./styles/CSSBaseline";
import store from "./data/store";

jss.setup(preset());

const theme = createTheme();

class App extends Component {
	render() {
		return (
			<DragDropContextProvider backend={MultiBackend(HTML5toTouch)}>
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<React.Fragment>
							<CSSBaseline/>
							<Layout/>
						</React.Fragment>
					</ThemeProvider>
				</Provider>
			</DragDropContextProvider>
		);
	}
}

export default App;
