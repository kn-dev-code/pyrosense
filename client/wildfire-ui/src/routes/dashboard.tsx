import { Link } from "react-router-dom";
import { IconWithBackground } from "../ui";
import { Button } from "../ui/components/ui/button";
import { FeatherSparkles } from "@subframe/core";

const Dashboard = () => {
  const cards = {
    cardOne: {
      icon: "",
      title: "Real-time hotspot mapping",
      description:
        "Live NASA FIRMS satellite detections plotted on an interactive map so you always know where heat is building.",
    },
    cardTwo: {
      icon: "",
      title: "ML risk scoring",
      description:
        "An XGBoost model weighs weather, fuel, and terrain to assign each zone a clear, trustworthy risk score.",
    },
    cardThree: {
      icon: "",
      title: "Field incident logging",
      description:
        "Crews log observations and incidents from the field, keeping every report synced with command in seconds.",
    },
  };
  return (
    <div className="w-screen h-screen ">
      {/* Black Container -> Description/Intro */}
      <div className="flex flex-col h-screen bg-black justify-center items-center text-center gap-y-5 pb-60">
        <div className="bg-white rounded-sm p-2 w-[22%] h-8 py-1 pr-4">
          <FeatherSparkles className="text-[#e9590c]" />
          Powered by XGBoost • NASA FIRMS
        </div>
        <h1 className="text-6xl w-4xl font-bold text-white">
          Predict wildfire risk before it spreads
        </h1>
        <p className="text-[#D4D4D4] w-[48%] text-shadow-2xs text-2xl">
          PyroSense fuses satellite hostpot data with machine learning to score
          wildfire risk in realtime, so response teams act earlier and protect
          more.
        </p>
        <div className = "flex flex-row gap-x-5">
          <Button className="bg-[#e9590c] p-5 hover:scale-105">
            <Link className = "text-md font-bold text-white cursor-pointer" to = "/register">
            Get Started
            </Link>
          </Button>
          <Button className="border-2 border-[#737373] p-5 cursor-pointer hover:scale-105">
            <Link className="text-[#222222] hover:text-white transition-all duration-300 cursor-pointer" to="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
      {/* White Container -> More Information/Benefits */}
      <div className="bg-white">
        <h2 className="text-2xl font-bold">Built for the front line</h2>
        <span>
          Everything your teams needs to monitor, access, and respond to
          wildfire threats in one platform.
        </span>
        {Object.values(cards).map((card) => (
          <div className="bg-white border-2 border-gray-300 grid grid-rows-3 items-center">
            <img src={card.icon} alt="Card Icon" />
            <h2 className="font-bold text-md">{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
