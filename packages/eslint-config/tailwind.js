import base from './base.js';
// 사용자가 설치했을 때만 동작하도록 동적 import (선택)
let tailwindPlugin;
try {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  tailwindPlugin = (await import('eslint-plugin-better-tailwindcss')).default;
} catch {
  tailwindPlugin = null;
}

/** @type {import('eslint').Linter.FlatConfig[]} */
const tailwindConfig = [
  ...base,
  ...(tailwindPlugin
    ? [
        {
          name: 'tailwind',
          plugins: { 'better-tailwindcss': tailwindPlugin },
          rules: {
            'better-tailwindcss/no-contradicting-classname': 'warn',
            'better-tailwindcss/no-duplicate-classname': 'warn',
          },
        },
      ]
    : []),
];

export default tailwindConfig;
