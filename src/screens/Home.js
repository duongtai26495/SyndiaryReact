import React, { useEffect, useState } from 'react'
import ListDiary from '../components/ListDiary'
import { getAllDiary } from '../config/api_functions'
import { useStore } from '../store'

const Home = () => {

  const [state, dispatch] = useStore()
  const { userLoginState } = state
  const [listDiaries, setDiaries] = useState([])

  useEffect(()=>{
    getData()
  },[userLoginState])

  const getData = async () => {
    var list = await getAllDiary()
    setDiaries(list)
  }


  return (
    <div className='w-full'>
      <ListDiary diaries={listDiaries} />
    </div>
  )
}

export default Home