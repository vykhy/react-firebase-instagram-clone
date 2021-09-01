import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'

export default function Timeline(){
    //we need to get logged in user's photos(hook)
    const { photos } = usePhotos()
    //react skeleton while loading

    //if photos, render them

    //if no photos, tell them to create new post
    return (
        <div className='col-span-2'>
            {!photos ? (
                <>
                   <Skeleton 
                   count={4} widht={640} height={400} 
                   className="mb-5"/>                  
                </>
            ): photos.length > 0 ?(
                photos.map((content) => 
                <Post key={content.docId}  content={content} />)
            ):(
                <p className="text-center text-2xl">Follow people to see photos</p>
            )
            }
        </div>

    )
}