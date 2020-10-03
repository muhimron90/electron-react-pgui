import React, { useState, useEffect } from 'react';
import Open  from './scripts/openDir';
import Button from './components/Button';
import dataRaw from './datalog/infolog.json';
const App = () => {
 
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState(dataRaw.data);
  const changeMe = () => {
    setMsg((prev) => !prev);
  };
   const clear = () => {
     setInfo('');
   };


  return (
    <>
      <div className="app--main">
        <h1>PostgreSQL Admin</h1>
      </div>
      <p>{msg ? 'Stop' : 'running'}</p>
      <Button onPress={() => changeMe()} title="Restart" />
      <Button onPress={() => Open()} title="open" />
      <Button onPress={() => clear()} title="clear" />

      <div className="content--text">
        <textarea className="text--area" value={info} readOnly />
      </div>
    </>
  );
};

export default App;
