import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Routes from './components/routes/Routes';

// redux store
import { Provider } from 'react-redux'
import store from './store'

import { loadUser } from './actions/auth';
import sethAuthToken from './utils/setAuthToken';

const App = () => {

	useEffect(() => {
		if (localStorage.token) 
			sethAuthToken(localStorage.token);
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route component={Routes} />
				</Switch>
			</Router>
      </Provider>
	);
}

export default App;
