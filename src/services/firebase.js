import { firebase, FieldValue } from '../lib/firebase'

//returns whether a username already exists
export async function doesUsernameExist(username){
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username' , '==', username)
      .get()

    return result.docs.map((user) => user.data().length > 0)
}

//get user from firestore where userid is equal to uerid from current auth
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

//return full user data by taking in a username
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

//returns a list of profiles to suggest to follow, who are not being followed yet
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

//toggle(add or delete) profile from current user's following list when follow button clicked
export async function updateLoggedInUserFollowing(loggedInUserDocId,profileId, isFollowingProfile){

  return firebase.firestore().collection('users')
  .doc(loggedInUserDocId)
  .update({
    following: isFollowingProfile 
      ? FieldValue.arrayRemove(profileId)
      : FieldValue.arrayUnion(profileId)
  })
}

//toggle(add or delete) profile from profile' follower's list when follow button clicked
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
   * returns photos of profile followed by current user along with caption, likes, comments and other details
   * userId = current user id
   * following = profiles which current user follows
   */

  //first get photos from followed profiles
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

  //get additional details and return
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


//get all photos by a user by taking in their id
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

//returns whether a profile is being followed by current user
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

//toggle between following and not following a user
export async function toggleFollow(
  isFollowingProfile,       //whether being followed currently
  activeUserDocId,          //docId of current user
  profileDocId,             //docId of target profile
  profileUserId,            //UserId of target profile
  followingUserId)          //userId of current user
{
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile)
}