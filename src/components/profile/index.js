import React,{ useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function Profile({ user }) {

  //useReducer function
  const reducer = (state, newState) => ({ ...state, ...newState });

  //useReducer param
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0
  };

  //set initial values for the profile
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //get real values from database and update useReducer state
  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch( {profile: user, photosCollection: photos, followerCount: user.followers ? user.followers.length : 0 });
    }

    //run only if logged in user
    if(user.username){
        getProfileInfoAndPhotos();
    }
  }, [user.username]);
  
  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} setPhotos={dispatch} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};
