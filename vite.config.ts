import react from '@vitejs/plugin-react';
import * as fs from 'fs';
// @ts-ignore
import lessToJS from 'less-vars-to-js';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./src/styles/variables.less'), 'utf8')
);

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
      libs: [
        {
          libraryName: 'antd',
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
});
