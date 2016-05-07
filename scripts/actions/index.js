export function selectPhoto(photo) {
  // selectPhoto is an ActionCreator, it needs to return an action,
  // an object with a type property.
    console.log("a photo has been selected.", photo.title);
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

export function updateTags(tags) {
    console.log("the tags have been updated.");
    return {
        type: "TAGS_UPDATED",
        payload: tags
    }
}

// export function createAlbum(albumName) {
//     console.log("create album", albumName);
//     return {
//         type: "CREATE_ALBUM",
//         payload: albumName
//     }
// }

export function updateAlbums(albums) {
    console.log("the albums have been updated.");
    return {
        type: "ALBUMS_UPDATED",
        payload: albums
    }
}

