import { Link } from "react-router-dom";
import { Button } from "../../ui/components/ui/button";
import { FeatherFlame } from "@subframe/core";
import { useGetUser, useLogout} from "../../hooks/use-auth";
import { useState } from "react";
const Navbar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const {data: user} = useGetUser();
  const {mutate: handleLogout, isPending} = useLogout(); 


  const handleLogoutClick = () => {
    setIsLoggingOut(true);
  }
  
  if (user) {
    return (
<>
<div className="bg-white p-5 flex flex-row justify-between place-items-center">
      <Link to="/">
        <FeatherFlame className="bg-[#e9590c] font-body text-white p-2 rounded-md cursor-pointer" />
      </Link>
      <Link className="text-black font-bold pr-[85%]" to="/">
        PyroSense
      </Link>
      <div className="flex flex-row gap-5">
        {isLoggingOut ? (
          <div className = "flex flex-row justify-center">
            <Button className = "bg-green-300 p-2 cursor-pointer hover:scale-105 text-white min-w-sm" onClick = {() => {handleLogout()}}>Yes</Button>
            <Button className = "bg-red-300 p-2 cursor-pointer hover:scale-105 text-white">No</Button>
            </div>
        ) : (
          <Button onClick = {handleLogoutClick} className = "bg-[#EA580B] p-3 cursor-pointer hover:scale-105 text-white"></Button> 
        )}
        <Button onClick = {handleLogoutClick} className="bg-[#EA580B] p-3 cursor-pointer hover:scale-105 text-white">
          Logout
        </Button>
      </div>
    </div>
</>
    )
  }
  return (
    <div className="bg-white p-5 flex flex-row justify-between place-items-center">
      <Link to="/">
        <FeatherFlame className="bg-[#e9590c] font-body text-white p-2 rounded-md cursor-pointer" />
      </Link>
      <Link className="text-black font-bold pr-[81%]" to="/">
        PyroSense
      </Link>
      <div className="flex flex-row gap-5">
        <Link className="mt-1" to="/login">
          Login
        </Link>
        <Button className="bg-[#EA580B] p-3 cursor-pointer hover:scale-105">
          <Link className="text-white" to="/register">
            Sign Up
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
