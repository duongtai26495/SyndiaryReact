import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AddDiary, DiaryDetails, Home, Profile } from './screens';
import { StoreProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
          <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/add' element={<AddDiary/>} />
            <Route path='/diary/:id' element={<DiaryDetails/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
);