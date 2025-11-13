import { useEffect, useState } from "react";
import CommonForm from "../components/CommonForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("user");

  const [photoPreview, setPhotoPreview] = useState("");
  // const [photo, setPhoto] = useState("");
  const [image, setImage] = useState(null);

  const [fileContent,setFileContent] = useState('');

  const { user, error, loading } = useSelector((state) => state.user);
  console.log("registerdVal==", user, "errrrrr==", error);

 useEffect(()=>{
  if(error){
    alert(error)
  }
 },[error])

  const handlePhotoChange = (e) => {

    const file = e.target.files[0];
    // console.log("FILE===", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPhotoPreview(reader?.result);
      setPhoto(file);
    };
    
    // console.log("REader", photoPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const obj = { username, email, password, role, photo };
    // console.log("object==", obj);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("photo", image);

    dispatch(registerUser(formData));

   

  
  };

  

  const handleDataUpload = async(e)=>{
    e.preventDefault();
    console.log('fileCOntent ', fileContent)
    const formData = new FormData();
    formData.append('photo', fileContent)
    formData.append('name', 'sushil')
    await axios.post('http://localhost:7000/api/v1/upload-photo', formData, {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    })
  }

  useEffect(()=>{
    if(user){
      navigate('/login')
    }
  },[user,navigate])

  return (
    <>
      {/* <CommonForm fields={fields} onSubmit={registerUser} buttonLabel={'Submit'} formHeader={'Register'} /> */}
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5 shadow-md border">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center">Register</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  UserName
                </label>
                <input
                  onChange={(e) => setusername(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Role
                </label>
                <select name="" onChange={(e) => setrole(e.target.value)} id="">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Upload Photo
                </label>
                <span>
                  {photoPreview ? (
                    <img
                      style={{ width: "100px", padding: "10px" }}
                      src={photoPreview}
                      alt="image preview"
                    />
                  ) : (
                    ""
                  )}
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                </span>
              </div>

              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button disabled={loading} type="submit" class="btn btn-primary">
                {loading ? "Submitting....." : "Submit"}
              </button>
            </form>

             {/* <form onSubmit={handleDataUpload}>
              <h1 className="text-center">Upload photo</h1>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Upload Photo
                </label>
                <span>
                  {photoPreview ? (
                    <img
                      style={{ width: "100px", padding: "10px" }}
                      src={photoPreview}
                      alt="image preview"
                    />
                  ) : (
                    ""
                  )}
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                </span>
              </div>

              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button disabled={loading} type="submit" class="btn btn-primary">
                {loading ? "Submitting....." : "Submit"}
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
