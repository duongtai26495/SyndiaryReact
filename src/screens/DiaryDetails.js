import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDiary, updateDiary, deleteDiary } from '../config/api_functions'
import { useStore } from '../store';
import { updateLoginState } from '../store/actions';
import MyButton from '../components/MyButton';
import JoditEditor from 'jodit-react';

const DiaryDetails = () => {

  useEffect(() => {
    getDiaryDetails()
  }, [])

  const { id } = useParams()
  const navigate = useNavigate()
  const [state, dispatch] = useStore()
  const { userLoginState } = state
  const [loading, setLoading] = useState(false)

  const [content, setContent] = useState('')
  const [display, setDisplay] = useState(true)

  const getDiaryDetails = async () => {
    const result = await getDiary(id)
    setContent(result.content)
    setDisplay(result.display)
  }

  const handleEditDiary = async () => {
    setLoading(true)
    if (content !== '') {
      var diary = {
        "content": content,
        "display": display,
        "id": id,
      }

      let result = await updateDiary(diary)
      if (result === 'SUCCESS') {
        getBack()
      }
    }
  }

  const getBack = () => {
    setLoading(true)
    dispatch(updateLoginState(!userLoginState))
    navigate("/")
    setLoading(false)
  }

  const removeDiary = async () => {
    setLoading(true)
    let result = await deleteDiary(id)
    if (result === 'SUCCESS') {
      getBack()
    }
  }


  return (
    <div className='w-full p-2'>
      <h4 className='p-2'>Update</h4>

      <JoditEditor
        value={content}
        tabIndex={1} // tabIndex of textarea
        onChange={newContent => setContent(newContent)}
      />
      <MyButton color={'bg-teal-700 text-white'} onClick={handleEditDiary} title={'Save'} loading={loading} icon={<i className="fa-solid fa-floppy-disk"></i>} />
      <MyButton color={' bg-orange-600 text-white'} onClick={() => removeDiary()} title={'Delete'} loading={loading} icon={<i className="fa-solid fa-trash"></i>} />
      <MyButton color={'bg-cyan-600 text-white'} onClick={() => getBack()} title={'Back'} loading={loading} icon={<i className="fa-regular fa-hand-point-left"></i>} />
    </div>
  )
}

export default DiaryDetails