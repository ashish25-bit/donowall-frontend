import React, { Fragment, useEffect, useState } from 'react';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { json } from '../../utils/headers';
const BookAppointment = ({ user,match }) => {

    const [loading, setLoading] = useState(true);
    const [hospital, setHospital] = useState(null);
    const [slots, setSlots] = useState(null);

    useEffect(() => {

        async function getData() {
            try {

                const { data: { hospital } } = await api.get(`/user/hospital/${match.params.id}`);
                setHospital(hospital);

                if (hospital.isAcceptingAppointment) {
                    const res = await api.get(`/user/appointment/get/available/slots/${match.params.id}`);
                    console.log(res);
                    setSlots(res.data);       
                }
            }
            catch (err) {
                console.log(err)
            }
            setLoading(false);
        }

        getData();
    }, [match.params.id]);
    const selectAppointment=async (slot,time)=>{
        try{
            console.log(slot.date,slot.day,time)
            const formData={
                adminId:match.params.id,
                userId:user._id,
                date:slot.date,
                weekDay:slot.day,
                time:time,
                hasDonated:false
            }
            const res=await api.post('/user/appointment/slot',formData, json)
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }



    return (
        <div className='admin home-container book-appointments'>{
            loading ? (
                <h2>Loading...</h2>
            ) : (
                !hospital.isAcceptingAppointment ? (
                    <Fragment>
                        { hospital && <h1>{hospital.name}</h1> }
                        <h2>Currently Not Accepting Appointments</h2>
                    </Fragment>
                ) : (
                    !slots ? (
                        <h2>Slots Not Added.</h2>
                    ) : (
                        <Fragment>
                            { hospital && <h1>{hospital.name}</h1> }
                            {slots.map(({ day, date, time }, slotIndex) => (
                                <div className='weekday' key={slotIndex}>
                                    <h2>{day}</h2>
                                    <small>{date}</small> <br/>
                                    {   
                                        time.map(([ start, end ], timeIndex) => (
                                            <section key={timeIndex}>
                                                <small onClick={()=>selectAppointment(slots[slotIndex],time[timeIndex])} >{start} - {end}</small>
                                            </section>
                                        ))
                                    }
                                </div>
                            ))}
                        </Fragment>
                    )
                )
            )
        }</div>
    )
}

PropTypes.BookAppointment = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(BookAppointment)
