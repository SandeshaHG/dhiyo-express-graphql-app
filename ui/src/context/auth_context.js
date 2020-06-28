import React from 'react';

export default React.createContext({
    token: null,
    _id : null,
    email: null,
    name: null,
    image : 'profile.png',
    login: (token, email, tokenExpiration , _id , image) => {},
    updateImage : () => {},
    logout: () => {}
});