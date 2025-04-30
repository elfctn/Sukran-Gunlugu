//export const myStore = {};//

import { legacy_createStore as createStore, applyMiddleware } from 'redux'; // createStore ve applyMiddleware'i import et
import { thunk } from 'redux-thunk'; // redux-thunk'ı import et
import reducer from './reducers'; // Default export edilen reducer'ı import et

// createStore ile Redux store'u oluştur ve thunk middleware'ini uygula
export const myStore = createStore(reducer, applyMiddleware(thunk));
