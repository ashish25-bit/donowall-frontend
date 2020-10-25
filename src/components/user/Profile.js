import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useTitle from '../../utils/useTitle';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
    useTitle(`${user.f_name} ${user.l_name}'s Profile`)
    return (
        <div className='user profile-container'>
            <div className='intro-container'>
                <img src={user.image_url} alt="user-avataar" />
                <h1
                    style={{ 
                        textTransform: "uppercase",
                        color: "var(--lable-color)",
                        marginBottom: "20px"
                    }}
                >{user.f_name} {user.l_name}</h1>
            </div>
            <div className='info-container'>
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
                    <span>Blood Group</span>
                    <p>{user.blood_group}</p>
                </div>

                <div className='fieldset'>
                    <span>Mobile No.</span>
                    <p>{user.mobile_no}</p>
                </div>

                <Link to='/user/profile/edit'>
                    <svg 
                        width="20" height="20" 
                        viewBox="0 0 49 49" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fillRule="evenodd" clipRule="evenodd" d="M36.0533 6.125C35.5429 6.125 35.012 6.32917 34.6241 6.71708L30.8879 10.4533L38.5441 18.1096L42.2804 14.3733C43.0766 13.5771 43.0766 12.2908 42.2804 11.4946L37.5029 6.71708C37.0945 6.30875 36.5841 6.125 36.0533 6.125ZM28.7033 18.4159L30.5816 20.2942L12.0841 38.7917H10.2058V36.9134L28.7033 18.4159ZM6.12244 35.2187L28.7033 12.6379L36.3595 20.2941L13.7787 42.8749H6.12244V35.2187Z" fill="white"/>
                    </svg>
                    <small style={{ marginLeft: "10px" }}>edit profile</small>
                </Link>

            </div>
        </div>
    )
}

PropTypes.Profile = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profile)
