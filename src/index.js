import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './reset.css';
import App from './App';

let root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Небольшое разъяснение по поводу TypeScript.
// Несмотря на то, что TypeScript был посвящён целый раздел обучения, настоящей практики по нему у нас не было. Изначально я планировал разрабатывать данный проект на JavaScript, затем постепенно перевести его на TypeScript. Это оказалось очень сложно и, к сожалению, у меня не хватило времени на реализацию этой задумки. По этой причине проект разработан на JavaScript.