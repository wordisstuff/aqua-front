import App from './components/App/App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ModalProvider } from './context/Context.jsx';
import { TourProvider } from '@reactour/tour';
import 'modern-normalize';
import tourSteps from './services/tourSteps.js';
import tourStyles from './utils/style/tourStyles.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                    <HelmetProvider>
                        <ModalProvider>
                            <TourProvider steps={tourSteps} styles={tourStyles}>
                                <App />
                            </TourProvider>
                        </ModalProvider>
                    </HelmetProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>,
);
