import { preprocess } from "@etcher/plugin-preprocess";
import { defineConfig } from "@etcher/core";

export default defineConfig({
    plugins: [preprocess()],
});
