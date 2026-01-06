import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import './global.module.scss';

import Core from './pages/Core';
import {store} from './store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
    <Provider store={store}>
        <Router>
            <Core/>
        </Router>
    </Provider>
);

root.render(app);
