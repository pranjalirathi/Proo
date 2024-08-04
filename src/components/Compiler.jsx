import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (language === 'python') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/brython@3.9.5/brython.min.js';
      script.async = true;
      script.onload = () => {
        window.brython();
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [language]);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const runJavaScriptCode = () => {
    try {
      let consoleOutput = '';
      const originalConsoleLog = console.log;

      console.log = (...args) => {
        consoleOutput += args.join(' ') + '\n';
        originalConsoleLog(...args);
      };

      // eslint-disable-next-line no-eval
      const result = eval(code);
      if (result !== undefined) {
        consoleOutput += result;
      }

      setOutput(consoleOutput);
      console.log = originalConsoleLog;
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const runPythonCode = () => {
    try {
      const consoleOutput = [];
      window.console = {
        log: (msg) => consoleOutput.push(msg),
      };

      const script = document.createElement('script');
      script.type = 'text/python';
      script.innerHTML = `
from browser import console
${code}`;
      document.body.appendChild(script);
      window.brython();
      setOutput(consoleOutput.join('\n'));
      script.remove();
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const handleRunCode = () => {
    setOutput('');
    if (language === 'javascript') {
      runJavaScriptCode();
    } else if (language === 'python') {
      runPythonCode();
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      default:
        return javascript();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button
          onClick={handleRunCode}
          className="p-2 bg-blue-500 text-black rounded ml-4"
        >
          Run
        </button>
      </div>
      <div className="flex flex-1">
        <div className="w-1/2 p-2">
          <CodeMirror
            value={code}
            extensions={[getLanguageExtension()]}
            onChange={handleCodeChange}
            className="h-full border border-gray-300 rounded text-black"
          />
        </div>
        <div className="w-1/2 p-2 border-l border-gray-300">
          <h3 className="font-bold mb-2">Output:</h3>
          <pre className="h-full bg-gray-100 p-2 border text-black border-gray-300 rounded overflow-auto">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
