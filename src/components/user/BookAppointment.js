import React, { Fragment, useEffect, useState } from 'react';
import api from '../../utils/api';

const BookAppointment = ({ match }) => {

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
                            {slots.map(({ day, date, time }, index) => (
                                <div className='weekday' key={index}>
                                    <h2>{day}</h2>
                                    <small>{date}</small> <br/>
                                    {   
                                        time.map(([ start, end ], index) => (
                                            <section key={index}>
                                                <small>{start} - {end}</small>
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

export default BookAppointment;
