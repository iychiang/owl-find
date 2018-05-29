import React, { Component } from 'react';

export default class History extends Component {

  render() {
    return (
        <div className='history'>
          <span className='pastwords'>Past words: </span> {this.props.history.map(word => <li key={JSON.stringify(word)}>{word}</li>)}
        </div>
    );
  }
}