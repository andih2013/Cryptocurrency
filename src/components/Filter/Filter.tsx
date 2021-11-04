import React from 'react';
import { connect } from 'react-redux';
import { APPLY_NAME_FILTER } from '../../constants/actionTypes';
import { Coin } from '../../models/coin.model';
import './Filter.scss';

type Props = {
  allCoins?: Coin[];
  onFilterUpdate: (payload: any) => void;
};

const mapStateToProps = (state: any) => ({
  allCoins: state.coinList.allCoins,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFilterUpdate: (payload: any) => dispatch({ type: APPLY_NAME_FILTER, payload })
});

class Filter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.allCoins) {
      return;
    }
    const filterValue = e.target.value.toLowerCase();
    const filteredCoins = this.props.allCoins.filter(coin => coin.name.toLowerCase().includes(filterValue) || coin.symbol.toLowerCase().includes(filterValue));
    this.props.onFilterUpdate({coins: filteredCoins, coinsCount: filteredCoins.length});
  }

  render () {
    if (this.props.allCoins === undefined) {
      return null;
    }
    return (
      <div className="coin-filter">
        <input className="coin-filter__input" type="text" placeholder="Filter by name or symbol"
          onChange={this.onFilterChange} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
