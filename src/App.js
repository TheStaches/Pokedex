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
      filteredList: [],
      selected: {},
      loading: true,
      searchField: ''
    }
    this.updateFilteredList = this.updateFilteredList.bind(this);
    this.handlePokeSelection = this.handlePokeSelection.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
  } 

  componentDidMount() {
    if (this.state.pokemonList){
      axios.get('https://pokeapi.co/api/v2/pokemon/?limit=386')
        .then(response => this.setState({
          pokemonList: response.data.results.map((pokemon, index) => {
            pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
            pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1, )
            pokemon.id = index + 1
            return pokemon
          }
          ).slice(0, 721),
          loading: false
        }))
        .then(() => this.setState({
          filteredList: this.state.pokemonList
        }))
        console.log('Getting PokemonLists');
    }
  }

  handleSearchFilter(event) {
    const {value} = event.target;
    this.setState({
      searchField: value
    })
  }

  updateFilteredList(event) {
    const {value} = event.target;
    value === 'all' && this.setState({filteredList: this.state.pokemonList})
    value === 'gen1' && this.setState({filteredList: this.state.pokemonList.slice(0, 151)})
    value === 'gen2' && this.setState({filteredList: this.state.pokemonList.slice(151, 251)})
    value === 'gen3' && this.setState({filteredList: this.state.pokemonList.slice(251, 386)})
    value === 'gen4' && this.setState({filteredList: this.state.pokemonList.slice(386, 493)})
    value === 'gen5' && this.setState({filteredList: this.state.pokemonList.slice(493, 649)})
    value === 'gen6' && this.setState({filteredList: this.state.pokemonList.slice(649, 721)})
  }

  handlePokeSelection(event) {
    console.log(event.target)
    console.log(event.target.class)
    console.log(event.target.value)
  }

  render() {
    const {filteredList, selected, loading, searchField} = this.state;

    if (loading) {
      return (
        <h1>Loading...</h1>
    )}
    return (
      <div className="">
        <h1>Poke'Dex</h1>
        <div className="row">
            <List 
              filteredList={filteredList}
              searchField={searchField}
              updateFilteredList={this.updateFilteredList}
              handlePokeSelection={this.handlePokeSelection}
              handleSearchFilter={this.handleSearchFilter}
              />
            <Info 
              selected={selected}
            />
        </div>
      </div>
    );
  }
}

export default App;
