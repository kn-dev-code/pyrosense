import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { API } from "../ui/lib/api";
import type { ModelInfo } from "../types/model/model-types";


interface QueryModelResponse {
    latitude: number;
    longitude: number;
    riskLevel: string;
    confidence: string;
}

export const useCreatePrediction = () => {
    return useMutation({
        mutationFn: async (coordinateData: ModelInfo) => {
            const { data } = await API.post('/v1/intelligence/create_prediction', coordinateData);
            return data.predictions.preds;
        },
        onSuccess: () => {
            toast.success("Model prediction successful!")
        },
        onError: (e: any) => {
            const apiError = e.response?.data?.detail?.[0]?.msg || e.response?.data?.detail || e.message || "Unknown error";
            toast.error(`API ERROR: ${apiError}`)
        }
    })
}

export const useGetPrediction = () => {
    return useQuery<QueryModelResponse>({
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