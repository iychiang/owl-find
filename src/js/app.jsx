import React, { Component } from 'react';
import Spellchecker from './Spellchecker.jsx';
import Definition from './Definition.jsx';

export default class Hello extends Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [],
      word: 'owl',
      wordObject: null,
      error: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
  }

  componentWillMount() {
    //goes once page loaded? if wanted to let user type /definition AND get definition on click, then probably
    //will have in two different places... one in componentDidMount and one under the click function
    //ask Anthony about react router after done
  }

  handleClick(e) {

    fetch(`/search/${this.state.word}`)
      .then(response => {
        return response.json();
      })
      //every time there's a return statement in a .then, the next .then will implicitly send that value to the next .then (and you can name it whatever you want)
      .then((object) => {
        //error occurs if word is not found
        if (object.wordAPI.length == 0) {
          this.setState({
            error: this.state.word,
            wordObject: object
          })
        } else {
          object.word = this.state.word;
          // console.log(object);

          this.setState({
            word: this.state.word,
            wordObject: object,
            error: false
          });
          console.log(this.state.wordObject);
          let newEntry = [...this.state.history, this.state.word];

          this.setState({
            history: newEntry
          });
        }
      })
      .catch(console.error);
  }

  handleSearchTerm(e) {
    this.setState({ word: e.target.value });
  }
  //the ERROR objects are not valid as a react child appears because page is looking for a
  //specific value and can't display full arrays or objects. If you targeted a specific property
  //it can return a value

  render() {
    if (this.state.error) {
      return (
        <div className='container'>
          <h2>What word are you looking for?</h2>
          <div className='toprow'>
            <div className='history'>
              <span className='pastwords'>Past words: </span> {this.state.history.map(word => <li>{word}</li>)}
            </div>
            <div className='img'>
              <img src='OwlFind.png' />
            </div>
          </div>
          <div className='inputRow'>
            <input className='searchbox' type='text' placeholder='Type word here' onChange={this.handleSearchTerm} value={this.state.word} />
            <button className='button' type='submit' onClick={this.handleClick}>Go!</button>
          </div>
          <div className='row text'>
            <div className='word'>
              <Spellchecker spelling={this.state.wordObject.spellingAPI[0].word} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container'>
          <h2>What word are you looking for?</h2>
          <div>
            <div className='toprow'>
              <div className='history'>
                <span className='pastwords'>Past words: </span> {this.state.history.map(word => <li key={word}>{word}</li>)}
              </div>
              <div className='img'>
                <img src='OwlFind.png' />
              </div>
            </div>
          </div>
          <div className='inputRow'>
            <input className='searchbox' type='text' placeholder='Type word here' onChange={this.handleSearchTerm} value={this.state.word} />
            <button className='button' type='submit' onClick={this.handleClick}>Go!</button>
          </div>
          <div className='row text'>
            <div className='word'>
              {this.state.history[this.state.history.length - 1]}
            </div>
            <Definition definition={this.state.wordObject && this.state.wordObject.wordAPI[0] && this.state.wordObject.wordAPI[0].definition}
              type={this.state.wordObject && this.state.wordObject.wordAPI[0] && this.state.wordObject.wordAPI[0].type}
              example={this.state.wordObject && this.state.wordObject.wordAPI[0] && this.state.wordObject.wordAPI[0].example} />
          </div>
        </div>
      );
    }
  }
}
