import axios from 'axios';

export const FETCH_PHOTOS = 'FETCH_PHOTOS';
export const FETCH_ALBUMS = 'FETCH_ALBUMS';
export const FETCH_TAGS = 'FETCH_TAGS';

export function selectPhoto(photo) {
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

// export function createAlbum(albumName) {
//     console.log("create album", albumName);
//     return {
//         type: "CREATE_ALBUM",
//         payload: albumName
//     }
// }

export function fetchPhotos() {

    const url = "http://localhost:3000/";
    const fetchPhotosUrl = url + "getPhotos";
    const request = axios.get(fetchPhotosUrl);

    return {
        type: FETCH_PHOTOS,
        payload: request
    };
}

export function queryPhotos(query) {

    const url = "http://localhost:3000/";
    const queryPhotosUrl = url + "queryPhotos";
    const request = axios.get(queryPhotosUrl, {
        params: query
    });

    return {
        type: FETCH_PHOTOS,
        payload: request
    };
}

export function getPhotosInAlbum(albumId) {

    const url = "http://localhost:3000/";
    const getPhotosInAlbumUrl = url + "getPhotosInAlbum";
    const payload = { albumId: albumId };

    const request = axios.get(getPhotosInAlbumUrl, {
        params: payload
    });

    return {
        type: FETCH_PHOTOS,
        payload: request
    };
}


export function fetchAlbums() {

    const url = "http://localhost:3000/";
    const fetchAlbumsUrl = url + "getAlbums";
    const request = axios.get(fetchAlbumsUrl);

    return {
        type: FETCH_ALBUMS,
        payload: request
    };
}

export function createAlbum(albumName) {

    const url = "http://localhost:3000/";
    const createAlbumUrl = url + "createAlbum";
    const payload = { albumName: albumName };

    const request = axios.get(createAlbumUrl, {
        params: payload
    });

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

