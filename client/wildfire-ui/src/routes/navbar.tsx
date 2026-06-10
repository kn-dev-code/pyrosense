import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white p-5 flex flex-row justify-between">
      <Link className="text-black font-bold" to="/">
        PyroSense
      </Link>
      <div className = "flex flex-row gap-5">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
