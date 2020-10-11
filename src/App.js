import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './components/Homepage'

// redux store
import { Provider } from 'react-redux'
import store from './store'

function App() {
	return (
		<Provider store={store}>
			<Router>
         	<div className="App">
					
				<Switch>
					<Route exact path="/" component={Homepage}></Route>

               </Switch>
            </div>
         </Router>
      </Provider>
	);
}

export default App;
