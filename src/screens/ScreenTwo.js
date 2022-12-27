import React, { useEffect, useState } from 'react'
import { storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc, getDoc } from 'firebase/firestore'

const ScreenTwo = () => {
    const [ file, setFile ] = useState('') // progress
    const [ percent, setPercent ] = useState(0) // Handle file upload event and update state
    const [ imgSrc, setImgSrc ] = useState('')
    const [ isSelectingImage, setIsSelectingImage ] = useState(false)
    const navigate = useNavigate()
    useEffect(
        () => {
            getImageFromFirestore()
        },
        [ imgSrc, isSelectingImage ]
    )
    function handleChange(event) {
        setFile(event.target.files[0])
    }

    const handleUpload = () => {
        if (!file) {
            alert('Please upload an image first!')
        }
        const storageRef = ref(storage, `/files/${file.name}`) // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100) // update progress
                setPercent(percent)
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                    const cityRef = doc(db, 'users', `${localStorage.getItem('uid')}`)
                    updateDoc(cityRef, {
                        imageRef: url
                    })
                    setIsSelectingImage(true)
                })
            }
        )
    }

    const getImageFromFirestore = async () => {
        const docRef = doc(db, 'users', `${localStorage.getItem('uid')}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setImgSrc(docSnap.data().imageRef)
           
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }
    }

    return (
        <>
           <p style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                Go Back
            </p>
       
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }}
        >
            <h1>Upload Image to firebase</h1>
             <input type="file" onChange={handleChange} accept="/image/*" />
             <button
                onClick={handleUpload}
                style={{
                    margin: '0rem auto',
                    width: '20%',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: '#255FD5',
                    color: '#fcfcfc',
                    borderRadius: '0.5rem'
                }}
            >
                Upload to Firebase
            </button>
                <p>{percent} "% done"</p>
            {imgSrc !== '' && <img src={imgSrc} alt="..." style={{ width: '30%', margin: '1rem 0rem' }} />}
            <button
                onClick={() => navigate('/screen-two')}
                style={{
                    margin: '0rem auto',
                    width: '20%',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: '#255FD5',
                    color: '#fcfcfc',
                    borderRadius: '0.5rem'
                }}
            >
                Move to next screen
            </button>
        </div>
        </>
    )
}

export default ScreenTwo
