/**
 * Created by tedshaffer on 5/8/16.
 */
export default function(state = null, action) {

    switch (action.type) {
        case 'ALBUMS_UPDATED':
            return action.payload;
    }

    return state;
}
