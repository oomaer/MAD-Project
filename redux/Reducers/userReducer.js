
import { CHANGE_NAME, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_PHOTO } from '../Actions/types';

const initalState = {
    name: '',
    email: '',
    password: '',
    imageurl: '',
}

const userReducer = (state = initalState, action) => {

    switch(action.type){
        case CHANGE_NAME:
            return {
                ...state,
                name: action.payload
            }
        case CHANGE_EMAIL: 
            return {
                ...state,
                email: action.payload
            }

        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case CHANGE_PHOTO: 
            return{
                ...state,
                imageurl: action.payload
            }

        default: 
            return state;

    }

}

export default userReducer;