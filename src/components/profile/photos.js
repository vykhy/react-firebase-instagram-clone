import React, { useState, useEffect } from 'react'
import Post from '../post/index'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import UserContext from '../../context/user'
import { useContext } from 'react'
import { getUserByUserId } from '../../services/firebase'

export default function Photos( { photos } ){

    //list of photos
    //we need to copy because we have to get additional data whether current user has liked a post
    const [photoList, setphotoList] = useState(null)

    useEffect(() => {
        setphotoList(photos)
    }, [])
    //track whether popup is active
    const [popup, setPopup] = useState({
        popup:false,
        photo: null,
    })

    //current user -> needed for info on togglelike
    const { user: uid } = useContext(UserContext)

    useEffect(() => {

        //close popup in case user clicks another profile
        setPopup({popup:false, photo:null})
        //get photo username and whether current user has liked that photo
        async function updatePhotoDetails(){
            const photosWithUserDetails = await Promise.all(

                photos.map(async (photo) => {
                //check whether current user has liked this photo
                let userLikedPhoto = false
            
                if(photo.likes.includes(uid.uid)){
                    userLikedPhoto = true
                }
            
                //get profile of the user of each photo
                const user = await getUserByUserId(photo.userId)
                //destructure because returns array
                const { username } = user[0]
            
                return { username, ...photo, userLikedPhoto }
                })
            )
            setphotoList(photosWithUserDetails)
        }

        uid && photos && updatePhotoDetails()
    }, [photos, uid])
    
    //console.log(photoList)
    // async function getuserinfo(){
    //     let [userl] = await getUserByUserId(popup.photo.userId)
    //     setusername(userl.username)
    // }
    //
    // useEffect(() => {
    //     async function getData(){
    //         if(popup.popup && !popup.photo.userLikedPhoto){
    //             getuserinfo()

    //             setPopup({popup: true, photo: { username: username,userLikedPhoto: userLikedPhoto, ...popup.photo, }}
    //             )
    //             console.log(popup)

    //         }
    //     }
    //     getData()
        
    // }, [popup.photo])

    function handlePopup (photo) {
        setPopup({popup: !popup.popup,
            photo: photo || null}
        )
    }
    return(
        <div className="container mx-auto h-16 border-t border-gray-primary mt-12 pt-4">
            <div className='grid grid-cols-3 gap-4 mt-4 mb-12'>
                {!photoList ? (
                    <div>
                        <Skeleton count={12} height={400} className="w-6" />
                    </div>
                ) : (
                    photoList.map(photo => (
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
                    <div style={{ background:'rgba(0,0,0,0.7)' }} className="fixed top-0 left-0 w-screen min-h-screen max-h-full overflow-y-scroll">
                        <div style={{ minWidth:'720px' }} className='w-3/5 mx-auto bg-white'>
                         <span style={{ color: 'rgba(50,50,50)',
                            position:'fixed',
                            right:"20px",
                            top:"20px",
                            fontSize:"55px",
                            border:"2px solid black",
                            borderRadius:'3px'
                            }} className="text-2xl cursor-pointer p-3 text-align-center" onClick={() => handlePopup(null)}>X</span>
                        <Post content={popup.photo} 

                        //setPhotoWithDetails={setPhotoWithDetails}
                        />
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