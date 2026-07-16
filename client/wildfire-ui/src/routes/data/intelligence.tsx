import { FeatherSatellite, FeatherShieldCheck, toast } from "@subframe/core"
import { Button } from "../../ui/components/ui/button"
import SideBar from "../constants/sidebar"
import { useNavigate } from "react-router"
import { useGetUser } from "../../hooks/use-auth"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Field, FieldDescription, FieldLabel, FieldGroup } from "../../ui/components/ui/field"
import { Input } from "../../ui/components/ui/input"
import { useCreatePrediction, useGetPrediction } from "../../hooks/use-model"
import { FeatherZap, FeatherMapPin, FeatherScan } from "@subframe/core"
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card } from "../../ui/components/ui/card"
import { IconWithBackground } from "../../ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/components/ui/table"

// 1. Define schema & type outside of component to prevent unnecessary re-renders
const coordinateValidation = z.object({
  westLon: z.number({ message: "Required" }).min(-180).max(180),
  southLat: z.number({ message: "Required" }).min(-90).max(90),
  eastLon: z.number({ message: "Required" }).min(-180).max(180),
  northLat: z.number({ message: "Required" }).min(-90).max(90),
})

type coordinateQuery = z.infer<typeof coordinateValidation>;

const Intelligence = () => {
  const navigate = useNavigate();
  
  // ==================== REACT HOOKS (Declared First!) ====================
  const { data: user } = useGetUser();
  const { data: predictions } = useGetPrediction();
  const { mutate: runPrediction, isPending } = useCreatePrediction();

  const { register, handleSubmit, formState: { errors } } = useForm<coordinateQuery>({
    resolver: zodResolver(coordinateValidation)
  });
  // =======================================================================

  // Safe early returns can now live comfortably below hook initialization
  if (user === undefined) return null;

  if (!user) {
    navigate("/");
    return null;
  }

  const onSubmit = (data: coordinateQuery) => {
    runPrediction({
      "west_longitude": data.westLon,
      "south_latitude": data.southLat,
      "east_longitude": data.eastLon,
      "north_latitude": data.northLat,
    }, {
      onSuccess: () => {
        toast.success("Data predictions successful!")
      }
    })
  }

  const capitalizeLetter = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  // Safely extract the single record details from your endpoint's "data" key:
  const activeRecord = predictions?.data;

  // Dynamically position the map to center on the prediction coordinates, or fall back to California default
  const mapCenterLatitude = activeRecord ? (activeRecord.south_lat + activeRecord.north_lat) / 2 : 37.4500;
  const mapCenterLongitude = activeRecord ? (activeRecord.west_lon + activeRecord.east_lon) / 2 : -122.1500;
  const position: [number, number] = [mapCenterLatitude, mapCenterLongitude];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Remains anchored to the left */}
      <SideBar />

      {/* Main Content Area - Expands to fill rest of screen */}
      <div className="flex flex-col flex-1 h-full overflow-y-auto pl-64">
        
        {/* Top Header Bar */}
        <div className="flex flex-row justify-between items-center border-b border-gray-200 bg-white p-4 px-8 sticky top-0 z-10 w-full">
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-xl text-gray-900">Wildfire Risk Intelligence</h1>
            <span className="text-sm text-gray-500">NASA FIRMS Ingestion • XGBoost Inference</span>
          </div>
          <div>
            <Button className="bg-[#DAFBE6] text-[#639273] hover:bg-[#c9f2d5]">
              <FeatherShieldCheck />{capitalizeLetter}
            </Button>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl w-full mx-auto">
          
          {/* Left Column: Input Form (Spans 4/12 cols) */}
          <div className="lg:col-span-4">
            <Card className="p-6 border border-gray-200 bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200 pb-4 mb-4 flex items-center gap-3">
                <IconWithBackground color="blue" icon={<FeatherScan />} />
                <div>
                  <h2 className="font-bold text-md text-gray-900">Geospatial Bounding Box</h2>
                  <p className="text-gray-400 text-xs">Define target region for inference</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FieldGroup className="space-y-4">
                  
                  {/* West Longitude */}
                  <Field className="relative">
                    <FieldLabel className="font-semibold">West Longitude</FieldLabel>
                    <Input className="border-gray-300" placeholder="-122.6750" required {...register("westLon", { valueAsNumber: true })} />
                    {errors.westLon && <span className="text-red-500 text-xs mt-1 block">{errors.westLon.message}</span>}
                    <FieldDescription>Decimal degrees (-180 to 180)</FieldDescription>
                  </Field>

                  {/* South Latitude */}
                  <Field className="relative">
                    <FieldLabel className="font-semibold">South Latitude</FieldLabel>
                    <Input className="border-gray-300" placeholder="37.4500" required {...register("southLat", { valueAsNumber: true })} />
                    {errors.southLat && <span className="text-red-500 text-xs mt-1 block">{errors.southLat.message}</span>}
                    <FieldDescription>Decimal degrees (-90 to 90)</FieldDescription>
                  </Field>

                  {/* East Longitude */}
                  <Field className="relative">
                    <FieldLabel className="font-semibold">East Longitude</FieldLabel>
                    <Input className="border-gray-300" placeholder="-122.1500" required {...register("eastLon", { valueAsNumber: true })} />
                    {errors.eastLon && <span className="text-red-500 text-xs mt-1 block">{errors.eastLon.message}</span>}
                    <FieldDescription>Decimal degrees (-180 to 180)</FieldDescription>
                  </Field>

                  {/* North Latitude */}
                  <Field className="relative">
                    <FieldLabel className="font-semibold">North Latitude</FieldLabel>
                    <Input className="border-gray-300" placeholder="37.8750" required {...register("northLat", { valueAsNumber: true })} />
                    {errors.northLat && <span className="text-red-500 text-xs mt-1 block">{errors.northLat.message}</span>}
                    <FieldDescription>Decimal degrees (-90 to 90)</FieldDescription>
                  </Field>
                </FieldGroup>

                <div className="pt-4 text-center">
                  <Button type="submit" disabled={isPending} className="w-full py-3 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-[#1d4ed8] transition-colors">
                    <FeatherZap />{isPending ? "Predicting..." : "Execute ML Inference"}
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">Running on XGBoost</p>
                </div>
              </form>
            </Card>
          </div>

          {/* Right Column: Map & Results Table (Spans 8/12 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Map Card */}
            <Card className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-3">
                <div className="flex items-center gap-2">
                  <FeatherMapPin className="text-blue-500" />
                  <h3 className="font-bold text-md text-gray-900">Interactive Hotspot Map</h3>
                </div>
                <Button className="bg-slate-100 text-slate-700 hover:bg-slate-200"><FeatherSatellite />Live FIRMS</Button>
              </div>

              <div className="overflow-hidden border border-gray-100 rounded-lg h-72 z-0">
                <MapContainer key={`${position[0]}-${position[1]}`} style={{ height: "100%", width: "100%" }} center={position} zoom={10}>
                  <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} draggable={true}>
                    <Popup>Bounding Box Centerpoint</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Card>

            {/* Analyzed Results Table Card */}
            <Card className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm h-80 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-gray-900">West Longitude</TableHead>
                    <TableHead className="font-bold text-gray-900">East Longitude</TableHead>
                    <TableHead className="font-bold text-gray-900">South Latitude</TableHead>
                    <TableHead className="font-bold text-gray-900">North Latitude</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeRecord ? (
                    <TableRow key={activeRecord.coordinate_id}>
                      <TableCell>{activeRecord.west_lon}°</TableCell>
                      <TableCell>{activeRecord.east_lon}°</TableCell>
                      <TableCell>{activeRecord.south_lat}°</TableCell>
                      <TableCell>{activeRecord.north_lat}°</TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-16 text-gray-400">
                        No predictions generated yet. Define coordinates and execute ML inference above.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Intelligence;