import { useState,useEffect } from 'react'
import { Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage/HomePage";
import DisplayPage from "./Components/DisplayPage/DisplayPage";
import FilterPage from "./Components/FilterPage/FilterPage";
import ProfilePage from './Components/ProfilePage/UserProfile';
import DepartmentPage from "./Components/FilterPage/Departments/Departments";
import ClubsPage from "./Components/FilterPage/Clubs/Clubs";
import IEEEClubsPage from "./Components/FilterPage/IEEEClubs/IEEEClubs.jsx";
import AdminProfilePage from './Components/AdminPostPage/AdminProfilePage';
import CreatePost from './Components/CreatePost/CreatePost.jsx';
import EditPost from './Components/CreatePost/EditPost.jsx';
import EditProfile from './Components/ProfilePage/EditProfile.jsx';
import SavedPosts from './Components/ProfilePage/SavedPost.jsx';
import DeleteAccount from './Components/ProfilePage/DeleteAccount.jsx';
import PostPage from "./Components/Post/PostPage";
import Login from './Components/SignUp/Login';
import SignUp from './Components/SignUp/SignUp';
import { useFlash } from "./Context/FlashContext";
import FlashMessage from "./Components/Common/FlashMessage";

function App() {  
    const { flash, setFlash } = useFlash();

  return (
     <div className='min-vh-100 ' style={{backgroundColor:'black'}} >
      <Navbar  />
        <FlashMessage
        flash={flash}
        clearFlash={() => setFlash({ type: "", message: "" })}
        />
        
        <Routes> 
          <Route path="/" element={<HomePage  setFlash={setFlash}  />} /> 
          <Route path="/display" element={<DisplayPage/>} /> 
          <Route path="/filter" element={<FilterPage/>} /> 
          <Route path="/filter/departments" element={<DepartmentPage/>} /> 
          <Route path="/filter/clubs" element={<ClubsPage/>} /> 
          <Route path="/filter/ieeeclubs" element={<IEEEClubsPage/>} /> 
          <Route path="/profile" element={<ProfilePage/>} /> 
          <Route path="/filter/admin/:deptId" element={<AdminProfilePage/>} /> 
          <Route path="/createpost" element={<CreatePost/>} /> 
          <Route path="/editpost/:id" element={<EditPost/>} /> 
          <Route path="/profile/edit" element={<EditProfile/>} /> 
          <Route path="/profile/delete" element={<DeleteAccount/>} />
          <Route path="/profile/saved" element={ <SavedPosts  setFlash={setFlash} />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/signup" element={<SignUp/>} /> 
        </Routes>
       
    
        
        
      <Footer/>
    </div>
  )
}

export default App
