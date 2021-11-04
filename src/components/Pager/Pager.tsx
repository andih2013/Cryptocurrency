import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { SET_PAGE } from '../../constants/actionTypes';
import { getPageSize, getPagination } from '../../utilities/pagination';
import './Pager.scss';

type Props = {
  coinsCount?: number;
  currentPage?: number;
  onPageUpdate: (payload: any) => void;
};

const mapStateToProps = (state: any) => ({
  coinsCount: state.coinList.coinsCount,
  currentPage: state.coinList.currentPage,
});

const mapDispatchToProps = (dispatch: any) => ({
  onPageUpdate: (payload: any) => dispatch({ type: SET_PAGE, payload })
});

class Pager extends React.Component<Props> {

  onPageClicked(pageNumber: number | string) {
    if (isNaN(parseInt(pageNumber.toString()))) {
      return;
    }
    this.props.onPageUpdate({currentPage: pageNumber});
  }

  render () {
    if (this.props.coinsCount === undefined || this.props.currentPage === undefined) {
      return null;
    }
    const {coinsCount, currentPage} = this.props;
    const pageSize = getPageSize();
    const paginationRange = getPagination(coinsCount, pageSize, currentPage);
    if (!paginationRange) {
      return null;
    }
    const lastPage = paginationRange[paginationRange.length - 1];
    
    return (
      <div className="pagination__wrapper">
        <ul className={classnames('pagination__container')}>
          <li
            key="previous"
            className={classnames('pagination__item', {
              disabled: currentPage === 1
            })}
            onClick={() => {this.onPageClicked(currentPage - 1)}}
          >
            <div className="arrow left" />
          </li>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === '...') {
              return <li key={`..._${index}`} className="pagination__item dots">&#8230;</li>;
            }
            return (
              <li
                key={pageNumber}
                className={classnames('pagination__item', {
                  selected: pageNumber === currentPage
                })}
                onClick={() => {this.onPageClicked(pageNumber)}}
              >
                {pageNumber}
              </li>
            );
          })}
          <li
            key="next"
            className={classnames('pagination__item', {
              disabled: currentPage === lastPage
            })}
            onClick={() => {this.onPageClicked(currentPage + 1)}}
          >
            <div className="arrow right" />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
