import type { DataPack } from "@/types/DataPack";

export const speed = 1;

export const datapack = (await import(
  "@/static-data/demoC.json"
)) as unknown as DataPack;
