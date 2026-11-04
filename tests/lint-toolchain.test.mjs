import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { ESLint } from 'eslint';

const cwd = fileURLToPath(new URL('../', import.meta.url));

test('lint still checks JavaScript, JSX hooks, refresh exports, and output ignores', async () => {
  const eslint = new ESLint({ cwd });
  const [js] = await eslint.lintText('const unusedValue = 1;', { filePath: 'src/lint-probe.js' });
  assert.ok(js.messages.some(({ ruleId }) => ruleId === 'no-unused-vars'));

  const [jsx] = await eslint.lintText(`
    import { useEffect } from 'react';
    export function loadSettings() { return {}; }
    export default function Example({ ready }) {
      useEffect(() => { console.log(ready); }, []);
      if (ready) useEffect(() => {}, []);
      return <main />;
    }
  `, { filePath: 'src/lint-probe.jsx' });
  assert.ok(jsx.messages.some(({ ruleId }) => ruleId === 'react-hooks/rules-of-hooks'));
  assert.ok(jsx.messages.some(({ ruleId }) => ruleId === 'react-hooks/exhaustive-deps'));
  assert.ok(jsx.messages.some(({ ruleId }) => ruleId === 'react-refresh/only-export-components'));
  assert.equal(await eslint.isPathIgnored('dist/lint-probe.jsx'), true);
});
