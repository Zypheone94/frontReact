import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer
    // Ajoutez d'autres réducteurs ici si nécessaire
});

export default rootReducer;
