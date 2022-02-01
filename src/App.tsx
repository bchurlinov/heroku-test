import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = (): JSX.Element => {
  const [token, setToken] = useState<string>('');

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('https://www.racedirectorshq.com/api/auth/login/', {
        email: 'bchurlinov@gmail.com',
        password: 'Sauron1985$',
      });
      console.log('TOKEN >>', data);
      setToken(data.key);
    } catch (error:any) {
      console.log(error.response as any);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get('https://www.racedirectorshq.com/api/auth/user/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log({ data });
    } catch (error:any) {
      console.log(error.response);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          This is an App in Production Mode with New Buildpack
        </h1>
        <button type="button" onClick={() => handleLogin()}>LOGIN USER</button>
        <br />
        <button type="button" onClick={() => getUser()}>GET USER DATA</button>
      </header>
    </div>
  );
};

export default App;
