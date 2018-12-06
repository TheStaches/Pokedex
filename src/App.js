import React, { Component } from 'react';
import List from './Components/List'
import Info from './Components/Info'
import './App.css';

const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemonList: [],
      filterType: 'all'
    }
    this.handleUpdateFilter = this.handleUpdateFilter.bind(this);
  } 

  componentDidMount() {
    if (this.state.pokemonList){
      axios.get('https://pokeapi.co/api/v2/pokemon/?limit=386')
        .then(response => this.setState({
          pokemonList: response.data.results
        }))
        console.log('Getting PokemonLists');
    }
  }

  handleUpdateFilter(event) {
    const {value} = event.target;
    this.setState({
      filterType: value
    })
  }

  render() {
    const {pokemonList, filterType} = this.state;
    return (
      <div className="container">
        <h1>Poke'Dex</h1>
        <div className="row">
            <List 
              pokemonList={pokemonList}
              filterType={filterType}
              handleUpdateFilter={this.handleUpdateFilter}
              />
            <Info />
        </div>
      </div>
    );
  }
}

export default App;
