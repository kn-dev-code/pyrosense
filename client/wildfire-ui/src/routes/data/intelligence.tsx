
import { FeatherShieldCheck } from "@subframe/core"
import { Button } from "../../ui/components/ui/button"
import SideBar from "../constants/sidebar"
import { useNavigate } from "react-router"
import { useGetUser } from "../../hooks/use-auth"
const Intelligence = () => {

  const navigate = useNavigate();
  const {data:user} = useGetUser();
  if (!user) {
      return (
          navigate("/")
      )
  }
  return (
    <div className="bg-white h-full w-screen overflow-hidden"> {/* Main Box */}
      {/* Top Bar */}
      <div className="flex flex-row justify-between border-2 border-black w-[86%] p-4 relative left-[14.9%] place-items-center">
        <div className="flex flex-col justify-center pl-4">
          <h1 className = "text-shadow-black font-bold text-xl">Wildfire Risk Intelligence</h1>
          <span className = "text-sm">NASA FIRMS Ingestion • XGBoost Inference</span>
        </div>
        <div className="grow shrink-0 relative left-[63%]">
          <Button className="p-1 bg-[#DAFBE6] text-[#639273] w-[9%] h-[15%]"><FeatherShieldCheck/>{user.role}</Button>
        </div>
      </div>
      <SideBar />

      {/* Coordinate Box */}
      <div>

      </div>

      {/* Hotspot Box */}
      <div>

      </div>

      {/* Result Box */}
      <div>

      </div>

    </div>
  )
}

export default Intelligence
