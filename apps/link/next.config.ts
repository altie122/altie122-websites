import "@altie122/env/web";
import type { NextConfig } from "next";
import {getLocalIps} from "@altie122/utils";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  allowedDevOrigins: [...getLocalIps()],
};

export default nextConfig;
