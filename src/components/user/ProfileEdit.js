import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useTitle from '../../utils/useTitle';
import { Link, withRouter } from 'react-router-dom';
import url from '../../utils/url';
import { updateProfile } from '../../actions/auth';

const ProfileEdit = ({ user, updateProfile, history }) => {
    useTitle(`Edit Your Profile`);

    const [formData, setFormData] = useState({
        f_name: user.f_name,
        l_name: user.l_name,
        mobile_no: user.mobile_no,
        city: user.city,
        state: user.state,
        blood_group: user.blood_group
    });

    const [loading, setLoading] = useState(false);

    const submitHandler = async e => {
        setLoading(true);
        e.preventDefault();
        const res = await updateProfile(formData, history, "user");
        if (res !== undefined)
            setLoading(false);
    }

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const {
        f_name,
        l_name,
        mobile_no,
        city,
        state,
        blood_group
    } = formData;

    return (
        <div className='user profile-edit'>
            <h2>
                <Link to={url.userProfile}>
                    <img src={require('../../assets/back-arrow.png')} alt="back-arrow" />
                </Link>
                Edit Your Profile
            </h2>
            <form onSubmit={submitHandler}>

                <div className="fieldset">
                    <span>First Name</span>
                    <input
                        type="text"
                        name="f_name"
                        value={f_name}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                
                <div className="fieldset">
                    <span>Last Name</span>
                    <input
                        type="text"
                        name="l_name"
                        value={l_name}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                
                <div className="fieldset">
                    <span>Mobile Number</span>
                    <input
                        type="number"
                        name="mobile_no"
                        value={mobile_no}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                
                <div className="fieldset">
                    <span>City</span>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                
                <div className="fieldset">
                    <span>State</span>
                    <input
                        type="text"
                        name="state"
                        value={state}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                <div className="fieldset">
                    <span>State</span>
                    <input
                        type="text"
                        name="blood_group"
                        value={blood_group}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                <button disabled={loading}>Submit</button>
            </form>
        </div>
    )
};

PropTypes.ProfileEdit = {
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { updateProfile })(withRouter(ProfileEdit));
