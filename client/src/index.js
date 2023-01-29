import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';

// NEW !! React 18.x
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
);


// OLD!!! REACT 17
// ReactDOM.render(

//     <CookiesProvider>
//         <App />
//     </CookiesProvider>,

//     document.getElementById('root')

// );

