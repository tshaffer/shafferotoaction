import axios from 'axios';

export const FETCH_ALBUMS = 'FETCH_ALBUMS';
export const FETCH_TAGS = 'FETCH_TAGS';

export function selectPhoto(photo) {
    // selectPhoto is an ActionCreator, it needs to return an action,
    // an object with a type property.
    // console.log("a photo has been selected.", photo.title);
    return {
        type: 'PHOTO_SELECTED',
        payload: photo
    };
}

export function updateSelectedPhotos(selectedPhotos) {
    console.log("the list of selectedPhotos has been updated");
    return {
        type: 'SELECTED_PHOTOS_UPDATED',
        payload: selectedPhotos
    }
}

export function updatePhotos(photos) {
    console.log("the photos have been updated.");
    return {
        type: 'PHOTOS_UPDATED',
        payload: photos
    }
}

// export function createAlbum(albumName) {
//     console.log("create album", albumName);
//     return {
//         type: "CREATE_ALBUM",
//         payload: albumName
//     }
// }

export function fetchAlbums() {

    const url = "http://localhost:3000/";
    const fetchAlbumsUrl = url + "getAlbums";
    const request = axios.get(fetchAlbumsUrl);

    return {
        type: FETCH_ALBUMS,
        payload: request
    };
}

export function fetchTags() {

    const url = "http://localhost:3000/";
    const fetchTagsUrl = url + "getTags";
    const request = axios.get(fetchTagsUrl);

    return {
        type: FETCH_TAGS,
        payload: request
    };
}

