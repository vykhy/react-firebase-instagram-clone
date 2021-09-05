import React, { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'

export default function Header(
    {
     photosCount, 
     followerCount,
     setFollowerCount,
     profile: {
        docId: profileDocId, 
        userId: profileUserId, 
        fullName, 
        following = [],
        followers = [],
        username: profileUsername
        }
    }){

    //state of whether current user is following the currently viewed profile
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)

    //current user
    const { user } = useUser()

    //show button if currently viewed profile is not current user's profile
    const activeBtnFollow = user?.username && user.username !== profileUsername
    
    //toggle following and not following both in firebase and in UI
    const handleToggleFollow = async () => {

        //toggle following state
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)

        //update UI
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })

        //call firebase service to toggle following
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
    }

    //get whether current user is following the profile on initial profile load || another profile viewed
    useEffect(() => {
        const isLoggedInUserFollowingProfile = async() => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId)
            
            setIsFollowingProfile(!!isFollowing)
        }

        if(user.username && profileUserId){
            isLoggedInUserFollowingProfile()
        }
    }, [user?.username, profileUserId])

    return(
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className='container flex justiy-center'>
                {profileUsername && (
                <img
                    className="rounded-full h-40 w-40 flex"
                    alt={`${profileUsername} profile picture`}
                    src={`/images/avatars/${profileUsername}.jpg`}
                />  )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className='container flex items-center'>
                    <p className='text-2xl mr-4'>{profileUsername}</p>
                    {activeBtnFollow && (
                        <button 
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} height={24} width={677} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className='font-bold'>{photosCount} </span>
                                {` `}{photosCount === 1 ? 'post': 'posts'}
                            </p>
                            <p className="mr-10">
                                <span className='font-bold'>{followerCount} </span>
                                {` `}{followers.length === 1 ? 'follower': 'followers'}
                            </p>
                            <p className="mr-10">
                                <span className='font-bold'>{following.length}</span> following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {!fullName? <Skeleton count={1} height={24} width="100"
                        /> : fullName }
                    </p>
                </div>
            </div>
        </div>
    )
}


Header.propTypes = {
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    photosCount: PropTypes.number.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
       followers: PropTypes.array,
       username: PropTypes.string
    }).isRequired
}