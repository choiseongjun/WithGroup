import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';

// Increase Counter Async
function* setUserToken(data) {
  try {
    // Delay 4 Seconds
    yield delay(4000);
  
    // Dispatch Action To Redux Store
    yield put({ 
      type: 'SET_ACCESS_TOKEN',
      token: data,
    });
  }
  catch (error) {
    // CHANGE LATER
    console.log(error);
  }
}

// Generator: Watch Increase Counter
export function* setAccessToken() {
  // // Take Every Action
  // yield takeEvery('INCREASE_COUNTER', increaseCounterAsync);

  // Take Last Action
  yield takeLatest('SET_TOKEN', setUserToken);
}