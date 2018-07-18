import React, { Component } from 'react';

export default class InputRow extends Component {

  render() {
    return (
      <form className='inputRow' onSubmit={this.props.handleClick}>
        <input className='searchbox' type='text' placeholder='Type word here' onChange={this.props.handleSearchTerm} value={this.props.value} />
        <button className='button' type='submit'>Go!</button>
      </form>
    )
  }
}
