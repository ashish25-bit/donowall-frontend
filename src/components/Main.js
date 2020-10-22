import React, { useState } from 'react';
import LoginUser from './user/Login';
import LoginAdmin from './admin/Login';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { userTypeToken, adminTypeToken } from '../utils/getUserType';
// import { Redirect } from 'react-router-dom';

const Main = ({ isAuthenticated, typeToken }) => {
    const [currentForm, setCurrentForm] = useState(-1);

    // if (isAuthenticated) {
    //     if (typeToken === userTypeToken)
    //         return <Redirect to='/user/home' />
        
    //     if (typeToken === adminTypeToken)
    //         return <Redirect to='/admin/home' />
    // }

    return (
        <div>
            <button onClick={()=>setCurrentForm(1)}>Login User</button>
            <button onClick={()=>setCurrentForm(2)}>Login Admin</button>
            { currentForm === 1 && <LoginUser onClose={()=> setCurrentForm(-1)}/> }
            { currentForm === 2 && <LoginAdmin onClose={()=> setCurrentForm(-1)}/> }
        </div>
    )
}

// Main.propTypes = {
//     isAuthenticated: PropTypes.bool,
//     typeToken: PropTypes.string
// };

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     typeToken: state.auth.typeToken
// })

// export default connect(mapStateToProps, {})(Main);
export default Main;
