import React, { Component } from 'react';

export default class InputRow extends Component {

  render() {
    return (
      <div className='inputRow'>
        <input className='searchbox' type='text' placeholder='Type word here' onChange={this.props.handleSearchTerm} value={this.props.value} />
        <button className='button' type='submit' onClick={this.props.handleClick}>Go!</button>
      </div>
    )
  }
}
