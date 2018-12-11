import React from 'react';

class Info extends React.Component {

  render() {
    const {capitalize} = this.props

    if (this.props.selected) {
      const {name, id, sprites, stats, height, weight, base_experience, abilities, types, game_indices, moves} = this.props.selected
      const {flavor_text_entries, color, shape, habitat} = this.props.selected.species;

      return (
      <div className='col-9 infoPage'>
        <h1>#{id}: {(name[0].toUpperCase() + name.slice(1, )).match(/^(\w+)/)[0]}</h1>
        <div className='row'>
          <div className='col-4 border'>
            <img alt='img' className='infoImage' src={sprites.front_default}/>
          </div>
          <div className='col-8 border'>
            {<p>ID: #{id}</p>}
            {<p>Name: {capitalize(name)}</p>}
            
            {
            <p>Entry:  
              {flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}
            </p>
            }
          </div>
        </div>

        <div className='row'>
          <div className='col-4 border'>
            <h3>Info: </h3>
            {<p>Height: {Math.abs(height / 39.3701 * 12).toFixed(0)}' {(height / 39.3701 * 12 % 12).toFixed(0)}"</p>}
            {<p>Weight: {(weight * .220462262185).toFixed(1)} lbs</p>}
            {<p>Base Exp: {base_experience}</p>}
            {<p>Color: {capitalize(color.name)}</p>}
            {<p>Shape: {capitalize(shape.name)}</p>}
            {<p>Habitat: {capitalize(habitat.name)}</p>}

            {/* {
              game_indices.reverse().map((game, index) => 
                <div className='games' key={index} >
                  <div> {capitalize(game.version.name).replace('-', ' ')}</div>
                </div>
              )
            } */}
          </div>

          <div className='col-4 border'>
            <h3>Base Stats:</h3>
            {
              stats.map((stat, index) => 
                <div className='stats' key={index} >
                  <div> {capitalize(stat.stat.name)}</div>
                  <div> {stat.base_stat} {stat.effort}</div>
                </div>
                )
            }
          </div>
          <div className='col-4 types border'>
            {
              abilities.map((ability, index) => 
                <div className='abilities' key={id-index} >+ {capitalize(ability.ability.name)}</div>  
              )
            }
            
          </div>
          
        </div>

        <div className='row'>
          <div className='col-12 border'>
            {
              moves.map((move, index) => 
                <div key={index} >{capitalize(move.move.name)}</div>
              )
            }
          </div>
        </div>
      </div>
    )
    } else {
      return (
      <div className='col-9'>
          <h1>Select a Poke'mon</h1>
        </div>
      )
    }
  }
}

export default Info;
