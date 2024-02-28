import React, { useEffect, useState } from 'react'
import AddTaskForm from '../Components/AddTaskForm'
import { useNavigate } from "react-router-dom"
import { GetTodoApi, getToken } from '../service/ApiCall';
import OneItem from '../Components/OneItem';
import { useSelector } from 'react-redux'
import EmptyList from '../Components/EmptyList';
import "./Home.css"

const Home = ({ showModal, setShowModal }) => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tasks");
  const navigate = useNavigate();

  const { refresh } = useSelector((state) => state.app);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }

    fetchData();
  }, [refresh])

  const fetchData = async () => {
    const res = await GetTodoApi();
    if (res.status === 200 && res.data.status === 200) {
      setName(res.data.data.firstName);
      setList(res.data.data.todos.reverse());
    }
  }

  function handleComplete() {
    setCategory("Completed");
  }

  function handleTasks() {
    setCategory("Tasks")
  }

  function handlePending() {
    setCategory("Pending");
  }

  return (
    <div className=' max-h-screen bg-richblack-900'>
      <div>
        {showModal && <AddTaskForm onClose={() => setShowModal(false)} />}
      </div>


      <div className='flex flex-wrap justify-center items-center xs:h-[80vh] h-[90vh] max-w-full '>

        <div className='lg:mt-[0rem] md:mt-[2rem] xs:mt-[3rem] sm:mt-[2rem] max-w-[580px] xs:w-[360px] lg:w-5/12 sm:w-12/12'>
          <h3 className='text-white text-xl font-semibold text-center sm:text-md'>Hi <i className='text-yellow-400 tracking-widest uppercase'>{name} </i> , Welcome to your task list...</h3>
          <h1 className='text-yellow-50 lg:text-[7rem] sm:text-[3rem] xs:text-[3rem]  font-bold text-center ' style={{ fontFamily: "Protest Revolution" }}> Todo List</h1>

        </div>

        <div className='  lg:w-7/12 sm:w-12/12  xs:w-[360px]'>
          <div className='relative flex flex-col mx-auto bg-richblack-700 border-[0.3rem] border-richblack-200 max-w-[700px] min-w-[270px] lg:h-[78vh] xs:h-[57vh] rounded-[1.2rem] my-4'>
            <div className='flex items-center justify-center space-x-6  py-8 xs:py-3 mt-3'>
              <button onClick={handleTasks} className={`bg-richblack-700 py-1 px-3 rounded-full min:w-[90px] lg:w-32 border border-richblack-100 transition duration-200 text-richblack-25  
${category === "Tasks" && "bg-richblack-800 py-2 border-2 border-richblack-200"
                }
              `} >Tasks</button>
              <button onClick={handlePending} className={`bg-richblack-700 py-1 px-3 rounded-full min:w-[90px] lg:w-32 border border-richblack-100 transition duration-200 text-richblack-25  
${category === "Pending" && "bg-richblack-800 py-2 border-2 border-richblack-200"
                }
              `} >Pending</button>
              <button onClick={handleComplete} className={`bg-richblack-700 py-1 px-3 rounded-full min:w-[90px] lg:w-32 border border-richblack-100 transition duration-200 text-richblack-25  
${category === "Completed" && "bg-richblack-800 py-2 border-2 border-richblack-200"
                }
              `}>Completed</button>
            </div>

            <div className=' h-[60vh] w-full mb-2 px-9  gap-3 overflow-auto scroll-auto  '>

              {
                list.length === 0 ? (<EmptyList title={"Tasks"} />) : (
                  list?.map((item, index) => {
                    switch (category) {
                      case "Tasks":
                        return <OneItem key={index} item={item} />;
                      case "Completed":
                        return item.isCompleted ? <OneItem key={index} item={item} /> : null;

                      case "Pending":
                        return item.isCompleted ? null : <OneItem key={index} item={item} />;
                      default:
                        break;
                    }
                  }))
              }
            </div>


            <div className='fixed xs:bottom-1 xs:right-[1rem] lg:bottom-4 lg:right-[7rem] md:right-[5rem] sm:right-[3rem]'>
              <button className='bg-yellow-400 text-lg hover:bg-yellow-500 py-2 px-16 rounded-full font-bold  shadow-[0_6px_8px_-4px_#e4a11b] transition duration-150 ease-in-out' variant="gradient" onClick={() => setShowModal(true)} >Add Task</button>
            </div>
          </div>
        </div>


      </div>





    </div>
  )
}

export default Home
