import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { CreateTodoApi } from '../service/ApiCall';
import { loadingTrue, loadingFalse, setToken, setRefresh, removeRefresh } from '../redux/slices/IsLoggedIn.js';
import { useDispatch, useSelector } from 'react-redux'


const AddTaskForm = ({ onClose }) => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    dispatch(removeRefresh(null));
    e.preventDefault();
    if (!todo || todo === '') {
      return toast.error("Please enter a valid task", { duration: 2000 });
    }
    // send data to server here

    const res = await CreateTodoApi({ desc: todo });
    if (res.status === 200) {
      if (res.data.status === 200) {
        toast.success(res.data.message);
        dispatch(setRefresh(new Date()));
        onClose();
      }
    } else {
      toast.error("Something wend wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-richblack-700 text-richblack-200 rounded-lg p-8 max-w-lg w-full ">
        <p className="text-2xl mb-8 text-center font-bold "> Add a task</p>
        <form action="" className='flex flex-col gap-9'>
          <label htmlFor="taskName" className="mb-2 block font-medium">
            <p className='text-sm text-richblack-25 pb-1'>Task</p>
            <input className='bg-richblack-800 rounded-[0.75rem] w-full p-[12px] outline-none text-richblack-5' placeholder='Enter your task' type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          </label>
          <div className='flex items-center justify-between'>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-richblack-700 font-bold py-[7px] px-5 rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-richblack-700 font-bold py-[7px] px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Add Task
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default AddTaskForm
