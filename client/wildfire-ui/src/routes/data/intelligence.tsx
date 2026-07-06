
import { FeatherShieldCheck } from "@subframe/core"
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
const Intelligence = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();
  const {data: model} = useCreatePrediction();
  if (!user) {
    return (
      navigate("/")
    )
  }
  const coordinateValidation = z.object({
    westLon: z.number().min(-180, "Cannot exceed -180 degrees").max(180, "Cannot exceed 180 degrees"),
    southLat: z.number().min(-90, "Cannot exceed -90 degrees").max(90, "Cannot exceed 90 degrees"),
    eastLon: z.number().min(-90, "Cannot exceed -180 degrees").max(90, "Cannot exceed 180 degrees"),
    northLat: z.number().min(-90, "Cannot exceed -90 degrees").max(90, "Cannot exceed 90 degrees"),
  })

  type coordinateQuery = z.infer<typeof coordinateValidation>;

  const {register, handleSubmit, formState: { errors }, } = useForm<coordinateQuery>({
    resolver: zodResolver(coordinateValidation),
    defaultValues: {
      westLon: 0,
      southLat: 0,
      eastLon: 0,
      northLat: 0,
    },
  });

   const onSubmit = (data: coordinateQuery) => {
    model(data, {
      onSuccess: () => {
        navigate("/field/reports")
      }
    })
  }

  const capitalizeLetter = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  return (
    <div className="bg-white h-full w-screen overflow-hidden"> {/* Main Box */}
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
      <div className="p-15 border-2 border-gray-100 border-b-2">
        <h1 className="font-bold text-md">Geospatial Bounding Box</h1>
        <span className="text-[#a79f9f] text-sm">Define the target region for inference</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="westLon">
                West Longitude
              </FieldLabel>
              <Input id = "westLon" placeholder = "-122.6750" required{...register("westLon")}/>
              {errors.westLon && (
                <span className = "text-red-500 text-xs">{errors.westLon.message}</span>
              )}
            </Field>
            <FieldDescription>Decimal degrees (-180 to 180)</FieldDescription>

            <Field>
            <FieldLabel htmlFor = "southLat">South Latitude</FieldLabel>
            <Input id = "southLat" placeholder = "37.4500" required {...register("southLat")}/>
            {errors.southLat && (
              <span className = "text-xs text-red-500">{errors.southLat.message}</span>
            )}
            </Field>
            <FieldDescription>Decimal degrees (-90 to 90)</FieldDescription>

             <Field>
              <FieldLabel>East Longitude</FieldLabel>
              <Input id = "eastLon" placeholder = "-122.1500" required {...register("eastLon")}/>
              {errors.eastLon && (
                <span className = "text-xs text-red-500">{errors.eastLon.message}</span>
              )}
             </Field>
             <FieldDescription>Decimal degrees (-180 to 180)</FieldDescription>

             <Field>
              <FieldLabel>North Latitude</FieldLabel>
              <Input id = "northLat" placeholder = "37.8750" required {...register("northLat")}/>
             </Field>
             <FieldDescription>Decimal degrees (-90 to 90)</FieldDescription>

          </FieldGroup>
        </form>
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
