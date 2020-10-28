import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useTitle from '../../utils/useTitle';
import { Link } from 'react-router-dom';
import url from '../../utils/url';
import Chart from '../admin/Chart'
import userEvent from '@testing-library/user-event';
import Hospital from '../../'

const ShowHospital=({match})=>{
    return(
    <>
    <div className="profile-container d-flex justify-content-center">
        <div className="show-container">
            <img src="https://www.bahrainspecialisthospital.com/images/about.png" alt=""/>
            
            <Chart data={}/>

        </div>
        

    </div>
    </>)
}
export default ShowHospital