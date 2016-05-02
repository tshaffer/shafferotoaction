import {combineReducers} from 'redux';
import PhotosReducer from './reducer_photos';
import ActivePhoto from './reducer_active_photo';

const rootReducer = combineReducers({
    photos: PhotosReducer,
    activePhoto: ActivePhoto
});

export default rootReducer;
