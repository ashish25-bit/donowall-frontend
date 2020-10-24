import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../utils/useTitle';

function Home() {
    useTitle('Welcome to Donowall');
    return (
        <div>
            <h1>User Home Page</h1>
            <Link to='/home'>Common Home Page</Link>
        </div>
    )
}

export default Home;
