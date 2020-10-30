import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../utils/useTitle';
import api from '../../utils/api';
import url from '../../utils/url';

function Home() {
    useTitle('Welcome to Donowall');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAllHospitals() {
            try {
                const res = await api.get('/user/hospital/all/hospitals');
                console.log(res.data);
                setData(res.data.hospitals);
                setLoading(false);
            }
            catch (err) {
                console.log(err.message);
            }
        }

        getAllHospitals();
    }, []);
    
    return (
        <div className='user home-container'>
            
            <div className='list-container'>
                {
                    loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        data.map(({ name, image, _id }, index) => (
                            <div className='list' key={index}>
                                <div className='image-con'>
                                    <img 
                                        src={`${url.baseImageUrl}?name=${image}`} 
                                        alt={name} 
                                    />
                                </div>
                                <div className='info-con'>
                                    <p>{name}</p>
                                    <Link to={`${url.showHospital}/${_id}`}>Visit &gt;&gt;</Link>
                                    <Link to={`${url.bookAppointment}/${_id}`}>Book Appointment &gt;&gt;</Link>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>

        </div>
    )
}

export default Home;
