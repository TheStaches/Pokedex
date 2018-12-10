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
      selected: null,
      loading: true,
      searchField: '',
    }
    this.updateFilteredList = this.updateFilteredList.bind(this);
    this.handlePokeSelection = this.handlePokeSelection.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
  } 

  componentDidMount() {
    if (this.state.pokemonList){
      axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then(response => this.setState({
          pokemonList: response.data.results.map((pokemon, index) => {
            pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
            pokemon.name = this.capitalize(pokemon.name)
            pokemon.id = index + 1
            return pokemon
          }
          ).slice(0, 721),
          loading: false
        }))
        .then(() => this.setState({
          filteredList: this.state.pokemonList
        }))
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
    const src = event.target.src.match(/[\d]+/)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${src}/`)
      .then(response => this.setState({
        selected: response.data
      }))
  }

  capitalize(str) {
    return str[0].toUpperCase() + str.slice(1, )
  }

  // updateAbilitySelect(event) {
  //   this.state.filteredList.find(poke => poke.id === )
  // }

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
              capitalize={this.capitalize}
              />
            <Info 
              selected={selected}
              capitalize={this.capitalize}
            />
        </div>
      </div>
    );
  }
}

export default App;
