import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data === "Login Successfully") {
          onLoginSuccess();
        } else {
          setError('Invalid email or password');
        }
      })
      .catch(err => {
        console.log(err);
        setError('An error occurred. Please try again.');
      });
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='p-3 bg-white w-25'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' className='form-control'
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' className='form-control'
              onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className='btn btn-success'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;