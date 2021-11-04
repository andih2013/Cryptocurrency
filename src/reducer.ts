import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import coinList from './reducers/coin.reducer';

export default combineReducers({
  coinList,
  router: routerReducer
});
