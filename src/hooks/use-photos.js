import React , { useEffect, useState, useContext } from 'react'
import UserContext from '../context/user'
import {getPhotos, getUserByUserId } from '../services/firebase'

/**
 * 
 * @returns main home page feed component
 */
export default function usePhotos(){

    //list of photos
    const [photos, setPhotos] = useState(null)

    //current user
    const {
        user: { uid : userId = '' }
    } = useContext(UserContext)

    useEffect(() => {
        async function getTimeLinePhotos(){

            //extract following from user's info
            const [{ following }] = await getUserByUserId(userId)
            let followedUserPhotos = []

            //if user has following, get photos
            if( following.length > 0){
                followedUserPhotos = await getPhotos(userId, following)
            }

            //sort photos by date descending
            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
            setPhotos(followedUserPhotos)
        }

        getTimeLinePhotos()
        
    }, [userId])

return { photos }
}
