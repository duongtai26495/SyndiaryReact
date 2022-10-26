import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
const DiaryRow = ({ diary }) => {

    let content = diary.content
    const [isShow, setShow] = useState(false)

  
    const openContent = () => {
        setShow(!isShow)
    }

    return (
        // <Link to={'/diary/' + diary.id} className='diary-row w-full p-2 m-2 bg-white rounded-md mt-2 flex flex-col'>
        <div className='diary-row w-full p-2 bg-white rounded-md mt-2 flex flex-col' >
            <div className={(isShow ? 'set_collapse' : '') +" diary_content rounded-md"}>
                {parse(content)}
                {/* {content} */}
            </div>
            <p className='diary_time mt-2 w-full text-end'>{diary.last_edited}</p>
            <span className='w-full flex flex-row  text-center p-2'><Link to={'/diary/' + diary.id} className='w-full'><i className="fa-solid fa-pen-to-square"></i></Link><button className='w-full' onClick={()=>openContent()} ><i className={(isShow ? 'open' : '') +" fa-solid fa-chevron-down"}></i></button></span>
        </div>
    )
}

export default DiaryRow