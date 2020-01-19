// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';

// Imports: Redux Sagas
import { setAccessToken } from './coreSaga';

// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(setAccessToken)
  ]);
};
