import React , { useEffect, useState, useContext } from 'react'
import UserContext from '../context/user'
import {getPhotos, getUserByUserId } from '../services/firebase'

export default function usePhotos(){
    const [photos, setPhotos] = useState(null)
    const {
        user: { uid : userId = '' }
    } = useContext(UserContext)

    useEffect(() => {
        async function getTimeLinePhotos(){

            const [{ following }] = await getUserByUserId(userId)
            let followedUserPhotos = []


            //if user has following
            if( following.length > 0){
                followedUserPhotos = await getPhotos(userId, following)
            }

            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
            setPhotos(followedUserPhotos)
        }

        getTimeLinePhotos()
        
    }, [userId])

return { photos }
}
