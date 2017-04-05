import React from 'react';

const AUTH_URL = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=515caae1b2fc408db489a097d3484929';

const Login = () => (
  <div className="login jumbotron">
    <h1>Hello, please login!</h1>
    <p><a href={AUTH_URL} className="btn btn-info btn-lg" role="button">Login</a></p>
  </div>
);

export default Login;