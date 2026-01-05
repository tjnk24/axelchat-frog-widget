import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import './global.module.scss';

import {RootView} from './app/RootView';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <RootView/>
    </Router>,
);
