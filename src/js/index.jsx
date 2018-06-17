import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Link } from 'react-router-dom'


render(<BrowserRouter>
            <Route path='/' component={App}/>
        </BrowserRouter>, document.getElementById('root'));
