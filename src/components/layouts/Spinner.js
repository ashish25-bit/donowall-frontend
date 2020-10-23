import React from 'react';

const Spinner = () => {
    return (
        <div className="loader-con">
            <img src={require('../../assets/loader.gif')} alt="Spinner" />
        </div>
    )
}

export default Spinner;
