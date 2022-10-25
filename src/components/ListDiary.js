import DiaryRow from './DiaryRow'
import React from 'react'
const ListDiary = ({diaries}) => {
    
    var list = diaries.reverse()

    return (
        <div className='w-full p-2 flex flex-row flex-wrap'>
            {
                list?.map((diary) => {
                   return ( 
                   <DiaryRow key={diary.id} diary={diary} />)
                })
            }
        </div>
    )
}

export default ListDiary