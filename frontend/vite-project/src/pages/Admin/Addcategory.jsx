import { useState } from "react";
import axios from 'axios'
import Adminlayout from "../../components/Adminlayout";
const Addcategory = ()=>{

    const [categoryName , setCategoryName] = useState('');
    const [categoryDescription , setCategoryDescription] = useState('');
    const [loader , setLoader] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e)=>{
      e.preventDefault();
        const categoryInfo = {categoryName, categoryDescription}
        try {
          setLoader(true)
          const res = await axios.post('http://localhost:7000/api/v1/create/category', categoryInfo, {
            withCredentials:true
          })
          setLoader(false)
          if(res.statusText=='OK'){
            alert('category created')
          }
          console.log('Response', res);
        } catch (error) {
           console.log('ERROR==', error);

        }
    }

    return (
        <>
        {/* <Adminlayout> */}
         <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-2 shadow-md border">
            <form className="p-3" onSubmit={handleSubmit}>
              <h4 className="text-center">Add Category</h4>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Name
                </label>
                <input
                  onChange={(e) => setCategoryName(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  description
                </label>
                <input
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  type="textarea"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button disabled={loader} type="submit" class="btn px-4 fw-bold btn-primary">
               {loader?'adding...':'+ Add'}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </Adminlayout> */}
        </>
    )
}

export default Addcategory;