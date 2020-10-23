import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg';
import { adminTypeToken, userTypeToken } from '../../utils/getUserType';
import { logout } from '../../actions/auth';

const Header = ({
    logout, 
    auth: {
        user,
        typeToken,
        isAuthenticated,
        loading
    }
}) => {

    if (!isAuthenticated)
        return <div></div>

    let homePageUrl = '/';
    if (adminTypeToken === typeToken)
        homePageUrl =  "/admin/home";
    if (userTypeToken === typeToken)
        homePageUrl = "/user/home";

    return (
        <div className="header">
            <div>
                <button>
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
                {!loading && divisionThird(typeToken, user, logout)}
            </div>
        </div>
    )
}

function divisionThird(typeToken, user, logout) {
    if (adminTypeToken === typeToken)
        return (
            <Fragment>
                <div style={center}> <small>Welcome Admin</small> </div>
                <div> <Link to='/' onClick={logout}>
                    <img width="40px" src={require('../../assets/user-avataar.png')} alt="user-avataar" />
                </Link> </div>
            </Fragment>
        )

    if (userTypeToken === typeToken)
        return (
            <Fragment>
                <div style={center}> <small>Welcom {user.f_name}</small> </div>
                <div> <Link to='/' onClick={logout}>
                    <img width="40px" src={user.image_url} alt="user-avataar" />
                </Link> </div>
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

const center = { justifySelf: "right"};

export default connect(mapStateToProps, { logout })(Header);
