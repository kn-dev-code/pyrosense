import { Link } from "react-router-dom";
import { Button } from "../ui/components/ui/button";

const Navbar = () => {
  return (
    <div className="bg-white p-5 flex flex-row justify-between items-center">
      <Link className="text-black font-bold" to="/">
        PyroSense
      </Link>
      <div className = "flex flex-row gap-5">
        <Link className = "mt-1"to="/login">Login</Link>
        <Button className = "bg-[#EA580B] p-3 cursor-pointer hover:scale-105"><Link className = "text-white" to="/register">Sign Up</Link></Button>
      </div>
    </div>
  );
};

export default Navbar;
