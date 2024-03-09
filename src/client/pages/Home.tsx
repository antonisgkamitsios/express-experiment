import axios from 'axios';
import { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';

interface LoginInputs extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  rememberMe: HTMLInputElement;
  passwordRepeat: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
  readonly elements: LoginInputs;
}
export function Home() {
  const handleLoginSubmit = (e: FormEvent<LoginForm>) => {
    e.preventDefault();
    const data = {
      username: e.currentTarget.elements.username.value,
      password: e.currentTarget.elements.password.value,
      rememberMe: e.currentTarget.elements.rememberMe.checked,
    };
    axios.post('/auth/login/', data);
  };
  const handleRegisterSubmit = (e: FormEvent<LoginForm>) => {
    e.preventDefault();
    const data = {
      username: e.currentTarget.elements.username.value,
      password: e.currentTarget.elements.password.value,
      passwordRepeat: e.currentTarget.elements.passwordRepeat.value,
    };
    axios.post('/auth/register/', data);
  };
  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    axios.post('/auth/logout');
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      This is home
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" name="username"></input>
        <input type="password" name="password" id="" />
        <input type="password" name="passwordRepeat" id="" />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <form onSubmit={handleLoginSubmit}>
        <input type="text" name="username"></input>
        <input type="password" name="password" />
        <input type="checkbox" name="rememberMe" />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </>
  );
}
