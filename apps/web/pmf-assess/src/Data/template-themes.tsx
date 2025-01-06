interface Theme {
    id:string;
    template : string;
    files : {[key:string]:string};
    dependencies : {[key:string]:string}
}

export const TemplateThemes : Theme [] = [
  {
    id: 'react',
    template : "create-react-app",
    files:{
      '.gitignore': `
        # Logs
        logs
        *.log
        npm-debug.log*
        yarn-debug.log*
        yarn-error.log*
        pnpm-debug.log*
        lerna-debug.log*
        
        node_modules
        dist
        dist-ssr
        *.local
        
        # Editor directories and files
        .vscode/*
        !.vscode/extensions.json
        .idea
        .DS_Store
        *.suo
        *.ntvs*
        *.njsproj
        *.sln
        *.sw?
      `,
      'eslint.config.js': `
        import js from '@eslint/js'
        import globals from 'globals'
        import reactHooks from 'eslint-plugin-react-hooks'
        import reactRefresh from 'eslint-plugin-react-refresh'
        import tseslint from 'typescript-eslint'
    
        export default tseslint.config(
          { ignores: ['dist'] },
          {
            extends: [js.configs.recommended, ...tseslint.configs.recommended],
            files: ['**/*.{ts,tsx}'],
            languageOptions: {
              ecmaVersion: 2020,
              globals: globals.browser,
            },
            plugins: {
              'react-hooks': reactHooks,
              'react-refresh': reactRefresh,
            },
            rules: {
              ...reactHooks.configs.recommended.rules,
              'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
              ],
            },
          },
        )
      `,
      'index.html': `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React + TS</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `,
      'package.json': `{
        "name": "vite-project",
        "private": true,
        "version": "0.0.0",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "tsc -b && vite build",
          "lint": "eslint .",
          "preview": "vite preview",
          "test": "vitest"
        },
        "dependencies": {
          "react": "^18.3.1",
          "react-dom": "^18.3.1"
        },
        "devDependencies": {
          "@eslint/js": "^9.17.0",
          "@testing-library/jest-dom": "^6.6.3",
          "@testing-library/react": "^16.1.0",
          "@testing-library/user-event": "^14.5.2",
          "@types/react": "^18.3.18",
          "@types/react-dom": "^18.3.5",
          "@vitejs/plugin-react": "^4.3.4",
          "@vitejs/plugin-react-swc": "^3.5.0",
          "eslint": "^9.17.0",
          "eslint-plugin-react-hooks": "^5.0.0",
          "eslint-plugin-react-refresh": "^0.4.16",
          "globals": "^15.14.0",
          "jsdom": "^25.0.1",
          "typescript": "~5.6.2",
          "typescript-eslint": "^8.18.2",
          "vite": "^6.0.5",
          "vitest": "^2.1.8"
        }
      }`,
      'src/App.tsx': `
        import React, { useState } from 'react';
    
        function App() {
          const [count, setCount] = useState(0);
    
          return (
            <div>
              <h1>React Counter</h1>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
          );
        }
    
        export default App;
      `,
      'src/main.tsx': `
        import { StrictMode } from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './App.tsx';
    
        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <App />
          </StrictMode>
        );
      `,
      'src/vite-env.d.ts': `
        /// <reference types="vite/client" />
      `,
      'tsconfig.app.json': `{
        "compilerOptions": {
          "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
          "target": "ES2020",
          "useDefineForClassFields": true,
          "lib": ["ES2020", "DOM", "DOM.Iterable"],
          "module": "ESNext",
          "skipLibCheck": true,
          "moduleResolution": "bundler",
          "allowImportingTsExtensions": true,
          "isolatedModules": true,
          "moduleDetection": "force",
          "noEmit": true,
          "jsx": "react-jsx",
          "strict": true
        },
        "include": ["src"]
      }`,
      'vite.config.mts': `
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react-swc';
    
        export default defineConfig({
          plugins: [react()],
        });
      `,
      'vitest.config.mts': `
        import { defineConfig, mergeConfig } from 'vitest/config';
        import viteConfig from './vite.config.mts';
    
        export default mergeConfig(
          viteConfig,
          defineConfig({
            test: {
              environment: 'jsdom',
              globals: true,
              setupFiles: './src/setupTests.ts',
              reporters: ['json', 'default'],
              outputFile: './test-output.json',
            },
          })
        );
      `,
      'src/setupTests.ts' : `import '@testing-library/jest-dom';`,
       'src/App.test.tsx' : `
       import { expect } from 'vitest';
       import { render, screen, fireEvent } from '@testing-library/react';
       import App from './App';

       test('renders counter and increments', () => {
        render(<App />);
        const countElement = screen.getByText(/Count: 0/i);
        expect(countElement).toBeInTheDocument();

        const button = screen.getByText(/Increment/i);
        fireEvent.click(button);
        expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
      });

       `
    }
     ,
  dependencies: {
    'react': '^18.0.0',
    'react-dom': '^18.0.0',
    'vitest': '^0.22.1',
    '@testing-library/react': '^12.1.2',
  },    
  },
  {
    id: 'javascript',
    template : 'javascript',
    files: {
      'index.html': `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Static Counter</title>
  </head>
  <body>
    <h1>Static Counter</h1>
    <p id="count">Count: 0</p>
    <button id="increment">Increment</button>
    <script src="script.js"></script>
  </body>
  </html>
        `,
      'index.js': `
  let count = 0;
  const countElement = document.getElementById('count');
  const incrementButton = document.getElementById('increment');
  
  incrementButton.addEventListener('click', () => {
    count++;
    countElement.textContent = \`Count: \${count}\`;
  });
        `,
      'script.test.js': `
  import { expect, test } from 'vitest';
  import { JSDOM } from 'jsdom';
  
  test('increments counter on button click', () => {
    const dom = new JSDOM(\`
      <!DOCTYPE html>
      <html>
        <body>
          <p id="count">Count: 0</p>
          <button id="increment">Increment</button>
        </body>
      </html>
    \`);
  
    global.document = dom.window.document;
    global.window = dom.window;
  
    require('./script.js');
  
    const countElement = document.getElementById('count');
    const incrementButton = document.getElementById('increment');
  
    expect(countElement.textContent).toBe('Count: 0');
  
    incrementButton.click();
  
    expect(countElement.textContent).toBe('Count: 1');
  });
        `,
      'package.json': `{
  "name": "vite-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "~5.7.2",
    "vite": "^6.0.5"
  }
}`
    },
    dependencies: {
      'vitest': '^0.22.1',
      'jsdom': '^16.7.0',
    },
  },
  {
    id: 'node',
    template : "node",
    files: {
      'src/app.js': `
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });
  
  module.exports = app;
        `,
      'test/app.test.js': `
  const request = require('supertest');
  const app = require('../src/app');
  
  describe('GET /', () => {
    it('responds with json', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body).toEqual({ message: 'Hello, World!' });
    });
  });
        `,
      'package.json': `{
        "name": "node",
        "version": "1.0.0",
        "dependencies": {
          "express": "^4.17.1",
          "supertest": "^6.1.3",
          "jest": "^27.0.6"
        },
        "scripts": {
          "start": "node src/app.js",
          "test": "jest"
        }
      }`
    },
    dependencies: {
      'express': '^4.17.1',
      'supertest': '^6.1.3',
      'jest': '^27.0.6',
    },
  }];

