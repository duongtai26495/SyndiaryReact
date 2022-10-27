import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListDiary from '../components/ListDiary'

import { SORT_CREATED_ASC, SORT_CREATED_DESC, SORT_LAST_EDITED_ASC, SORT_LAST_EDITED_DESC } from '../store/constants'
import { changeSort } from '../store/actions'
import { getAllDiary } from '../config/api_functions'
import { useStore } from '../store'

const Home = () => {

  const [state, dispatch] = useStore()
  const { userLoginState, sort } = state
  const [listDiaries, setDiaries] = useState([])


  const updateSort = list => {
    var newList = []
    switch (sort) {

      case SORT_LAST_EDITED_DESC:
        newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) }).reverse()
        break
      case SORT_LAST_EDITED_ASC:
        newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) })
        break
      case SORT_CREATED_ASC:
        newList = list.sort((a, b) => { return a.created_at.localeCompare(b.created_at) })
        break
      case SORT_CREATED_DESC:
        newList = list.sort((a, b) => {return a.created_at.localeCompare(b.created_at)}).reverse()
        break
      default:
        newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) }).reverse()
        break
    }

    setDiaries([])
    setDiaries(newList)
    return newList
  }

  useEffect(() => {
    getData()
  }, [sort])

  const getData = async () => {
    var list = await getAllDiary()
    setDiaries(updateSort(list))
  }

  const TopComponent = () => {
    return (
      <div className='w-full p-2 mt-2 rounded-md bg-opacity-70 flex flex-row bg-white'>
        <div className='w-1/2 text-start'>
          <select className='sort_diary' value={sort} onChange={(e) => {
            dispatch(changeSort(e.target.value))
          }}>
            <option value={SORT_LAST_EDITED_DESC}>LAST EDITED DESC</option>
            <option value={SORT_LAST_EDITED_ASC}>LAST EDITED ASC</option>
            <option value={SORT_CREATED_ASC}>CREATED AT ASC</option>
            <option value={SORT_CREATED_DESC}>CREATED AT DESC</option>
          </select>
        </div>
        <div className='w-1/2 text-end'>
          <Link className='m-auto' to="/add"><i className="fa-solid fa-file-circle-plus"></i></Link>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full px-3'>
      <TopComponent />
      <ListDiary diaries={listDiaries} />
    </div>
  )
}

export default Home