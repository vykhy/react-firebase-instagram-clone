import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'
import useUser from '../hooks/use-user'
//import User from './context/user'
import Suggestions from './sidebar/suggestions'

/**
 * 
 * @returns main home page feed component
 */
export default function Timeline(){
    //we need to get logged in user's photos(hook)
    const { photos } = usePhotos()

    const {
        user: { docId, userId, following }
       } = useUser()

    return (
        <div className='col-span-2 w-screen md:w-full'>
            {!photos ? (
            //react skeleton while loading
                <>
                   <Skeleton 
                   count={4} widht={640} height={400} 
                   className="mb-5"/>                  
                </>
            ): photos.length > 0 ?(
            //if photos, render them
                photos.map((content, index) => (
                <div key={content.docId}>
                    {index == 3 && 
                    //to show suggestions even lower in the feed after 3rd post
                    //especially for smaller devices where sideline is invisible
                    //can do a index % <num> === 0 to sprinkle throughout the feed
                        <div className="my-12 w-4/5 mx-auto container">
                            <Suggestions  userId={ userId } following={following} loggedInUserDocId={docId}/>
                        </div>}
                    <Post  content={content} />
                </div>
                ))
            ):(
            //if no photos, tell them to follow people
                <p className="text-center text-2xl">Follow people to see photos</p>
            )
            }
        </div>

    )
}