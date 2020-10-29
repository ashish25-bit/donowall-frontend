import React ,{useState,useEffect} from 'react';
import Chart from '../admin/Chart'
import userEvent from '@testing-library/user-event';
import api from '../../utils/api'


const ShowHospital=({match})=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getHospital() {
            try {
                const res = await api.get(`/user/hospital/${match.params.id}`);
                console.log(res.data);
                setData(res.data.hospital)
                setLoading(false);
            }
            catch (err) {
                console.log(err.response.data);
            }
        }

        getHospital();
    },[match.params.id]);
    return(
    <>
    <div className="profile-container d-flex justify-content-center">
        <div className="show-container ">
            <img src="https://www.bahrainspecialisthospital.com/images/about.png" alt=""/>
            <div className="d-flex justify-content-center hospital-name"><h3> {data.name}</h3></div>
            <div className="graph-container">
            {loading ?
                ( <h1>...Loading</h1>)
                : (data && <Chart data={data.blood_data
                }/>)
            }
            </div><div className="d-flex justify-content-center">
            <button className="book-btn btn">Book an appointment</button>
            </div>
                
           
        </div>
        

    </div>
    </>)
}
export default ShowHospital