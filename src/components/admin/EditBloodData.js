import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { changeBloodData } from '../../actions/auth';
import Chart from '../admin/Chart';
import useTitle from '../../utils/useTitle';

const EditBloodData = ({ changeBloodData, blood_data }) => {
    useTitle('Edit Blood Data');

    const [formData, setFormData] = useState({
        "A+": blood_data.length ? blood_data[0].value : 0, 
        "A-": blood_data.length ? blood_data[1].value : 0,
        "B+": blood_data.length ? blood_data[2].value : 0, 
        "B-": blood_data.length ? blood_data[3].value : 0,
        "O+": blood_data.length ? blood_data[4].value : 0, 
        "O-": blood_data.length ? blood_data[5].value : 0,
        "AB+": blood_data.length ? blood_data[6].value : 0,
        "AB-": blood_data.length ? blood_data[7].value : 0
    });

    const [chartData, setChartData] = useState(
        Object.entries(formData).map(([name, value]) => { return { name, value } })
    )

    const [loading, setLoading] = useState(false);

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });

    const submitData = () => {
        setLoading(true);
        const data = Object.entries(formData).map(([name, value]) => {
            return { name, value };
        });
        changeBloodData(data);
    }

    const changeData = () => {
        const data = Object.entries(formData).map(([name, value]) => {
            if (value < 0) {
                setFormData({ ...formData, [name]: 0 });
                return { name, value: 0 };
            }
            return { name, value }; 
        });
        setChartData(data);
    }
    
    return (
        <div className='admin home-container edit-blood-container'>
            <div className='input-fields'>
                {
                    Object.entries(formData).map(([key, value]) => (
                        <div key={key} className='fieldset'>
                            <span>{key}</span>
                            <input
                                type="number"
                                value={value}
                                name={key}
                                onChange={changeHandler}
                                onBlur={changeData}
                            />
                        </div>
                    ))
                }
                <button 
                    onClick={submitData}
                    disabled={loading}
                >Update Data</button>
            </div>
            <Chart data={chartData} />
        </div>
    )
}

EditBloodData.propTypes = {
    changeBloodData: PropTypes.func.isRequired,
    blood_data: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    blood_data: state.auth.user.blood_data
})

export default connect(mapStateToProps, { changeBloodData })(EditBloodData);
