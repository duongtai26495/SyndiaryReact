import React, { useState } from 'react'
import MyButton from '../components/MyButton'
import { addNewDiary } from '../config/api_functions'
import { useStore } from '../store'
import {updateLoginState } from '../store/actions'
import JoditEditor from 'jodit-react';
import { Link, useNavigate } from 'react-router-dom'

const AddDiary = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [state, dispatch] = useStore()
    const [content, setContent] = useState('')
    const {userLoginState} = state
    const handleNewDiary = async () =>{
      setLoading(true)
        var diary = {
          "content":content,
          "display":true
        }
        console.log(content)
        await addNewDiary(diary)
        dispatch(updateLoginState(!userLoginState))
        navigate("/")
        setLoading(false)
        
    }
  
  return (
   <div className='w-full p-2'>
        <h4 className='p-2'>Add new</h4>
        <JoditEditor
        className={'bg-white'}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onChange={newContent => setContent(newContent)}
      />
        <MyButton color={'bg-teal-700 text-white'} loading={loading} onClick={handleNewDiary} title={'Save'} icon={<i className="fa-solid fa-floppy-disk"></i>} />
        <Link to="/" ><MyButton color={' bg-cyan-600 text-white'} title={'Back'} icon={<i className="fa-regular fa-hand-point-left"></i>}/></Link>
   </div>
  )
}

export default AddDiary