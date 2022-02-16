
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'lib/emma.ts',
    output: {
        file: 'dist/emma.js',
        // dir : 'dist',
        format: 'cjs',
    },
    souremap: true,
    plugins: [typescript()],
};