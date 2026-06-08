

const Dashboard = () => {

  const cards = {
    cardOne: {
      icon: "",
      title: "Real-time hotspot mapping",
      description: "Live NASA FIRMS satellite detections plotted on an interactive map so you always know where heat is building."
    },
    cardTwo: {
      icon: "",
      title: "ML risk scoring",
      description: "An XGBoost model weighs weather, fuel, and terrain to assign each zone a clear, trustworthy risk score."
    },
    cardThree: {
      icon: "",
      title: "Field incident logging",
      description: "Crews log observations and incidents from the field, keeping every report synced with command in seconds."
    }
  } 
  return (

    <div className = "flex flex-col h-screen bg-black">
      {/* Black Container -> Description/Intro */}
      <div className = "bg-white">Powered by XGBoost • NASA FIRMS</div>
      <h1 className = "text-4xl font-bold">Predict wildfire risk before it spreads</h1>
      <p className = "">PyroSense fuses satellite hostpot data with machine learning to score wildfire risk in realtime, so response teams act earlier and protect more.</p>

      {/* White Container -> More Information/Benefits */}
      <div className = "bg-white">
        <h2 className = "text-2xl font-bold">Built for the front line</h2>
        <span>Everything your teams needs to monitor, access, and respond to wildfire threats in one platform.</span>
        {Object.values(cards).map((card) => (
          <div className = "bg-white border-2 border-gray-300">
            <img src = {card.icon} alt = "Card Icon"/>
            <h2 className = "font-bold text-md">{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
