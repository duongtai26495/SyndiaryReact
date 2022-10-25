import React from 'react'
import spinner from '../images/loading_spinner.gif'


const MyButton = ({isLoading, onClick = () =>{}, title, icon, color}) => {
    const LoadingSpinner = () =>{
        return (
            <img src={spinner} className='img-spinner' />
        )
    }
    
    const ContentBtn = () =>{
        return (
            <div className='flex flex-row'>
                <span>{title}</span>
                {icon}
            </div>
        )
    }
    var style = color+' btn btn-component w-full rounded-md p-2 mt-3 flex flex-col justify-center'
  return (
    <button className={style} onClick={onClick}>
        {isLoading ? <LoadingSpinner/> : <ContentBtn />}
    </button>
  )
}

export default MyButton