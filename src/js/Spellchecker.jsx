import React, { Component } from 'react';

export default class Spellchecker extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='spellchecker'>
        Word not found! Maybe you meant <span className='correctlySpelledWord'>{this.props.spelling}</span>?
      </div>
    )
  }
}