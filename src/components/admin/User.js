import React, { Fragment, useEffect, useState } from 'react';
import api from '../../utils/api';

const User = ({ match }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState(null);
 
    useEffect(() => {

        async function getUser() {
            try {
                const { data } = await api.get(`/admin/appointments/user/${match.params.id}`);
                setUser(data.user);

                const { data: { appointments: ap } } = await api.get(`/admin/appointments/previous/appointments/${match.params.id}`);
                setAppointments(ap);
            }
            catch (err) {
                console.log(err.message);
            }
            setLoading(false);
        }

        getUser();
    }, [match.params.id])

    return (
        <div className='admin home-container user-appointment-page'>{
        loading ? (
            <h2>LOADING...</h2>
        ) : (
            <Fragment>{
                !user ? (
                    <h3 style={head}>USER NOT FOUND</h3>
                ) : (
                    <div className='info'>
                        <h3 style={head}>{user.f_name} {user.l_name}</h3>

                        <div className='fieldset'>
                            <span>Email</span>
                            <p>{user.email}</p>
                        </div>

                        <div className='fieldset'>
                            <span>City</span>
                            <p>{user.city}</p>
                        </div>  

                        <div className='fieldset'>
                            <span>State</span>
                            <p>{user.state}</p>
                        </div>  

                        <div className='fieldset'>
                            <span>Contact</span>
                            <p>{user.mobile_no}</p>
                        </div>

                        <div className='fieldset'>
                            <span>Blood Group</span>
                            <p>{user.blood_group}</p>
                        </div>
                    </div>
                )
            } {
                !appointments ? (
                    <h3 style={head}>No Upcomming Appointments</h3>
                ) : (
                    <div className='appointments'>
                        <h3 style={head}>Upcomming Appointment: </h3>

                        <div className='fieldset'>
                            <span>Date</span>
                            <p>{appointments[0].date}, {appointments[0].weekDay}</p>
                        </div>

                        <div className='fieldset'>
                            <span>Time</span>
                            <p>{appointments[0].time[0]} - {appointments[0].time[1]}</p>
                        </div>

                        <div className='fieldset'>
                            <span>Booked On</span>
                            <p>{appointments[0].bookedOn}</p>
                        </div>
                    </div>
                )
            }</Fragment>   
        )}</div>
    )
}

const head = {
    textTransform: "uppercase",
    marginBottom: "30px"
};

export default User;
