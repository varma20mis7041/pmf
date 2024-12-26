import { useEffect } from "react";

import sdk from "@stackblitz/sdk";


const App = () => {
  useEffect(() => {
    const project = {
      files : {
        'index.html':'<div id="root"></div>',
        'index.js':`
          import React from 'react';
          import ReactDom from 'react-dom';
          import App from './App';
          ReactDom.render(<App />, document.getElementById('root'));
        `,
        'App.js':`
        import React from 'react';
          const App = () => {
          return <h1>Hello World</h1>;
        }
          export default App;
        `,
        'package.json': JSON.stringify({
          dependencies: {
            react: '^17.0.2',
            'react-dom': '^17.0.2',
          },
        }),
      },
      title: 'Assignment Evaluator',
      description: 'A simple react app to evaluate assignments',
      template: 'create-react-app',
    }
    sdk.embedProject("embed-container", project);
  }, []);

  const onClickSave = async () => {
    const iframe: any = document.getElementById('embed-container');
    const vm = await sdk.connect(iframe);
    const files = await vm.getFsSnapshot();
    console.log(JSON.stringify(files));
    await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files
      })
    })
  }



  return (
    <div>
      <h1 className="text-3xl text-center">Hello Welcome to the Assignment</h1>
      <div 
          id="embed-container"
          style={{
            width: '100%',
            height: '600px',
          }}>
          </div>
          <div className="flex justify-center p-4">
          <button onClick={onClickSave} className="bg-green-700 px-4 py-1 rounded">Save</button>
          </div>
    </div>
  )
}

export default App;