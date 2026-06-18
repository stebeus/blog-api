import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
        babel({ presets: [reactCompilerPreset()] }),
        react(),
        tailwindcss(),
        cloudflare()
    ],
	preview: {
		port: 8080,
	},
	server: {
		port: 4000,
	},
});