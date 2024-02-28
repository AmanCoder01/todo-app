import {
  Route,
  Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import "./app.css";


function App() {
  const info = localStorage.getItem('user');

  const [user, setUser] = useState(JSON.parse(info));
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-richblack-900  h-full max-h-full w-screen">
      <div >
        <Navbar user={user} setShowModal={setShowModal} />
      </div>
      <div className="mt-[4rem]">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Home user={user} showModal={showModal} setShowModal={setShowModal} />} />
          <Route path="*" element={<Error />} />

        </Routes>
      </div>

    </div>
  );
}

export default App;
