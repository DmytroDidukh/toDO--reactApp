import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import App from './App';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './index.scss';

library.add(fas);


ReactDOM.render(
  <React.StrictMode>
      <Router><App/></Router>
  </React.StrictMode>,
  document.getElementById('root')
);

export {library};
