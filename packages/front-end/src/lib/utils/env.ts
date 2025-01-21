import { z } from "zod"

const getEnvValues = () => import.meta.env

const envSchema = z.object({
	VITE_API_URL: z.string(),
})

export const getEnvValue = () => {}
