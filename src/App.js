import React, { useEffect } from 'react';
import './css/App.css';
import './css/Profile.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/layouts/Header';
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
				<Header />
				<Switch>
					<Route component={Routes} />
				</Switch>
			</Router>
      </Provider>
	);
}

export default App;
