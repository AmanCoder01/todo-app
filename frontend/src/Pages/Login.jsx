import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast";
import frameImage from "../assets/frame.png";
import mainImage from "../assets/login.png";
import { LoginApi, getToken } from '../service/ApiCall.js';
import { useDispatch, useSelector } from 'react-redux'
import { loadingTrue, loadingFalse, setToken } from '../redux/slices/IsLoggedIn.js';
import Spinner from '../Components/Spinner.jsx';



const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function changeHandler(event) {
    setFormData((prev) => (
      {
        ...prev,
        [event.target.name]: event.target.value
      }
    ))
  }


  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard");
    }
  }, []);

  const submitHandler = async (e) => {
    if (error !== null) {
      dispatch(loadingTrue(true));
    };
    e.preventDefault();
    setError(null);

    const res = await LoginApi(formData);
    if (res.status === 200) {
      if (res.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        dispatch(setToken(res.data.data));
        navigate("/dashboard");
        toast.success(res.data.message);
        return;
      }
      if (res.data.status === 201) {
        setError(res.data.data);
        return;
      }
      if (res.data.status === 202) {
        toast.success(res.data.message);
        return;
      }
    } else {
      toast.error("Something wend wrong");
    }
  }

  return (
    <>
      
        <div className='flex py-20 mx-auto gap-[80px]   w-11/12 max-w-[1300px] flex-wrap-reverse  '>

          <div className='flex-col mx-auto rounded-lg  bg-richblack-700 py-8 px-14 xs:px-6  w-11/12 max-w-[540px]    flex items-center justify-center '>
            <div className='my-2'>
              <h1 className='text-white text-2xl font-semibold'>Welcome to our platform</h1>
            </div>
            <form action="" onSubmit={submitHandler} className='text-white w-full my-7  flex flex-col gap-6'>
              <label htmlFor="">
                <p className='text-sm text-richblack-25 pb-1'>Email <sup className='text-red-500 text-xs'>*</sup> </p>
                <input className='bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5' type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Enter Email' />
                {
                  error?.email && (<small className=' text-red-500'>{error.email.msg}</small>)
                }
              </label>
              <label htmlFor="">
                <p className='text-sm text-richblack-25 pb-1'>Password <sup className='text-red-500 text-xs'>*</sup> </p>
                <input className='bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5' type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Enter Password' />
                {
                  error?.password && (<small className=' text-red-500'>{error.password.msg}</small>)
                }
              </label>
              <div className='w-full mt-2'>
                <button type='submit' className='w-full bg-yellow-400 text-richblack-700 font-semibold text-lg  py-[9px] px-3 rounded-md '>Login</button>
              </div>
            </form>
          </div>


          <div className='w-11/12 max-w-[540px] mx-auto md:hidden lg:block sm:hidden xs:hidden    relative'>
            <img src={frameImage} width={450} alt="" />
            <img src={mainImage} className='absolute right-[5rem] top-3 ' width={450} alt="" />
          </div>
        </div >
    
    </>
  )
}

export default Login;
