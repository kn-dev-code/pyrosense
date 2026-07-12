import { FeatherSatellite, FeatherShieldCheck } from "@subframe/core"
import { Button } from "../../ui/components/ui/button"
import SideBar from "../constants/sidebar"
import { useNavigate } from "react-router"
import { useGetUser } from "../../hooks/use-auth"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Field, FieldDescription, FieldLabel, FieldGroup } from "../../ui/components/ui/field"
import { Input } from "../../ui/components/ui/input"
import { useCreatePrediction } from "../../hooks/use-model"
import { FeatherZap } from "@subframe/core"
import { FeatherMapPin } from "@subframe/core"
import { FeatherScan } from "@subframe/core"
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card } from "../../ui/components/ui/card"
import { IconWithBackground } from "../../ui"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/components/ui/table"
const Intelligence = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();
  const { mutate: runPrediction, isPending } = useCreatePrediction();

  if (!user) {
    navigate("/");
  }

  const coordinateValidation = z.object({
    westLon: z.number({ message: "Required" }).min(-180, "Cannot exceed -180°").max(180, "Cannot exceed 180°"),
    southLat: z.number({ message: "Required" }).min(-90, "Cannot exceed -90°").max(90, "Cannot exceed 90°"),
    eastLon: z.number({ message: "Required" }).min(-180, "Cannot exceed -180°").max(180, "Cannot exceed 180°"),
    northLat: z.number({ message: "Required" }).min(-90, "Cannot exceed -90°").max(90, "Cannot exceed 90°"),
  })

  type coordinateQuery = z.infer<typeof coordinateValidation>;

  const { register, handleSubmit, formState: { errors } } = useForm<coordinateQuery>({
    resolver: zodResolver(coordinateValidation)
  });

  const onSubmit = (data: coordinateQuery) => {
    runPrediction(data, {
      onSuccess: () => {
        navigate("/field/reports")
      }
    })
  }

  const capitalizeLetter = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  const position: [number, number] = [51.505, -0.09];

  return (
    <div className="bg-white w-screen overflow-hidden h-screen">
      {/* Top Bar */}
      <div className="flex flex-row justify-between border-2 border-gray-100 w-[86%] p-4 relative left-[14.9%] place-items-center">
        <div className="flex flex-col justify-center pl-4">
          <h1 className="text-shadow-black font-bold text-xl">Wildfire Risk Intelligence</h1>
          <span className="text-sm">NASA FIRMS Ingestion • XGBoost Inference</span>
        </div>
        <div className="grow shrink-0 relative left-[63%]">
          <Button className="p-1 bg-[#DAFBE6] text-[#639273] w-[9%] h-[15%]"><FeatherShieldCheck />{capitalizeLetter}</Button>
        </div>
      </div>
      <SideBar />

      {/* Coordinate Box */}
      <div className="p-1 border-2 border-[#c3c0c0] flex flex-col-2 place-items-center flex-1 max-w-sm fixed left-64 translate-y-[-115%] bg-white rounded-lg">
        <div className="p-4 flex flex-col max-w-sm">
          <div className="border-b-2 border-[#c3c0c0] w-[168.5%] relative right-4 flex flex-col justify-center items-center pb-3.5">
            <h1 className="font-bold text-md"><IconWithBackground className="relative right-6 top-5.5" color="blue" icon={<FeatherScan />} />Geospatial Bounding Box</h1>
            <span className="text-[#a79f9f] text-sm">Define the target region for inference</span>
          </div>
          <form className="relative left-[8%]" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="pt-2 w-[150%]">

              {/* West Longitude */}
              <Field className="relative">
                <FieldLabel className="font-bold" htmlFor="westLon">West Longitude</FieldLabel>
                <Input className="border-2 border-[#c3c0c0]" id="westLon" placeholder="-122.6750" required {...register("westLon", { valueAsNumber: true })} />
                {errors.westLon && (
                  <span className="text-red-500 pb-1 text-xs absolute left-0 -bottom-6">{errors.westLon.message}</span>
                )}
              </Field>
              <FieldDescription>Decimal degrees (-180 to 180)</FieldDescription>

              {/* South Latitude */}
              <Field className="relative">
                <FieldLabel className="font-bold" htmlFor="southLat">South Latitude</FieldLabel>
                <Input className="border-2 border-[#c3c0c0]" id="southLat" placeholder="37.4500" required {...register("southLat", { valueAsNumber: true })} />
                {errors.southLat && (
                  <span className="text-xs text-red-500 absolute left-0 -bottom-6">{errors.southLat.message}</span>
                )}
              </Field>
              <FieldDescription>Decimal degrees (-90 to 90)</FieldDescription>

              {/* East Longitude */}
              <Field className="relative">
                <FieldLabel className="font-bold" htmlFor="eastLon">East Longitude</FieldLabel>
                <Input className="border-2 border-[#c3c0c0]" id="eastLon" placeholder="-122.1500" required {...register("eastLon", { valueAsNumber: true })} />
                {errors.eastLon && (
                  <span className="text-xs text-red-500 absolute left-0 -bottom-6">{errors.eastLon.message}</span>
                )}
              </Field>
              <FieldDescription>Decimal degrees (-180 to 180)</FieldDescription>

              {/* North Latitude */}
              <Field className="relative">
                <FieldLabel className="font-bold" htmlFor="northLat">North Latitude</FieldLabel>
                <Input className="border-2 border-[#c3c0c0]" id="northLat" placeholder="37.8750" required {...register("northLat", { valueAsNumber: true })} />
                {errors.northLat && (
                  <span className="text-xs text-red-500 absolute left-0 -bottom-6">{errors.northLat.message}</span>
                )}
              </Field>
              <FieldDescription>Decimal degrees (-90 to 90)</FieldDescription>
            </FieldGroup>

            {/* Submit Button */}
            <div className="flex flex-col justify-center items-center">
              <Button type="submit" disabled={isPending} className="relative left-12 p-5 mt-6 w-[150%] bg-[#2563EB] text-white cursor-pointer hover:scale-105 duration-500 hover:bg-[#537de7]">
                <FeatherZap />{isPending ? "Predicting with XGBoost..." : "Execute ML Inference"}
              </Button>
              <span className="pl-24 pt-2 text-sm w-[120%]">Running on XGBoost</span>
            </div>
          </form>
        </div>
        {/* Hotspot Box */}
        <div className="flex flex-col ml-44">
          {/* Hotspot Map Card */}
          <Card className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-[295%] relative bottom-44">
            <div className="flex justify-between items-center pb-3 border-b max-h-full">
              <div className="flex items-center gap-2">
                <FeatherMapPin className="text-blue-500" />
                <h1 className="font-bold text-md text-gray-900">Interactive Hotspot Map</h1>
              </div>
              <Button className="bg-slate-100 text-slate-700 hover:bg-slate-200"><FeatherSatellite />Live FIRMS</Button>
            </div>

            {/* Leaflet Map Box Container */}
            <div id="map" className="overflow-hidden border-2 border-gray-100 bg-white rounded-lg h-60">
              <MapContainer className="" center={position} zoom={13}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>
                <Marker position={position} draggable={true}>
                  <Popup>
                    This is a draggable marker!
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </Card>
          {/* Result box */}
          <Card className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm w-[295%] relative">
            <Table>
              {/* Top Row (Header Names) */}
              <TableHeader>
                <TableRow className = "flex flex-row justify-between">
                  <TableCaption className="font-bold text-md">Analyzed Results</TableCaption>
                  <TableCaption> coordinates saved</TableCaption>
                </TableRow>
              </TableHeader>
              {/* Middle Row (Header Names) */}
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Latitude
                  </TableHead>
                  <TableHead>
                    Longitude
                  </TableHead>
                  <TableHead>
                    Risk Level
                  </TableHead>
                  <TableHead>
                    Confidence Breakdown
                  </TableHead>
                </TableRow>
                </TableHeader>
                {/* Metric Row */}
                  <TableBody>

                  </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Intelligence