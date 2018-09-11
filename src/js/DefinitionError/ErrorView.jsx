import React, { Component } from 'react';

export default class ErrorView extends Component {

  render() {
    return (
      <div className='spellchecker'>
        Word not found! Maybe you meant <span className='correctlySpelledWord'>{this.props.spellcheck}</span>?
      </div>
    );
  }
}
