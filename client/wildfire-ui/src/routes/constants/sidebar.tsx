
import { FeatherCloudSun } from "@subframe/core";
import { FeatherFlame } from "@subframe/core";
import { FeatherMap } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherMoreHorizontal } from "@subframe/core";
import { FeatherSatellite } from "@subframe/core";
import { FeatherScan } from "@subframe/core";
import { FeatherShieldCheck } from "@subframe/core";
import { FeatherTriangleAlert } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { IconWithBackground } from "../../ui";
import { useGetUser } from "../../hooks/use-auth";
import { Link } from "react-router-dom";


  
  const SideBar = () => {
   const {data:user} = useGetUser();

    return (
      <div className="flex flex-col justify-between pl-6 pr-4 border-gray-100 border-r-2 border-b-2 w-[15%] h-screen pt-8 pb-8 bg-white select-none">
        
        {/* Top Half Stack */}
        <div className="flex flex-col gap-y-8 relative bottom-24">
          
          {/* Header Branding Row */}
          <div className="flex items-center gap-x-3 ">
            <Link className = "hover:cursor-pointer" to = "/" ><IconWithBackground variant="error" size="large" icon={<FeatherFlame />} /></Link>
            <div className="flex flex-col shrink-0">
              <span className="text-md font-bold text-black tracking-tight">Pyro Intelligence</span>
              <span className="text-sm text-[#a79f9f] font-medium">Wildfire Engine</span>
            </div>
          </div>
  
          {/* Access Menu Block */}
          <div className="flex flex-col gap-y-3 ">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Access Menu
            </span>
            
            {/* Nav Item 1 */}
            <div className="flex items-center gap-x-3 text-sm font-medium text-[#868686]  hover:text-[#7193E8] hover:bg-[#EFF6FF] transition-colors cursor-pointer py-1.5">
              <FeatherMap className="w-4 h-4 shrink-0" />
              <span>Dashboard / Map</span>
            </div>
            
            {/* Nav Item 2 */}
            <div className="flex items-center gap-x-3 text-sm font-medium text-[#868686] hover:text-[#7193E8] hover:bg-[#EFF6FF] transition-colors cursor-pointer py-1.5">
              <FeatherCloudSun className="w-4 h-4 shrink-0" />
              <span>Micro Climate</span>
            </div>
            
            {/* Nav Item 3 */}
            <div className="flex items-center gap-x-3 text-sm font-medium text-[#868686] hover:text-[#7193E8] hover:bg-[#EFF6FF]  transition-colors cursor-pointer py-1.5">
              <FeatherFlame className="w-4 h-4 shrink-0" />
              <span>Incident Logger</span>
            </div>
          </div>
  
        </div>   
  
        {/* Bottom Profile Section */}
        <div className="flex flex-col gap-y-0.5 pt-4 border-t border-gray-100">
          <span className="text-sm text-black font-bold">{user.username}</span>
          <span className="text-xs text-[#808080] font-medium">{user.role.toUpperCase()}</span>
        </div>
  
      </div>
    );
  };
  
  export default SideBar;