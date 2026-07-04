import { Link } from "react-router-dom";
import { Button } from "../../ui/components/ui/button";
import { FeatherFlame } from "@subframe/core";
import { useGetUser, useLogout } from "../../hooks/use-auth";
import { useState } from "react";
const Navbar = () => {

  const { data: user } = useGetUser();
  const { mutate: handleLogout} = useLogout();
  const [showConfirm, setShowConfirm] = useState(false);


  if (user) {
    return (
      <>
        <div className="bg-white p-5 flex flex-row justify-between place-items-baseline px-4">
          <div className = "flex flex-row justify-center items-center gap-x-2">
            <Link to="/">
              <FeatherFlame className="bg-[#e9590c] font-body text-white p-2 rounded-md cursor-pointer" />
            </Link>
            <Link className="text-black font-bold " to="/">
              PyroSense
            </Link>
          </div>
          <div className="flex flex-row gap-1">
            {!showConfirm ? (
              <>
                <Button onClick={() => { setShowConfirm(true) }} className="bg-[#EA580B] p-3 cursor-pointer hover:scale-105 text-white">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-1 gap-x-5 relative right-15">
                  <Button onClick={() => { handleLogout() }} className="bg-[#47d040] p-3 cursor-pointer text-white hover:scale-105 w-[60%]">
                    Yes
                  </Button>
                  <Button onClick={() => { setShowConfirm(false) }} className="bg-[#df4343] p-3 cursor-pointer text-white hover:scale-105 w-[60%]">
                    No
                  </Button>
                </div>
              </>
            )}
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
