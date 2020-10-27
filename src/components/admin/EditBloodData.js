import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { changeBloodData } from '../../actions/auth';

const EditBloodData = ({ changeBloodData }) => {

    const [formData, setFormData] = useState({
        "A+": 33, "A-": 33,
        "B+": 33, "B-": 33,
        "O+": 33, "O-": 33,
        "AB+": 33, "AB-": 33
    });

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });

    const submitData = () => {
        let data = [];
        Object.entries(formData).map(([name, value]) => (
            data.push({ name, value })
        ));
        changeBloodData(data);
    }
    
    return (
        <div>
            {
                Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        <label>{key}</label>
                        <input
                            type="number"
                            min="1"
                            value={value}
                            name={key}
                            onChange={changeHandler}
                        />
                    </div>
                ))
            }
            <button onClick={submitData}>Submit Data</button>
        </div>
    )
}

EditBloodData.propTypes = {
    changeBloodData: PropTypes.func.isRequired
}

export default connect(null, { changeBloodData })(EditBloodData);
