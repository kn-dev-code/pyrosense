import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import Navbar from "./routes/navbar";
import Dashboard from "./routes/dashboard";

const App = () => {
  return (
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path = "/" element={<Dashboard/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/register" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
