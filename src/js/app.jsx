import React, { Component } from 'react';
import Header from './TopRow/Header.jsx';
import TopRow from './TopRow/TopRow.jsx';
import InputRow from './MiddleRow/InputRow.jsx';

import DefinitionView from './BottomRow/DefinitionView.jsx';
import ErrorView from './BottomRow/ErrorView.jsx';

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
  }

  componentWillMount() {
    //goes once page loaded? if wanted to let user type /definition AND get definition on click, then probably
    //will have in two different places... one in componentDidMount and one under the click function
    //ask Anthony about react router after done
  }

  handleClick(e) {
    if (this.state.word == this.state.history[this.state.history.length - 1]) {
      return;
    }

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
          });
          console.log(object);
        } else {
          object.word = this.state.word;
          console.log(object);
          
          this.setState({
            id: this.state.id + 1,
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
      console.log('error');
      return (
        <div>
          <Header />
          <TopRow history={this.state.history}/>
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
          <TopRow history={this.state.history}/>
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
