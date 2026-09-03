// import { useState,useEffect } from 'react'
// import { Route, Routes} from 'react-router-dom';
// import './App.css'
// import Navbar from "./Components/Layout/Navbar";
// import Footer from "./Components/Layout/Footer";
// import HomePage from "./Components/HomePage/HomePage";
// import DisplayPage from "./Components/DisplayPage/DisplayPage";
// import FilterPage from "./Components/FilterPage/FilterPage";
// import ProfilePage from './Components/ProfilePage/UserProfile';
// import DepartmentPage from "./Components/FilterPage/Departments/Departments";
// import ClubsPage from "./Components/FilterPage/Clubs/Clubs";
// import IEEEClubsPage from "./Components/FilterPage/IEEEClubs/IEEEClubs.jsx";
// import AdminProfilePage from './Components/AdminPostPage/AdminProfilePage';
// import CreatePost from './Components/CreatePost/CreatePost.jsx';
// import EditPost from './Components/CreatePost/EditPost.jsx';
// import EditProfile from './Components/ProfilePage/EditProfile.jsx';
// import SavedPosts from './Components/ProfilePage/SavedPost.jsx';
// import DeleteAccount from './Components/ProfilePage/DeleteAccount.jsx';
// import PostPage from "./Components/Post/PostPage";
// import Login from './Components/SignUp/Login';
// import SignUp from './Components/SignUp/SignUp';
// import Placementnews from './Components/PlacementNews/PlacementNews.jsx';
// import { useFlash } from "./Context/FlashContext";
// import FlashMessage from "./Components/Common/FlashMessage";

// import LeftSidebar from './Components/ProfilePage/LeftSidebar.jsx';
// import AIChat from "./Components/AIAssistant/AIChat";

// function App() {  
//     const { flash, setFlash } = useFlash();

//     useEffect(() => {
//       const savedTheme = localStorage.getItem("theme");
//       document.body.classList.toggle("dark-theme", savedTheme === "dark");
//     }, []);

//   return (
//      <div className="app-container"  >
//       <header className="navbar-row">
//         <Navbar />
//       </header>
//       <div className="left-sidebar">
//         <ProfilePage/>
//       </div>

//       <div className="center-feed">
//         <FlashMessage
//         flash={flash}
//         clearFlash={() => setFlash({ type: "", message: "" })}
//         /> 

//         <Routes> 
//           <Route path="/" element={<HomePage  setFlash={setFlash}  />} /> 
//           <Route path="/display" element={<DisplayPage/>} /> 
//           <Route path="/filter" element={<FilterPage/>} /> 
//           <Route path="/filter/departments" element={<DepartmentPage/>} /> 
//           <Route path="/filter/clubs" element={<ClubsPage/>} /> 
//           <Route path="/filter/ieeeclubs" element={<IEEEClubsPage/>} /> 
//           <Route path="/profile" element={<ProfilePage/>} /> 
//           <Route path="/placementnews" element={<Placementnews/>} /> 
//           <Route path="/filter/admin/:deptId" element={<AdminProfilePage setFlash={setFlash}/>} /> 
//           <Route path="/createpost" element={<CreatePost/>} /> 
//           <Route path="/editpost/:id" element={<EditPost/>} /> 
//           <Route path="/profile/edit" element={<EditProfile/>} /> 
//           <Route path="/profile/delete" element={<DeleteAccount/>} />
//           <Route path="/profile/saved" element={ <SavedPosts  setFlash={setFlash} />} />
//           <Route path="/posts/:id" element={<PostPage />} />
//           <Route path="/login" element={<Login/>} /> 
//           <Route path="/signup" element={<SignUp/>} /> 
//         </Routes> 

//         </div>     
    

//       <div className="right-sidebar">
//         <DisplayPage/>
//       </div>
//       <div className="footer">
//         <Footer />
//       </div>
//       <AIChat />
//     </div>
//   )
// }

// export default App

import { useState,useEffect } from 'react'
import { Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
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
import Placementnews from './Components/PlacementNews/PlacementNews.jsx';
import { useFlash } from "./Context/FlashContext";
import FlashMessage from "./Components/Common/FlashMessage";

import LeftSidebar from './Components/ProfilePage/LeftSidebar.jsx';
import RightSidebar from './Components/Layout/RightSidebar.jsx';
import AIChat from "./Components/AIAssistant/AIChat";

function App() {  
    const { flash, setFlash } = useFlash();
    const [showAI, setShowAI] = useState(false);

    useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }, []);

  return (
     <div className="app-container"  >
      <header className="navbar-row">
        <Navbar showAI={showAI} setShowAI={setShowAI} />
      </header>
      <div className="left-sidebar">
        <LeftSidebar />
      </div>

      <div className="center-feed">
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
          <Route path="/placementnews" element={<Placementnews/>} /> 
          <Route path="/filter/admin/:deptId" element={<AdminProfilePage setFlash={setFlash}/>} /> 
          <Route path="/createpost" element={<CreatePost/>} /> 
          <Route path="/editpost/:id" element={<EditPost/>} /> 
          <Route path="/profile/edit" element={<EditProfile/>} /> 
          <Route path="/profile/delete" element={<DeleteAccount/>} />
          <Route path="/profile/saved" element={ <SavedPosts  setFlash={setFlash} />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/signup" element={<SignUp/>} /> 
        </Routes> 

        </div>     
    

      <div className="right-sidebar">
        <RightSidebar />
      </div>
      <div className="footer">
        <Footer />
      </div>
      <AIChat showAI={showAI} onClose={() => setShowAI(false)} />
    </div>
  )
}

export default App
