import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { sound } from './sagas'
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      sagaMiddleware
    ),
  );

  sagaMiddleware.run(sound);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}
