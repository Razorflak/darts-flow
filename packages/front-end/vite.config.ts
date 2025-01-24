import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "./src",
  appType: "mpa",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        toto: "toto.html",
        nested: resolve(__dirname, "nested/index.html"),
      },
    },
  },
});
