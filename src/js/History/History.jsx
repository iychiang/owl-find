import React, { Component } from 'react';

export default class History extends Component {

  render() {
    return (
      <div className='history'>
        <div className='pastwords'>
          {this.props.history.map(word => <li key={JSON.stringify(word)}>{word}</li>)}
        </div>
      </div>
    );
  }
}
