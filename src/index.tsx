// This file has to be left untouched

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { receiveDomains } from './redux/domains/actions';
import createStore from './redux/store';

const store = createStore();

store.dispatch(receiveDomains([
  'US_OK-WOK',
  'FR_NK-WOL',
  'FR_OK-NPP',
  'EN_NK-NRP',
  'EN_BL-WOL',
]))

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}><App /></Provider>
);
