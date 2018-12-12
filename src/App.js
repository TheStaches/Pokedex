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
    this.getSkillDescription = this.getSkillDescription.bind(this);
    this.getAbilityDescription = this.getAbilityDescription.bind(this);
  } 

  componentDidMount() {
    // Gets full pokemon list on page load
    if (this.state.pokemonList){
      axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then(response => this.setState({
          pokemonList: response.data.results.map((pokemon, index) => {
            // Adds image url and pokemon id to initial pokemon list
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
    const src = parseInt(event.target.src.match(/[\d]+/)[0])
    const selected = this.state.filteredList.find(poke => poke.id === src)

    // Checks if secondary pokemon data has been cached already
    if (selected.hasOwnProperty('species')) {
      this.setState({
        selected
      })
    } else {
      axios.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${src}/`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${src}/`)
      ])
        .then(response => {
          const addSpeciesList = this.state.filteredList.map(poke => {
            const url = poke.url
            const image = poke.image
            if (poke.id === src) {
              poke = response[0].data
              poke.species = response[1].data
              poke.url = url
              poke.image = image

              // Updates pokemon move set for easier manipulation
              poke.moves = poke.moves.map(move => {
                return {hidden: true,
                id: move.move.url.slice(31, 33),
                name: move.move.name,
                url: move.move.url}
              });
                
              // Updates pokemon abilities for easier manipulation
              poke.abilities = poke.abilities.map(ability => {
                return {hidden: true,
                id: ability.ability.url.slice(34, 36),
                name: ability.ability.name,
                url: ability.ability.url}
              });
            }
            return poke;
          })
          return this.setState({
            selected: response[0].data,
            filteredList: addSpeciesList
          });
        })
    }
  }

  capitalize(str) {
    return str[0].toUpperCase() + str.slice(1)
  }

  removeDash(str) {
    return str.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  }

  getSkillDescription(event) {
    const {value} = event.target;
    const selected = this.state.selected;
    const move = selected.moves.find(move => value === move.url)

    // Checks if skills description has been cached
    if (!move.description) {
      axios.get(value)
        .then(response => {
          move.description = response.data.effect_entries[0].effect
          move.hidden = !move.hidden
          this.setState({
            selected
          })
        })
    } else {
      move.hidden = !move.hidden
      this.setState({
        selected
      })
    }
  }

  getAbilityDescription(event) {
    const {value} = event.target;
    const selected = this.state.selected;
    const ability = selected.abilities.find(ability => value === ability.url)

    // Checks if ability description has been cached
    if(!ability.descriptio) {
      axios.get(value)
        .then(response => {
          ability.description = response.data.effect_entries[0].effect;
          ability.hidden = !ability.hidden
          this.setState({
            selected
          })
        })
    } else {
      ability.hidden = !ability.hidden
      this.setState({
        selected
      })
    }

  }

  render() {
    const {filteredList, selected, loading, searchField, movesList} = this.state;

    // Waits for initial pokemon list before rendering main page
    if (loading) {
      return (
        <h1 className='loading'>Loading...</h1>
    )}
    return (
      <div className="container-fluid">
        <h1 className='title' >Poke'Dex</h1>
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
              movesList={movesList}
              capitalize={this.capitalize}
              removeDash={this.removeDash}
              getSkillDescription={this.getSkillDescription}
              getAbilityDescription={this.getAbilityDescription}
            />
        </div>
      </div>
    );
  }
}

export default App;
