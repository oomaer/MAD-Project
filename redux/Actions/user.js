
import { CHANGE_NAME, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_PHOTO } from './types';

export const changeName = (name) => {
    return {
        type: CHANGE_NAME,
        payload: name
    }
}

export const changeEmail = (email) => {
    return{
        type: CHANGE_EMAIL,
        payload: email
    }
}

export const changePassword = (password) => {
    return {
        type: CHANGE_PASSWORD,
        payload: password
    }
}

export const changePhoto = (imageurl) => {
    return {
        type: CHANGE_PHOTO,
        payload: imageurl
    }
}

