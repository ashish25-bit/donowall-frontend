import api from './api';

export const getUserType = async function (token) {
    try {
        const res = await api.post('/type/user', { token });
        return res.data;
    }
    catch (err) {
        console.log(err.message);
        return "ERROR";
    }
}

export const userTypeToken = "nTB,eW]QPrV;CRdhf[2@";

export const adminTypeToken = "jLuMxYg4a)%@^R6:v9{p"; 
