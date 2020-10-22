import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Fragment>
            <h1>Admin Home Page</h1>
            <Link to='/home'>Common Home Page</Link>
        </Fragment>
    )
}

export default Home;
