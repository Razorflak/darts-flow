import { defineConfig } from "vite"
import { resolve } from "node:path"

export default defineConfig({
	root: "./src",
	appType: "mpa",
	build: {
		rollupOptions: {
			input: {
				main: "index.html",
				toto: "toto.html",
				nested: resolve(__dirname, "nested/index.html"),
			},
		},
	},
})
