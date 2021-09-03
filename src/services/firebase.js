import { func } from 'prop-types'
import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username){
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username' , '==', username)
      .get()

    return result.docs.map((user) => user.data().length > 0)
}

//get user from firestore where userid i equal to uerid from current auth
export async function getUserByUserId(userId){
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

    const user = result.docs.map((item) => ({
      ...item.data(),
      docId : item.id
    }
    ))
  return user
}

export async function getUserByUsername(username){
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

    return result.docs.map((item) => ({
      ...item.data(),
      docId : item.id
    }))
}

export async function getSuggestedProfiles(userId, following){

  //return await firebase.firestore().collection('users').get()
  // let query = firebase.firestore().collection('users');

  // if (following.length > 0) {
  //   query = query.where('userId', 'not-in', [...following, userId]);
  // } else {
  //   query = query.where('userId', '!=', userId);
  // }
  // const result = await query.limit(10).get();

  // const profiles = result.docs.map((user) => ({
  //   ...user.data(),
  //   docId: user.id
  // }));

  // return profiles;

  const result = await firebase.firestore().collection('users').limit(10).get()
  
  return result.docs
    .map((user) => ({ ...user.data(), docId:user.id}))
    .filter((profile) => (profile.userId !== userId) &&
    !following.includes(profile.userId))
}

export async function updateLoggedInUserFollowing(loggedInUserDocId,profileId, isFollowingProfile){

  return firebase.firestore().collection('users')
  .doc(loggedInUserDocId)
  .update({
    following: isFollowingProfile 
      ? FieldValue.arrayRemove(profileId)
      : FieldValue.arrayUnion(profileId)
  })
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId,isFollowingProfile){

  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile 
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    })
}

export async function getPhotos(userId, following){

  /**
   * userId = current user id
   * following = profiles which current user follows
   */
  const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', following)
      .get()
  
  //get doc of each photo
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id

  }))

  const photosWithUserDetails = await Promise.all(

    userFollowedPhotos.map(async (photo) => {
      //check whether current user has liked this photo
      let userLikedPhoto = false

      if(photo.likes.includes(userId)){
        userLikedPhoto = true
      }

      //get profile of the user of each photo
      const user = await getUserByUserId(photo.userId)
      //destructure because returns array
      const { username } = user[0]

      return { username, ...photo, userLikedPhoto }
    })
  )

  return photosWithUserDetails
}

export async function getUserPhotosByUserId(userId){

  const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get()

  return result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }))
}

export async function isUserFollowingProfile(currentUserUsername, profileUserId){
  const result = await firebase.firestore()
      .collection('users')
      .where('username', '==', currentUserUsername)
      .where('following', 'array-contains', profileUserId)
      .get()

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return response.userId 
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId){
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile)
}