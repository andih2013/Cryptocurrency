import React from 'react';
import Modal from 'react-modal';
import { CoinDetails } from '../../models/coinDetails.model';
import { coinsService } from '../../services/coins.service';
import { formatCurrency } from '../../utilities/currency';
import './CoinModal.scss';

type Props = {
};

type State = {
  modalIsOpen: boolean;
  coinDetails: CoinDetails | null;
  hasError: boolean;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '80%',
    right: 'auto',
    bottom: 'auto',
    padding: '3rem',
    maxWidth: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 2rem)',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class CoinModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      coinDetails: null,
      hasError: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(coinId: string) {
    if (!coinId) {
      return;
    }
    this.setState({modalIsOpen: true});

    coinsService.getCoinDetails(coinId).then(response => {
      this.setState({coinDetails: response});
    }).catch((e) => {
      this.setState({hasError: true});
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false, coinDetails: null, hasError: false});
  }

  render() {
    const {modalIsOpen, coinDetails, hasError} = this.state;
    return (
      <div className="coin-modal">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="coin-modal__close" onClick={this.closeModal}>x</button>
          {hasError && <h2>Oops, something went wrong.</h2>}
          {!hasError && coinDetails &&
            <>
              <img className="coin-modal__coin-image" src={coinDetails.imageUrl} />
              <table>
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{coinDetails.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{coinDetails.name}</td>
                  </tr>
                  <tr>
                    <td>Symbol</td>
                    <td>{coinDetails.symbol}</td>
                  </tr>
                  <tr>
                    <td>Current Price</td>
                    <td>{formatCurrency(coinDetails.currentPrice)}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{coinDetails.description}</td>
                  </tr>
                </tbody>
              </table>
            </>
          }
          {!hasError && !coinDetails && <h2>Loading...</h2>}
        </Modal>
      </div>
    );
  }
}

export default CoinModal;
