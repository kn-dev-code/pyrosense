import { API } from "../ui/lib/api"


export const googleLoginAuth = async(credentials: string) => {
  try {
    const response = await API.post("/api/auth/google", {
    credentials: credentials
  })
  return response.data;
  } catch(e) {
    console.error(`API ERROR: ${e}`)
  }
}

