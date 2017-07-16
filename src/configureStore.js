import { AsyncStorage } from 'react-native';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';

import rootSaga from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(logger, sagaMiddleware), autoRehydrate());

  const store = createStore(reducers, initialState, enhancer);

  sagaMiddleware.run(rootSaga);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['sound', 'view', 'record'],
  });

  return store;
}
