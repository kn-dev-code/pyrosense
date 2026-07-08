### PyroSense: Wildfire Risk Intelligence Engine

PyroSense is an advanced wildfire intelligence platform designed to fuse satellite telemetry with machine learning to provide real-time risk scoring for rapid response teams.

### 🚀 Overview
PyroSense transforms raw satellite data into actionable risk intelligence. By utilizing real-time detections from NASA's Fire Information for Resource Management System (FIRMS), the engine performs inference to help teams assess and respond to fire threats before they spread.

### 🛠 Tech Stack
- **Machine Learning**: XGBoost model, trained for real-time risk assessment based on weather, fuel, and terrain data.
- **Backend**: FastAPI (Python) for high-performance API services and model inference.
- **Frontend**: React.js for a responsive, high-fidelity intelligence dashboard.
- **Data Ingestion**: Real-time integration with NASA FIRMS API.

### 🔑 Key Features
- **Real-time Hotspot Mapping**: Interactive visualization of live satellite detections.
- **ML Risk Scoring**: Automated risk assessment using an XGBoost pipeline to weigh environmental and geographical variables.
- **Micro-Climate Analytics**: Real-time environmental metrics (Temperature, Humidity, VPD) to model fuel dryness and fire behavior.
- **Incident Logging**: Streamlined field incident reporting synced directly with command dashboards.

### 📊 Project Architecture
The platform is built to provide an end-to-end intelligence pipeline:
- **Ingestion**: Fetching live telemetry from NASA FIRMS.
- **Inference**: Processing features through the XGBoost engine via FastAPI to generate accurate risk scores.
- **Visualization**: A React-based interface allowing field analysts to define geographic bounding boxes for specific, actionable intelligence.
