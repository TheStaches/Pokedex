import React from 'react';

class List extends React.Component {

  render() {
    const {updateFilteredList, handlePokeSelection, handleSearchFilter, searchField} = this.props;

    let {filteredList} = this.props

    // Handles filtering pokemon based on the search input
    if (filteredList) {
      filteredList = filteredList.filter(poke => new RegExp(searchField, 'i').test(poke.name));
    }

    return (
      <div className='list border'>
      <div className='inputs'>
        <select onChange={updateFilteredList}>
          <option value='all'>All</option>
          <option value='gen1'>Generation I</option>
          <option value='gen2'>Generation II</option>
          <option value='gen3'>Generation III</option>
          <option value='gen4'>Generation IV</option>
          <option value='gen5'>Generation V</option>
          <option value='gen6'>Generation VI</option>
        </select>
        <input type='textbox' className='searchBox' onChange={handleSearchFilter} placeholder='Search...' />
      </div>

        <div className='pokeList'>
          {
            filteredList.map(poke => 
              <img alt='pokemon' className='pokeImage' src={poke.image} key={poke.name} onClick={handlePokeSelection} />
            )
          }
        </div>
      </div>
    )
  }
}

export default List;
