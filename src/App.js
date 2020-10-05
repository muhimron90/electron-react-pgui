import React, { useState, useEffect } from 'react';

import Button from './components/Button';
import BoxMessage from './components/BoxMessage';
import gitcmd from '../internals/commands/startserver';
const App = () => {
 
  const [msg, setMsg] = useState(false);
  const [info, setInfo] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const changeMe = () => {
    setMsg((prev) => !prev);
  };
   const clear = () => {
     setInfo('');
   };

  const testgit = (status) => {
    gitcmd(status)
      .then((x) => {
        if (x.length === 0) {
          setInfo('try again');
        }
        setInfo(x);
      })
      .catch((err) => {
        setInfo(err);
      });
  }

  return (
    <>
      <div className="app--main">
        <h1>PostgreSQL Admin</h1>
      </div>
      <p>{msg ? 'Stop' : 'running'}</p>
      <Button onPress={() => testgit('restart')} title="restart" />
      <Button onPress={() => testgit('stop')} title="stop" />
      <Button onPress={() => testgit('start')} title="start" />
      <Button onPress={() => testgit('status')} title="Status" />

      <div className="content--text">
        <BoxMessage textInfo={info} />
      </div>
    </>
  );
};

export default App;
