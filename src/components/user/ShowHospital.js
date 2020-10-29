import React, { useState, useEffect } from 'react';
import Chart from '../admin/Chart';
import api from '../../utils/api';
import url from '../../utils/url';

const ShowHospital=({ match }) => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getHospital() {
            try {
                const res = await api.get(`/user/hospital/${match.params.id}`);
                console.log(res.data);
                document.title = res.data.hospital.name;
                setData(res.data.hospital)
                setLoading(false);
            }
            catch (err) {
                if (err.response !== undefined)
                    console.log(err.response.data);
                else 
                    console.log(err.message);
            }
        }

        getHospital();
    },[match.params.id]);

    return(
        <div className="profile-container d-flex justify-content-center">

            <div className="show-container">
                <img src={`${url.baseImageUrl}?name=${data.image}`} alt={data.name} />
                
                <div 
                    className="d-flex 
                    justify-content-center 
                    hospital-name"
                ><h3>{data.name}</h3></div>
                
                <div className="graph-container">
                {
                    loading ? (
                        <h1>...Loading</h1>
                    ) : (
                        data.blood_data.length ?
                            <Chart data={data.blood_data} /> : 
                            <h1>No Blood Data Present</h1>
                    )
                }
                </div><div className="d-flex justify-content-center">
                <button className="book-btn btn">Book an appointment</button>
                </div>
            </div>
        </div>
    )
}

export default ShowHospital;