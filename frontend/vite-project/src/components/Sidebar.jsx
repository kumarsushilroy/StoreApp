
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
          
            <div >
                <ul >
                   <Link to={'/admin/addproduct'}> <li>addProduct</li> </Link>
                    <Link to={'/admin/products'}>Products</Link>
                    <li>Profile</li>
                    <Link to={'/admin/addcategory'}> <li>Add Category</li> </Link>
                </ul>
            </div>
          
        </div>
  )
}

export default Sidebar