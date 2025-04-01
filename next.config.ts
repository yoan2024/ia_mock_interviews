import {NextConfig} from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Ignora ESLint durante el build
    },
    typescript: {
        ignoreBuildErrors: true, // Ignora errores de TypeScript durante el build
    },
};

export default nextConfig;
