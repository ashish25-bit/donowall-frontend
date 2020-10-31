import React, { Fragment, useEffect, useState } from 'react';
import api from '../../utils/api';
import { json } from '../../utils/headers';
import { Link } from 'react-router-dom';
import url from '../../utils/url';

const BookAppointment = ({ match, history }) => {

    const [loading, setLoading] = useState(true);
    const [hospital, setHospital] = useState(null);
    const [slots, setSlots] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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


    const selectTime = (indexData, indexTime) => {
        const selected = slots[indexData];
        setSelectedSlot({
            weekDay: selected.day,
            date: selected.date,
            time: selected.time[indexTime]
        });

        document.body.scrollTop = 0; 

        document.documentElement.scrollTop = 0;
    }

    const confirmSlot = async () => {
        setIsSubmitting(true);
        
        const data = { ...selectedSlot, admin: hospital._id };

        try {
            const res = await api.post('/user/appointment/slot', data, json);
            console.log(res);
            return history.push(url.homeUser);
        }
        catch (err) {
            if (err.response !== undefined) 
                console.log(err.response.data);
            else 
                console.log(err.message);
            setIsSubmitting(false);
        }

    }

    return (
        <div className='admin home-container book-appointments'>{
            loading ? (
                <h2>Loading...</h2>
            ) : (
                !hospital.isAcceptingAppointment ? (
                    <Fragment>
                        { 
                            hospital && 
                            <h1>
                                <Link to={`${url.showHospital}/${hospital._id}`}>
                                    <img src={require('../../assets/back-arrow.png')} alt="back-arrow" />
                                </Link>
                                {hospital.name}
                            </h1>
                        }
                        <h2>Currently Not Accepting Appointments</h2>
                    </Fragment>
                ) : (
                    !slots ? (
                        <h2>Slots Not Added.</h2>
                    ) : (
                        <Fragment>
                            {
                                hospital &&
                                <h1>
                                    <Link to={`${url.showHospital}/${hospital._id}`}>
                                        <img src={require('../../assets/back-arrow.png')} alt="back-arrow" />
                                    </Link>
                                    {hospital.name}
                                </h1>
                            }

                            { selectedSlot && <div>
                                <p>
                                    {selectedSlot.weekDay}, {selectedSlot.date}{' '}
                                    ({selectedSlot.time[0]} - {selectedSlot.time[1]})
                                </p> 
                                <button 
                                    disabled={isSubmitting}
                                    className="confirm"
                                    onClick={confirmSlot}
                                >Confirm Slot</button>
                                <button 
                                    disabled={isSubmitting}
                                    className="cancel" 
                                    onClick={() => setSelectedSlot(null)}
                                >Cancel</button>
                            </div> }

                            {slots.map(({ day, date, time }, index) => (
                                <div className='weekday' key={index}>
                                    <h2>{day}</h2>
                                    <small>{date}</small> <br/>
                                    {   
                                        time.map(([ start, end ], index_time) => (
                                            <section key={index_time}>
                                                <small
                                                    onClick={() => selectTime(index, index_time)}
                                                >{start} - {end}</small>
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
