import React from 'react';
import ReactDOM from 'react-dom/client';
import Preferences from './Preferences';

const root = ReactDOM.createRoot(
  document.getElementById('preferences_container') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Preferences />
  </React.StrictMode>
);

