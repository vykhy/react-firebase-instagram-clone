import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Post from '../post/index'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import UserContext from '../../context/user'
import { useContext } from 'react'
import { getUserByUserId } from '../../services/firebase'

export default function Photos( { photos } ){

    const [username, setusername] = useState('')

    const [popup, setPopup] = useState({
        popup:false,
        photo: null
    })

    const { user } = useContext(UserContext)

    async function getuserinfo(){
        let [userl] = await getUserByUserId(popup.photo.userId)
        setusername(userl.username)
    }

    useEffect(() => {
        async function getData(){
            if(popup.popup && !popup.photo.userLikedPhoto){
                getuserinfo()
        
                let userLikedPhoto = false
            
                if(popup.photo.likes.includes(user.uid)){
                    console.log(user.uid)
                    console.log(popup.photo.likes)
                    userLikedPhoto = true
                }        
                setPopup({popup: true, photo: { username: username, ...popup.photo, userLikedPhoto }}
                )
                console.log(userLikedPhoto)

            }
        }
        getData()
        
    }, [popup.photo])

    function handlePopup (photo) {
        setPopup({popup: !popup.popup,
            photo: photo || null}
        )
    }
    return(
        <div className="container mx-auto h-16 border-t border-gray-primary mt-12 pt-4">
            <div className='grid grid-cols-3 gap-4 mt-4 mb-12'>
                {!photos ? (
                    <div>
                        <Skeleton count={12} height={400} className="w-6" />
                    </div>
                ) : (
                    photos.map(photo => (
                        <div className="relative group" key={photo.docId}>
                            <img src={photo.imageSrc} alt={photo.caption}  />   
                            <div className="absolute bottom-0 left-0 bg-gray-200 
                                z-10 w-full justify-evenly items-center h-full 
                                bg-black-faded group-hover:flex hidden" onClick={() => handlePopup(photo)}>
                                <p className='flex items-center text-white font-bold'>
                                    <svg 
                                        xmlns="https://www.w3.org/2000/svg" 
                                        viewBox='0 0 20 20'    
                                        fill="currentColor"
                                        className="w-8 mr-4"
                                        ><path 
                                            fillRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4
                                            4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {photo.likes.length}
                                </p>
                                <p className="flex items-center text-white font-bold">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-8 mr-4"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    {photo.comments.length}
                                </p>
                            </div>
                        </div>
                    ))
                ) }
                {
                    popup.popup ? (
                    <div className="fixed top-0 left-0 w-screen min-h-screen max-h-full overflow-y-scroll">
                        <div className='w-3/5 mx-auto bg-white'>
                         <span className="text-2xl" onClick={() => handlePopup(null)}>X CLOSE</span>
                        <Post content={popup.photo} />
                         {/* {popup.photo.comments.map(item => 
                              <p key={`${item.comment}-${item.displayName}`} 
                                 className="mb-1" >
                                 link to commenter profile
                                 <Link to={`/p/${item.displayName}`}>
                                     <span className="mr-1 font-bold">
                                        {item.displayName}
                                     </span>
                                 </Link>
                                 <span>
                                     {item.comment}
                                 </span>
                             </p>
                         )}*/}
                         
                        </div>

                    </div>
                    ) : null
                }
            </div>
        {!photos || (photos.length === 0 && 
            <p className="text-center text-2xl">
                No Posts Yet
            </p>
        )}
        </div>
    )
}

Photos.propTypes = {
    photos: PropTypes.array
}