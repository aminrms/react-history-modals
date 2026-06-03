import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

import { readFileSync } from 'node:fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default [
  {
    input: 'src/index.ts', // match your real entry file (index.ts or index.tsx)
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        banner: "'use client';", // inject directive into CJS output
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        banner: "'use client';", // inject directive into ESM output
      },
    ],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          directives: false, // <-- critical: stop terser stripping "use client"
        },
        mangle: {
          toplevel: true,
        },
        output: {
          comments: false,
        },
      }),
    ],
    external: ['react', 'react-dom'],
    // silence the harmless "use client was ignored" warning from source files
    onwarn(warning, warn) {
      if (
        warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
        warning.message.includes('use client')
      ) {
        return;
      }
      warn(warning);
    },
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
];
