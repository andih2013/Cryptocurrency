import React from 'react';
import { connect } from 'react-redux';
import Pager from './components/Pager/Pager';
import Filter from './components/Filter/Filter';
import CoinList from './components/CoinList/CoinList';
import { Coin } from './models/coin.model';
import { coinsService } from './services/coins.service';
import { LOAD_COINS, SET_ERROR } from './constants/actionTypes';
import { store } from './store';
import './App.scss';
import ErrorBoundary from './components/Error/ErrorBoundary';

type Props = {
  coins?: Coin[];
  currentPage?: number;
  onLoad: (payload: any) => void;
  setHasError: (payload: any) => void;
};

const mapStateToProps = (state: any) => ({
  coins: state.coinList.coins,
  currentPage: state.coinList.currentPage,
});

const mapDispatchToProps = (dispatch: any) => ({
  onLoad: (payload: any) => dispatch({ type: LOAD_COINS, payload }),
  setHasError: (payload: any) => dispatch({ type: SET_ERROR, payload })
});

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillMount() {
    coinsService.getCoinsList().then(response => {
      this.props.onLoad({allCoins: response, coins: response, coinsCount: response.length});
    }).catch((e) => {
      this.props.setHasError({hasError: true});
    });
  }

  render() {
    return (
      <div className="coin-app">
        <ErrorBoundary>
          <Filter></Filter>
          <Pager></Pager>
          <CoinList></CoinList>
          <Pager></Pager>
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
