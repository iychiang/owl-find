import React, { Component } from 'react';

export default class OwlFind extends Component {

  render() {
    return (
        <div className='imgContainer'>
          <img src='OwlFindDay.png' />
          <div className='overlay'>
          <img src='OwlFindNight.png'/>
          </div>
        </div>
    );
  }
}