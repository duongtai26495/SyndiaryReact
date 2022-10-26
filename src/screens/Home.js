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

  const [sorting, setSort] = useState(sort)

  const updateSort = (sort_select, list) => {
    var newList = []
    setSort(sort_select)
    switch (sort_select) {
    
      case SORT_LAST_EDITED_ASC:
        newList = list.sort((a, b) => { return a.last_edited - b.last_edited })
        dispatch(changeSort(SORT_LAST_EDITED_ASC))
        break
      case SORT_CREATED_ASC:
        newList = list.sort((a, b) => { return a.created_at - b.created_at })
        dispatch(changeSort(SORT_CREATED_ASC))
        break
      case SORT_CREATED_DESC:
        newList = list.sort((a, b) => { return a.created_at - b.created_at }).reverse()
        dispatch(changeSort(SORT_CREATED_DESC))
        break
      default:
        newList = list.sort((a, b) => { return a.last_edited - b.last_edited }).reverse()
        dispatch(changeSort(SORT_LAST_EDITED_DESC))
        break

    }

    list.forEach((e) => {
      console.log(e)
    })
    setDiaries(newList)
  }



  useEffect(() => {
      getData()
  }, [userLoginState])

  const getData = async () => {
    var list = await getAllDiary()
    setDiaries(list)
    // setDiaries(updateSort(sort,list))
  }

  const TopComponent = () => {
    return (
      <div className='w-full p-2 mt-2 rounded-md bg-opacity-70 flex flex-row bg-white'>
        <div className='w-1/2 text-start'>
          <select className='sort_diary' value={sorting} onChange={(e) => updateSort(e.target.value, listDiaries)}>
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