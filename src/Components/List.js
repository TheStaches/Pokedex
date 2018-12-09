import React from 'react';

class List extends React.Component {

  render() {
    const {updateFilteredList, handlePokeSelection, handleSearchFilter, searchField} = this.props;

    let {filteredList} = this.props

    if (filteredList) {
      filteredList = filteredList.filter(poke => new RegExp(searchField, 'i').test(poke.name));
    }

    return (
      <div className='col-3'>
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

        <div className='pokeList'>
          {
            filteredList.map(poke => 
              <div onClick={handlePokeSelection} value={poke.name} className='pokemon' key={poke.name} >
                <img alt='img' className='pokeImage' src={poke.image}/>#{poke.id} {poke.name.match(/^(\w+)/)[0]}
                <button value={poke.id} onClick={handlePokeSelection} className='btn btn-primary'/>
              </div>)
          }
        </div>
      </div>
    )
  }
}

export default List;
