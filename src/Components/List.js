import React from 'react';

class List extends React.Component {

  render() {
    const {updateFilteredList, handlePokeSelection, handleSearchFilter, searchField} = this.props;

    let {filteredList} = this.props

    if (filteredList) {
      filteredList = filteredList.filter(poke => new RegExp(searchField, 'ig').test(poke.name));
    }

    return (
      <div className='col-3'>
        <select onChange={updateFilteredList}>
          <option value='all'>All</option>
          <option value='gen1'>Gen I</option>
          <option value='gen2'>Gen II</option>
          <option value='gen3'>Gen III</option>
          <option value='gen4'>Gen IV</option>
          <option value='gen5'>Gen V</option>
          <option value='gen6'>Gen VI</option>
        </select>
        <input type='textbox' onChange={handleSearchFilter}/>

        <div className='pokeList'>
          {
            filteredList.map((poke, index) => 
              <div onClick={handlePokeSelection} value={poke.name} className='pokemon' key={poke.name} ><img alt='img' className='pokeImage' src={poke.image}/>#{poke.id} {poke.name.match(/^(\w+)/)[0]}</div>)
          }
        </div>
      </div>
    )
  }
}

export default List;
