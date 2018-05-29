import React, { Component } from 'react';
import History from './TopRowComponents/History';
import OwlFind from './TopRowComponents/OwlFind';

export default class TopRow extends Component {

  render() {
    return (
      <div className='toprow'>
        <History history={this.props.history}/>
        <OwlFind />
        <div className='emptydiv'>
        </div>
      </div>
    );
  }
}