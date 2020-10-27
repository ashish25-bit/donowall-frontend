import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeImage } from '../../actions/auth';
import useTitle from '../../utils/useTitle';

const EditImage = ({ changeImage }) => {
    useTitle('Add Image');

    const [image, setImage] = useState(null);

    const submit = () => {
        const imgForm = new FormData();
        imgForm.append('file', image, image.name);
        changeImage(imgForm);
    }

    return (
        <div>
            <h1>Add Image Here</h1>
            <input 
                type="file" 
                onChange={e => setImage(e.target.files[0])}
            />
            <button onClick={submit}>Submit</button>
        </div>
    )
}

EditImage.propTypes = {
    changeImage: PropTypes.func.isRequired
}

export default connect(null, { changeImage })(EditImage);
