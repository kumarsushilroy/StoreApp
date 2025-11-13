
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({sidebarContent}) => {
  return (
    <div>
          
            <div>
                <ul>
                  {
                   sidebarContent?.map((item,i)=>(
                    <Link to={item.path}><span className='d-flex gap-4 p-3 absolute'>{item.icon}<li>{item.heading}</li></span></Link>
                   ))
                  }
                </ul>
            </div>
          
        </div>
  )
}

export default Sidebar