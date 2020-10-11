import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Headers from './components/Headers';
import LoginAdmin from './components/admin/Login';
import SignupAdmin from './components/admin/Signup';
import LoginUser from './components/user/Login';
import SignupUser from './components/user/Signup';

// redux store
import { Provider } from 'react-redux'
import store from './store'

function App() {
	return (
		<Provider store={store}>
			<Router>
         	<div className="App">
					<Headers />
					<Switch>
						<Route exact path='/admin/login' component={LoginAdmin} />
                  <Route exact path='/admin/signup' component={SignupAdmin} />
                  <Route exact path='/user/login' component={LoginUser} />
                  <Route exact path='/user/signup' component={SignupUser} />
               </Switch>
            </div>
         </Router>
      </Provider>
	);
}

export default App;
