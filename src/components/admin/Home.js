import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Admin Home Page</h1>
            <Link to='/home'>Common Home Page</Link>
        </div>
    )
}

export default Home;
