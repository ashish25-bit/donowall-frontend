import React from 'react';
// import { Link } from 'react-router-dom';
import useTitle from '../../utils/useTitle';

function Home() {
    useTitle('Welcome to Donowall');

    const src = "https://api-donowall.herokuapp.com/api/admin/profile/photo?name=95dd295b5573e91932eac055ba543bac.jpg";
    const name = "Some Hospital Name";
    
    return (
        <div className='user home-container'>
            
            <div className='list-container'>
                {
                    [...Array(10).keys()].map(i => (
                        <div className='list' key={i}>
                            <div className='image-con'>
                                <img src={src} alt={name} />
                            </div>
                            <div className="info-con">
                                <p>{name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Home;
