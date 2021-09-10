import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import FirebaseContext  from '../context/firebase'
import UserContext from '../context/user'

export default function AddPost(){

    const {user} = useContext(UserContext)
    const {firebase} = useContext(FirebaseContext)
    //form inputs
    const [photo, setPhoto] = useState(null)
    const[caption, setCaption] = useState('')

    //upload progress
    const [progress, setProgress] = useState(null)

    function notValid(){
        if(photo && photo.type.includes('image')) return false
        return true
    }
    //cant submit form if photo not valid/jpg
    const isInvalid = photo === '' || photo === null || notValid()
    
    const handleImageAsFile = (e) =>{
        setPhoto(imageFile => (e.target.files[0]))
    }
    useEffect(() => {
        notValid()
    }, [photo])

    //upload photo
    const uploadPhoto = (e) => {
        e.preventDefault();
        
        console.log(photo)

        const storage = firebase.storage().ref()
        const uploadtask = storage.child('public/' + photo.name).put(photo)

        uploadtask.on('state_changed',
            (snapshot) => {
                let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)) * 100
                setProgress(progress)
            },(error)=>{
                throw error
            },() => {
                uploadtask.snapshot.ref.getDownloadURL().then((url) =>{
                    //setUrl(url)
                    //save image data to firestore
                    firebase.firestore().collection('photos').add(
                        {
                            caption : caption,
                            userId: user.uid,
                            photoId: Date.now(),
                            imageSrc: url,
                            comments: [],
                            likes: [],
                            dateCreated: Date.now()
                        })
                        // .then((docRef) => {
                        //     console.log("Document written with ID: ", docRef.id);
                        // })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                        setCaption('')
                }
            )}
        )
    }

    return(
        <div>
            <Header />
            <div className="container">
                <form onSubmit={uploadPhoto} method='post' >
                <input
                    aria-label="New post image"
                    type='file'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
                    onChange= {handleImageAsFile}
                ></input>
                <input
                    aria-label="Enter new post caption"
                    type='text'
                    placeholder='your caption...'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
                    onChange= {({ target }) => setCaption(target.value)}
                ></input>
                <button
                disabled = {isInvalid}
                type = 'submit'
                className = {`bg-blue-medium text-white w-full rounded h-8 font-bold
                ${isInvalid && 'opacity-50'}`}
                >Create</button>
                </form>
                {progress}
            </div>
        </div>
         
    )
}