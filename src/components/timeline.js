import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'

export default function Timeline(){
    //we need to get logged in user's photos(hook)
    const { photos } = usePhotos()
    console.log(photos)
    //react skeleton while loading

    //if photos, render them

    //if no photos, tell them to create new post
    return (
        <div className='col-span-2'>
            <p>timeline</p>
        </div>

    )
}