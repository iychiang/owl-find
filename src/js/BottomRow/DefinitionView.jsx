import React, { Component } from 'react';
import Definition from './Definition.jsx';

export default class ErrorView extends Component {

  render() {
      return (
        <div className='rowOfText'>
          <div className='word'>
            {this.props.history[this.props.history.length - 1]}
          </div>
          <Definition
            type={this.props.wordObject.wordAPI[0].type}
            definition={this.props.wordObject.wordAPI[0].definition}
            example={this.props.wordObject.wordAPI[0].example} />
        </div>
      );
    }
  }