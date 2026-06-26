import { background } from "@/styles/colors"

// A háttér kizárólag a napszaktól függ: nappal világoskék, éjszaka sötét.
export const getBackground = isDay =>
  isDay ? background.day : background.night
