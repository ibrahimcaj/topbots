import React from 'react';
import ReactDOM from 'react-dom';

import Page from './components/Page';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Page />
        <p className="creditsText">
            Made by <a href="https://discord.com/users/267025484028706816">Vanished</a>&nbsp;
            (<a href="https://github.com/vanishedvan" target="_blank" rel="noreferrer">GitHub</a>,&nbsp;<a href="https://github.com/vanishedvan/topbots" target="_blank" rel="noreferrer">Repository</a>)
            <br />
            Most of data provided by <a href="https://discord.com/users/190916650143318016">advaith</a>&nbsp;
            (<a href="https://github.com/advaith1" target="_blank" rel="noreferrer">GitHub</a>,&nbsp;<a href="https://gist.github.com/advaith1/451dcbca2d7c3503d4f48d63eb918cb0" target="_blank" rel="noreferrer">Gist</a>)
            <br />
        </p>
    </React.StrictMode>,
    document.getElementById('root')
);
