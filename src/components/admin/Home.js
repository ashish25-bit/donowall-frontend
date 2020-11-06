import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chart from '../admin/Chart';
import { Link } from 'react-router-dom';
import url from '../../utils/url';
import { changeAcceptingStatus } from '../../actions/auth';
import api from '../../utils/api';

const Home = ({ user, changeAcceptingStatus }) => {
    const [loading, setLoading] = useState(true);
    const [slots, setSlots] = useState(null);
    const [appointments, setAppointments] = useState(null);
    
    const status = user.isAcceptingAppointment;

    useEffect(() => {

        async function getAppointments() {
            try {
                const res = await api.get('/admin/slot');
                if (res.data)
                    setSlots(res.data.slots);

                const res2 = await api.get('/admin/appointments');
                setAppointments(res2.data);
            }
            catch (err) {
                console.log(err);
            }
            setLoading(false);
        }

        getAppointments();
    }, [])

    const changeStatus = async () => {
        setLoading(true);
        const res = await changeAcceptingStatus();
        setSlots(res.slots);
        setLoading(false);
    }
    
    return (
        <div className='admin home-container'>
            <h1>{user.name}</h1>
            
            <div className='intro-container'>
                <div className='status'>
                    {
                        status ? 
                        <div className='true'>Accepting Appointments</div> :
                        <div className='false'>Not Accepting Appointments</div> 
                    }
                    <button 
                        className={status ? 'false' : 'true'}
                        onClick={changeStatus}
                        disabled={loading}
                    >{
                        status ? 'Stop' : 'start'
                    }</button>

                    {
                        !loading ? (
                            slots && (
                                <div className='slots-container'>{
                                    slots.map(({ day, time }, index) => (
                                        <div key={index}>
                                            <h5>{day}</h5>
                                            {time.map(([start, end], i) => <span key={i}>{start} - {end}</span>)}
                                        </div>
                                    ))
                                }</div>
                            )
                        ) : (
                            <div>Loading...</div>
                        )
                    }

                    <Link to={url.changeTimeSlot}>Change Time Slots &gt;&gt; </Link>

                </div>
                <div className='appointments'>
                    {
                        !loading ? (
                            !appointments || !appointments.length ? (
                                <h2>No Appointments</h2>
                            ) : (
                                appointments.map((
                                    { user: { f_name, l_name, _id }, date, weekDay, time }, index) => (
                                    <div key={index}>
                                        <h3>
                                            <Link to={`${url.userAppointment}/${_id}`}>
                                                {f_name} {l_name}
                                            </Link>
                                        </h3>
                                        <p>{date}, {weekDay} ({time[0]} - {time[1]})</p>
                                    </div>
                                ))
                            )
                        ) : (
                            <div>Loading...</div>
                        )
                    }
                </div>
            </div>
            
            <Chart data={user.blood_data} />
            <Link className='edit-data-link' to={url.editBloodData}>
                <svg 
                    width="20" height="20" 
                    viewBox="0 0 49 49" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M36.0533 6.125C35.5429 6.125 35.012 6.32917 34.6241 6.71708L30.8879 10.4533L38.5441 18.1096L42.2804 14.3733C43.0766 13.5771 43.0766 12.2908 42.2804 11.4946L37.5029 6.71708C37.0945 6.30875 36.5841 6.125 36.0533 6.125ZM28.7033 18.4159L30.5816 20.2942L12.0841 38.7917H10.2058V36.9134L28.7033 18.4159ZM6.12244 35.2187L28.7033 12.6379L36.3595 20.2941L13.7787 42.8749H6.12244V35.2187Z" fill="white"/>
                </svg>
                <small style={{ marginLeft: "10px" }}>Edit Blood Data</small>
            
            </Link>
        </div>
    )
}

Home.propTypes = {
    user: PropTypes.object.isRequired,
    changeAcceptingStatus: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { changeAcceptingStatus })(Home);
