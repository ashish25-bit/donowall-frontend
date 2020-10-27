import React from 'react';
import { Link } from 'react-router-dom';
import url from '../../utils/url';

function Home() {
    return (
        <div>
            <h1>Admin Home Page</h1>
            <Link to='/home'>Common Home Page</Link>{' '}
            <Link to={url.editBloodData}>Edit Blood Data</Link>
        </div>
    )
}

export default Home;
