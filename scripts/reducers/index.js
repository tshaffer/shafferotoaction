import {combineReducers} from 'redux';
import PhotosReducer from './reducer_photos';
import TagsReducer from './reducer_tags';
import ActivePhoto from './reducer_active_photo';

const rootReducer = combineReducers({
    photos: PhotosReducer,
    tags: TagsReducer,
    activePhoto: ActivePhoto
});

export default rootReducer;
