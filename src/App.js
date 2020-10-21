import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Main from './components/Main'
// import Redirect from './components/HomePage';
import Routes from './components/routes/Routes';

// redux store
import { Provider } from 'react-redux'
import store from './store'

import { loadUser } from './actions/auth';
import sethAuthToken from './utils/setAuthToken';

const App = () => {

	useEffect(() => {
		if (localStorage.token) {
			sethAuthToken(localStorage.token);
			store.dispatch(loadUser());
		}
	}, []);

	return (
		<Provider store={store}>
			<Router>
				{/* <Route component={} /> */}
				<Switch>
					{/* <Route exact path="/" component={Main} />
					<Route exact path='/home' component={Redirect} /> */}
					<Route component={Routes} />
				</Switch>
			</Router>
      </Provider>
	);
}

export default App;
