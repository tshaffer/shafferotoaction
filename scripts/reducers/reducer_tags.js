/**
 * Created by tedshaffer on 5/4/16.
 */
export default function(state = null, action) {

    switch (action.type) {
        case 'TAGS_UPDATED':
            return action.payload;
    }

    return state;
}
