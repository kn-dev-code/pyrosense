import { Link } from "react-router-dom";
import { Button } from "../../ui/components/ui/button";
import { FeatherFlame } from "@subframe/core";

const Navbar = () => {
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
