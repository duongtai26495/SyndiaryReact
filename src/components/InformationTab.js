import { async } from '@firebase/util'
import { getStorage, ref as storageRef, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from 'react'
import { genderValue, getUserInfoLogin, updateProfilePhoto } from '../config/api_functions'
import { app } from '../config/firebase';
import { useStore } from '../store'
import default_img from '../images/bg-1.jpg'
import spinner from '../images/loading_spinner.gif'
import { updateUserInfo as UpdateInfo, updateLoginState } from '../store/actions'
import { ACCESS_TOKEN, EMAIL_LOCAL, FULLNAME_LOCAL, GENDER_LOCAL, PROFILE_PHOTO_LOCAL, USERNAME_LOCAL } from '../store/constants'
import MyButton from './MyButton';
import { v4 } from 'uuid';
import FormUpdate from './FormUpdate';

const InformationTab = () => {
    const [state, dispatch] = useStore()
    const { updateUserInfo } = state


    const [oldImage, setOldImage] = useState('')
    const [profile_photo, setProfile_photo] = useState(localStorage.getItem(PROFILE_PHOTO_LOCAL) ? localStorage.getItem(PROFILE_PHOTO_LOCAL) : default_img)
    const [update_photo_label, setUpdate_photo_label] = useState("Update Photo")
    const [isLoadingPhoto, setLoadingPhoto] = useState(false)
    const [isUpdateInfo, setUpdateInfo] = useState(false)
    const [imageConfirm, setImageConfirm] = useState(false)

    const [fullName, setFullname] = React.useState(localStorage.getItem(FULLNAME_LOCAL))
    const [email, setEmail] = React.useState(localStorage.getItem(EMAIL_LOCAL))
    const [gender, setGender] = React.useState(localStorage.getItem(GENDER_LOCAL))

    const fileRef = useRef(null)

    const uploadProfileImage = (e) => {
        setLoadingPhoto(true)
        setImageConfirm(true)
        uploadImageToFirebase(e)
    }




    const ConfirmImage = () => {
        return (
            <div className='w-full confirm_image flex flex-row'>
                <MyButton title={"Save"} color={'bg-cyan-700 text-white'} onClick={() => confirmUpload()} />
                <MyButton title={"Cancel"} color={'bg-orange-500 text-white'} onClick={() => clearCacheImage()} />
            </div>
        )
    }

    const uploadImageToFirebase = async file => {
        if (file != null) {
            const storage = getStorage(app);
            const storageRefer = storageRef(storage, 'UserProfile/' + localStorage.getItem(USERNAME_LOCAL) + '/profile_image/' + v4())
            const uploadTask = uploadBytesResumable(storageRefer, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setUpdate_photo_label(progress + '%');
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setOldImage(profile_photo)
                        setProfile_photo(downloadURL)
                        setLoadingPhoto(false)
                    });
                }
            );

        }
    }

    const confirmUpload = async () => {
        const result = await updateProfilePhoto(profile_photo);
        console.log(result)
        if (result === 'SUCCESS') {
            localStorage.setItem(PROFILE_PHOTO_LOCAL, profile_photo)
            fileRef.current.value = null
            dispatch(UpdateInfo(!updateUserInfo))
        }
    }

    const clearCacheImage = () => {
        setProfile_photo(oldImage)
        setImageConfirm(false)
        setLoadingPhoto(false)
        fileRef.current.value = null
    }

    return (
        <div className='w-full bg-opacity-60 p-2 bg-slate-100 rounded-md mt-2 shadow-box'>
            <div className='profile_phot_view'>
                <div style={{ backgroundImage: 'url(' + profile_photo + ')' }} className='w-full profile_photo' ></div>
                <label htmlFor="profile_image_upload" className='w-full change_image_label bg-opacity-50 bg-black pb-4 text-center text-white' >{update_photo_label}</label>

                {isLoadingPhoto ? (
                    <div className='uploading_gif bg-white bg-opacity-70'>
                        <img src={spinner} className="" />
                    </div>) : ''}

                <input ref={fileRef}
                    type="file"
                    id="profile_image_upload"
                    className='hidden'
                    name="image"
                    onChange={(e) => {
                        uploadProfileImage(e.target.files[0])
                    }} />

            </div>

            {imageConfirm ? <ConfirmImage /> : ""}

            {isUpdateInfo ?
                (
                    <FormUpdate  />
                ) :
                (
                    <div className='inforUser_wrapper w-full p-2 flex flex-col'>
                        <h2 className=' full_name m-auto flex-wrap p-2'>{localStorage.getItem(FULLNAME_LOCAL)}</h2>
                        <div className='w-full'>
                            <p className='flex-wrap'>Username:  <b>{localStorage.getItem(USERNAME_LOCAL)}</b></p>
                            <p className='flex-wrap'>Email:  <b>{localStorage.getItem(EMAIL_LOCAL)}</b></p>
                            <p className='flex-wrap'>Gender:  <b>{genderValue(localStorage.getItem(GENDER_LOCAL))}</b></p>
                        </div>
                        <MyButton title={"Update Information"} color={'bg-cyan-700 text-white'} onClick={() => setUpdateInfo(!isUpdateInfo)} />
                    </div>

                )}


        </div>
    )
}

export default InformationTab