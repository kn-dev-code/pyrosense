import {BrowserRouter, Routes, Route} from "react-router";
import Navbar from "./routes/navbar";
import Dashboard from "./routes/dashboard";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Dashboard/>}/>
        <Route path = "/login" element = {<SignIn/>}/>
        <Route path = "/register" element = {<SignUp/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
