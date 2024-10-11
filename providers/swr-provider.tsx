"use client";
import SWR_CONFIG from "@/configs/swr";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: ReactNode;
};
export default function SWRProvider({ children }: Props) {
  return <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>;
}
