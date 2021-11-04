import { APPLY_NAME_FILTER, LOAD_COINS, SET_ERROR, SET_PAGE } from '../constants/actionTypes';
import { CoinState } from '../models/coin.state.model';

export default (state: CoinState = {}, action: any) => {
  switch (action.type) {
    case LOAD_COINS:
      return {
        ...state,
        allCoins: action.payload.coins,
        coins: action.payload.coins,
        coinsCount: action.payload.coinsCount,
        currentPage: 1
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage
      };
    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload.hasError
      };
    case APPLY_NAME_FILTER:
      return {
        ...state,
        coins: action.payload.coins,
        coinsCount: action.payload.coinsCount,
        currentPage: 1
      };
    default:
      return state;
  }
};
