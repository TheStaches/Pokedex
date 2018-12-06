import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {pokemonList, filterType, handleUpdateFilter} = this.props;
    return (
      <div className='col-4'>List Card
      <select onChange={handleUpdateFilter}>
        <option value='all'>All</option>
        <option value='gen1'>Gen I</option>
        <option value='gen2'>Gen II</option>
        <option value='gen3'>Gen III</option>
      </select>
        {filterType === 'all' && pokemonList.map((poke, index) => <p key={index} >{poke.name}</p>)}
        {filterType === 'gen1' && pokemonList.slice(0, 151).map((poke, index) => <p key={index} >{poke.name}</p>)}
        {filterType === 'gen2' && pokemonList.slice(151, 251).map((poke, index) => <p key={index} >{poke.name}</p>)}
        {filterType === 'gen3' && pokemonList.slice(251, 386).map((poke, index) => <p key={index} >{poke.name}</p>)}
      </div>
    )
  }
}

export default List;
