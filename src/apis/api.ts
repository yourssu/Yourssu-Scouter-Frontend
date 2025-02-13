import { API_CONFIG } from "@/constants/config";
import ky from "ky";

export const api = ky.create({
  prefixUrl: API_CONFIG.BASE_URL,
});
