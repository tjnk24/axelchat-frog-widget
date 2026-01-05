import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import './global.module.scss';

import Core from './pages/Core';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Core/>
    </Router>,
);
