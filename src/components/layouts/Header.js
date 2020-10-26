import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg';
import { adminTypeToken, userTypeToken } from '../../utils/getUserType';
import { logout } from '../../actions/auth';
import Slider from './Slider';
import url from '../../utils/url';

const Header = ({
    logout, 
    auth: {
        user,
        typeToken,
        isAuthenticated,
        loading
    }
}) => {

    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [isExtrasOpen, setIsExtrasOpen] = useState(false);

    if (!isAuthenticated && !localStorage.getItem('token'))
        return <div></div>

    let homePageUrl = url.authRoute;
    if (adminTypeToken === typeToken)
        homePageUrl =  url.homeAdmin;
    if (userTypeToken === typeToken)
        homePageUrl = url.homeUser;

    const toggleState = () => setIsExtrasOpen(prevState => !prevState);

    return (
        <Fragment>
            <div className="header">
                <div>
                    <button 
                        disabled={loading}
                        onClick={() => setIsSliderOpen(prevState => !prevState)} 
                    >
                        <Hamburger />
                    </button>
                </div>
                <div>
                    <Link to={homePageUrl}>
                        <img 
                            className="logo" 
                            src={require('../../assets/logo.png')}
                            alt="donowall-logo"
                        />
                    </Link>
                </div>
                <div className="user-img-container">
                    {!loading && divisionThird(typeToken, user, logout, isExtrasOpen, toggleState)}
                </div>
            </div>
            {isSliderOpen && <Slider />}
        </Fragment>
    )
}

function divisionThird(typeToken, user, logout, isExtrasOpen, toggleState) {
    if (adminTypeToken === typeToken)
        return (
            <Fragment>
                <div style={center}> <small>Welcome Admin</small> </div>
                <div onClick={toggleState}> 
                    <img 
                        width="40px" alt="user-avataar"
                        src={require('../../assets/user-avataar.png')}
                    /> 
                </div>
                { isExtrasOpen &&
                <div className='extras'>
                    <Link to={url.adminProfile} onClick={toggleState}>profile</Link>
                    <Link 
                        to={url.authRoute} 
                        onClick={() =>{ toggleState(); logout(); }}
                    >logout</Link>
                </div> }
            </Fragment>
        )

    if (userTypeToken === typeToken)
        return (
            <Fragment>
                <div style={center}> <small>Welcom {user.f_name}</small> </div>
                <div onClick={toggleState}> <img width="40px" src={user.image_url} alt="user-avataar" /> </div>
                { isExtrasOpen &&
                <div className='extras'>
                    <Link to={url.userProfile} onClick={toggleState}>profile</Link>
                    <Link 
                        to={url.authRoute} 
                        onClick={() =>{ toggleState(); logout(); }}
                    >logout</Link>
                </div> }
            </Fragment>
        )
}

PropTypes.Header = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

const center = { justifySelf: "right" };

export default connect(mapStateToProps, { logout })(Header);
