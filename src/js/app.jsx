import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Header from './Header/Header';
import History from './History/History';
import InputRow from './Input/InputRow';
import DefinitionView from './DefinitionError/DefinitionView';
import ErrorView from './DefinitionError/ErrorView';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      history: [],
      word: 'owl',
      wordObject: null,
      error: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentWillMount() {
    const path = this.props.location.pathname
      // if the path is not / but like /owl
    if(path !== '/') {
      // extract the word by getting rid of the /
      const word = path.replace('/', '');
      this.getResults(word);
    }
  }

  getResults(word = this.state.word) {
    fetch(`/search/${word}`)
      .then(response => {
        return response.json();
      })
      //every time there's a return statement in a .then, the next .then will implicitly send the value to the next .then
      .then((object) => {
        if (object.wordAPI.length == 0) {
          this.setState({
            error: word,
            wordObject: object
          });
        } else {
          object.word = word;
          
          this.setState({
            id: this.state.id + 1,
            word: word,
            wordObject: object,
            error: false
          });
          let newEntry = [...this.state.history, word];

          this.setState({
            history: newEntry
          });
        }
      })
      .catch(console.error);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.word == this.state.history[this.state.history.length - 1]) {
      return;
    }

    this.getResults();
  }

  handleSearchTerm(e) {
    this.setState({ word: e.target.value });
  }

  render() {
    if (this.state.error) {
      console.log('error');
      return (
        <div>
          <Header />
          <History history={this.state.history}/>
          <InputRow handleSearchTerm={this.handleSearchTerm}
                  value={this.state.word}
                  handleClick={this.handleClick}/>
          <ErrorView spellcheck={this.state.wordObject.spellingAPI[0].word == this.state.word 
          ? 
          this.state.wordObject.spellingAPI[1].word
          :
          this.state.wordObject.spellingAPI[0].word}/>
        </div>
      );
    } else {
      console.log('no error');
      return (
        <div>
          <Header />
          <History history={this.state.history}/>
          <InputRow handleSearchTerm={this.handleSearchTerm}
                  value={this.state.word}
                  handleClick={this.handleClick}/>
          {this.state.wordObject && this.state.wordObject.wordAPI[0] 
          ? 
          <DefinitionView wordObject={this.state.wordObject}
                          history={this.state.history}/>
          : ''}                
        </div>
      );
    }
  }
}
