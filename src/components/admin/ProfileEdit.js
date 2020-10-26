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
        name: user.name,
        city: user.city,
        state: user.state,
        address: user.address,
        pincode: user.pincode,
        contact: user.contact
    });

    const [loading, setLoading] = useState(false);

    const submitHandler = async e => {
        setLoading(true);
        e.preventDefault();
        const res = await updateProfile(formData, history, "admin");
        if (res !== undefined)
            setLoading(false);
    };

    const {
        name,
        city,
        state,
        address, 
        pincode, 
        contact
    } = formData;

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className='admin profile-edit'>
            <h2>
                <Link to={url.adminProfile}>
                    <img src={require('../../assets/back-arrow.png')} alt="back-arrow" />
                </Link>
                Edit Your Profile
            </h2>
            <form onSubmit={submitHandler}>

                <div className="fieldset">
                    <span>Hospital Name</span>
                    <input
                        type="text"
                        name="name"
                        value={name}
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
                    <span>Address</span>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                <div className="fieldset">
                    <span>Pincode</span>
                    <input
                        type="number"
                        name="pincode"
                        value={pincode}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                <div className="fieldset">
                    <span>Contact</span>
                    <input
                        type="number"
                        name="contact"
                        value={contact}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                <button disabled={loading}>Submit</button>
            </form>
        </div>
    )
}

PropTypes.ProfileEdit = {
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { updateProfile })(withRouter(ProfileEdit));
