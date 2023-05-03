import axios from "axios";

export const setUser = (name, surname, avatar, email) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/create`,
    {
        name,
        surname,
        avatar,
        email
    },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const getUser = (email) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/getUser`,
    { email },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const getPhoto = (photoId) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/getPhoto`,
    { photoId },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const getRatings = (photoId) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/getRatings`,
    { photoId },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const deletePhoto = (photoId) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/deletePhoto`,
    { photoId },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const addPhotoInfo = (photoId, category, info) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/addPhotoInfo`,
    {
        photoId,
        category,
        info
    },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const getOutfits = () => axios.get(`${ process.env.VUE_APP_SERVER_API }/api/getOutfits`,
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const getMyPhotos = (userId) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/getMyPhotos`,
    { userId },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const getPhotos = (userId) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/getPhotos`,
    { userId },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);

export const ratePhoto = (photoId, userId, numOfStars, comment) => axios.post(`${ process.env.VUE_APP_SERVER_API }/api/ratePicture`,
    {
        photoId,
        userId,
        numOfStars,
        comment
    },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
);
