import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { API } from "../ui/lib/api";
import type { ModelInfo } from "../types/model/model-types";


interface ModelResponse {
    id: string;
    latitude: number;
    longitude: number;
    confidence: string;
}

export const useCreatePrediction = () => {
    return useMutation({
        mutationFn: async (coordinateData: ModelInfo) => {
            const { data } = await API.post('/v1/intelligence/predict', coordinateData);
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

export const useGetPrediction = () => {
    return useQuery<ModelResponse>({
        queryKey: ['model', 'prediction'],
        queryFn: async () => {
            try {
                const { data } = await API.get("/v1/intelligence/get_predictions")
                return data;
            } catch (e: any) {
                console.log(`Error message from backend:${e.response?.data} and status:${e.response?.status}`)
                throw new Error(e.response?.data?.message || "Unexpected error message")
            }
        }
    })
}