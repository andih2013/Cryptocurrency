import React from 'react';
import { connect } from 'react-redux';
import { Coin } from '../../models/coin.model';
import { getPageSize, paginate } from '../../utilities/pagination';
import CoinModal from '../CoinModal/CoinModal';
import './CoinList.scss';

type Props = {
  coins?: Coin[];
  currentPage?: number;
};

const mapStateToProps = (state: any) => ({
  coins: state.coinList.coins,
  currentPage: state.coinList.currentPage,
});

class CoinList extends React.Component<Props> {
  private modalRef;

  constructor(props: Props) {
    super(props);
    this.modalRef = React.createRef<CoinModal>();
  }

  showCoinDetail(coinId: string) {
    this.setState({selectedCoinId: coinId});
    this.modalRef.current?.openModal(coinId);
  }

  render () {
    if (this.props.currentPage === undefined || !this.props?.coins) {
      return (<h2>Loading...</h2>);
    }
    const currentPage = this.props.currentPage;
    const pageSize = getPageSize();
    const displayList = paginate(this.props.coins, pageSize, currentPage) as Coin[];
    return (
      <>
        <CoinModal ref={this.modalRef}></CoinModal>
        <table className="coin-list">
          <thead className="coin-list__table-head">
            <tr className="coin-list__table-head-row">
              <th>Seq</th>
              <th>ID</th>
              <th>Name</th>
              <th>Symbol</th>
            </tr>
          </thead>
          <tbody className="coin-list__table-body">
            {displayList.map((coin, index) => {
              const seq = (currentPage - 1) * pageSize + index + 1;
              return (
                <tr key={seq} onClick={() => this.showCoinDetail(coin.id)} className="coin-list__coin-row">
                  <td className="coin-list__coin-seq">{seq}</td>
                  <td className="coin-list__coin-id">{coin.id}</td>
                  <td className="coin-list__coin-name">{coin.name}</td>
                  <td className="coin-list__coin-symbol">{coin.symbol}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default connect(mapStateToProps)(CoinList);
