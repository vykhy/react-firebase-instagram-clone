import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'

/**
 * 
 * @returns main home page feed component
 */
export default function Timeline(){
    //we need to get logged in user's photos(hook)
    const { photos } = usePhotos()

    return (
        <div className='col-span-2'>
            {!photos ? (
            //react skeleton while loading
                <>
                   <Skeleton 
                   count={4} widht={640} height={400} 
                   className="mb-5"/>                  
                </>
            ): photos.length > 0 ?(
            //if photos, render them
                photos.map((content) => 
                <Post key={content.docId}  content={content} />)
            ):(
            //if no photos, tell them to follow people
                <p className="text-center text-2xl">Follow people to see photos</p>
            )
            }
        </div>

    )
}