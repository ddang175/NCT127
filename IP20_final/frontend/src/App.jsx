import React, { useEffect, useState } from "react";
import HomePage from "./components/homePage";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatentView from "./components/patentView";
import Notes from "./components/Notes";
import "./App.css";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ViewNotes from "./components/ViewNotes";
import Stash from "./components/Stash";
// import SplitFlapBoardn from './components/test';
import SignupOrLogin from "./components/SignupOrLogin";
import AuthorsPage from "./components/AuthorsPage";
function App() {
  const [stash, setStash] = useState([]);

  useEffect(() => {
    console.log("Stash updated:", stash);
  }, [stash]);

  return (
    //we use routing
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route
          path="/patent"
          element={<PatentView stash={stash} setStash={setStash} />} //this one needs setStash because it needs to add to the stash
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/viewnotes" element={<ViewNotes />} />
        <Route
          path="/stash"
          element={<Stash stash={stash} setStash={setStash} />} //this one needs stash and setStash because it needs to remove from the stash and display it
        />
        <Route path="/signinorlogin" element={<SignupOrLogin />} />
        <Route path="/authors" element={<AuthorsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
