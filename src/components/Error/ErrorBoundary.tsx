import React from 'react';
import { connect } from 'react-redux';

type Props = {
  children: React.ReactNode;
  hasError?: boolean;
};

const mapStateToProps = (state: any) => ({
  hasError: state.coinList.hasError,
});

class ErrorBoundary extends React.Component<Props> {
  render() {
    if (this.props.hasError) {
      return <h1>Oops, something went wrong.</h1>;
    }
    return this.props.children; 
  }
}

export default connect(mapStateToProps)(ErrorBoundary);
