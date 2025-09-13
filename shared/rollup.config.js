import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const entries = {
  index: 'src/index.ts',
  'animal-race-bets': 'src/animal-race-bets/index.ts',
  // add more games here as needed
};

export default [
  // JS build (ESM + CJS)
  {
    input: entries,
    output: [
      { dir: 'dist', format: 'esm', entryFileNames: '[name].js', sourcemap: true },
      { dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs', sourcemap: true }
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    external: [], // add external dependencies if needed
  },
  // Type declarations build (separate .d.ts per entry)
  ...Object.entries(entries).map(([name, input]) => ({
    input,
    output: {
      file: `dist/types/${name}.d.ts`
    },
    plugins: [dts()],
  }))
];