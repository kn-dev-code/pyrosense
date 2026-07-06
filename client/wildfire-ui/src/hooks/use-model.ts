import {useMutation} from "@tanstack/react-query"
import {toast} from "sonner";
import { API } from "../ui/lib/api";
import type { ModelInfo } from "../types/model/model-types";




export const useCreatePrediction = () => {
return useMutation({
    mutationFn: async (coordinateData: ModelInfo) => {
        const {data} = await API.post('/v1/intelligence/predict', coordinateData); 
        return data; 
    },
    onSuccess: () => {
        toast.success("Model prediction successful!")
    },
    onError: (e: any) => {
        toast.error(`API ERROR: ${e.detail.message}`)
    }
})
}

export const useDeletePredictions = () => {

}

export const useDeletePrediction = (id: string) => {

}