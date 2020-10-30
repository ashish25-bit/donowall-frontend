import React, { useEffect, useState, useRef, Fragment } from 'react';
import api from '../../utils/api';
import { json } from '../../utils/headers';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ChangeTimeSlots = () => {

    const [loading, setLoading] = useState(true);
    const [slots, setSlots] = useState(null);
    const elemRef = useRef([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    elemRef.current = [...Array(7).keys()].map(
        i => elemRef.current[i] = React.createRef()
    );

    function setStateFun(res) {
        if (res) {
            const data = res.slots;
            let slotIndex = 0;
            let endRes = [];

            for (let i=0; i<7; i++) {
                if (slotIndex < data.length && days[i] === data[slotIndex].day) {
                    endRes.push({ time: data[slotIndex].time, day: data[slotIndex].day });
                    slotIndex++;
                }
                else 
                    endRes.push({ time: [], day: days[i] });
            }
            setSlots(endRes);
        }
        else 
            setSlots(days.map(day => { return { time: [], day } }));
    }

    useEffect(() => {

        async function getTimeSlots() {
            try {
                const res = await api.get('/admin/slot');
                setStateFun(res.data);
            } 
            catch (err) {
                if (err.response !== undefined)
                    console.log(err.response.data)
                else 
                    console.log(err.message)
            }
            setLoading(false);
        }
        getTimeSlots();
    }, []);

    const addData = index => {
        try {
            const children =  elemRef.current[index].current.childNodes;
            if (!children[0].value && !children[4].value)
                alert('Enter both fields')
            else {
                const start = children[0].value + children[1].value;
                const end = children[3].value + children[4].value;

                const temp = slots.map((slot, i) => {
                    if (index !== i)
                        return slot;
                    return { day: slot.day, time: [...slot.time, [start, end]] };
                });

                setSlots(temp);

                children[0].value = "";
                children[3].value = "";
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const submitData = async () => {
        setIsSubmitting(true);

        try {
            const formData = slots.filter(slot => { 
                return slot.time.length ? slot : null
            });
            console.log(formData);
            
            const res =  await api.post('/admin/slot/update', formData, json);
            console.log(res.data);
        }
        catch (err) {
            console.log(err.message);
        }
        setIsSubmitting(false);
    }

    return (
        <div className='admin home-container slots-page'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <Fragment>
                        {
                            slots.map(({ day, time }, index) => (
                                <div className='weekday' key={index}>
                                    <h2>{day}</h2>

                                    <div ref={elemRef.current[index]}>

                                        {/* start time */}
                                        <select>{
                                            [...Array(12).keys()].map(index =>
                                                <option 
                                                    key={index} 
                                                    value={index+1}
                                                >{index+1}</option>
                                            )
                                        }</select>
                                        <select>
                                            <option>AM</option>
                                            <option>PM</option>
                                        </select>

                                        <span>{" - "}</span>
                                        
                                        {/* end time */}
                                        <select>{
                                            [...Array(12).keys()].map(index =>
                                                <option 
                                                    key={index} 
                                                    value={index+1}
                                                >{index+1}</option>
                                            )
                                        }</select>
                                        <select>
                                            <option>AM</option>
                                            <option>PM</option>
                                        </select>
                                        
                                        <button onClick={() => addData(index)}>+</button>
                                    </div>
                                    
                                    { !!time.length &&
                                        time.map(([ start, end ], index) => (
                                            <section key={index}>
                                                <small>{start} - {end}</small>
                                            </section>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <button 
                            onClick={submitData}
                            disabled={isSubmitting}
                            className='update-slots-btn'
                        >Update Time Slots</button>
                    </Fragment>
                )
            }
        </div>
    )
}

export default ChangeTimeSlots;
