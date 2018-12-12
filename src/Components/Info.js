import React from 'react';

class Info extends React.Component {

  render() {
    const {capitalize, removeDash, getSkillDescription, getAbilityDescription} = this.props

    if (this.props.selected) {
      const {name, id, sprites, stats, height, weight, base_experience, abilities, types, moves} = this.props.selected
      const {flavor_text_entries, color, shape, habitat} = this.props.selected.species;

      return (
        <div className='col-9 infoPage'>

    {/* Info page header */}
          <div className='infoHeader'>
            <h1>#{id}: {capitalize(name)}</h1>
            <div className='typeIcons'>
              {types.map(type => 
                <div className={`types ${type.type.name}`}>{capitalize(type.type.name)}</div>
              )}
            </div>
          </div>

    {/* Image and pokedex entry data */}
          <div className='row'>
            <div className='col-4 infoImageDiv'>
              <img alt='img' className='infoImage' src={sprites.front_default} />
            </div>
            <div className='col-8'>
              {<p>ID: #{id}</p>}
              {<p>Name: {capitalize(name)}</p>}
              {<p>Entry: {flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>}
            </div>
          </div>
        
    {/* Info, Base Stats, and Abilities */}
          <div className='row'>

        {/* Info */}
            <div className='col-4'>
              <h3>Info: </h3>
              <div className='info'>
                <div>Height: </div>
                <div>{Math.abs(height / 39.3701 * 12).toFixed(0)}' {(height / 39.3701 * 12 % 12).toFixed(0)}"</div>
              </div>
              <div className='info'>
                <div>Weight: </div>
                <div>{(weight * .220462262185).toFixed(1)} lbs</div>
              </div>
              <div className='info'>
                <div>Base Exp: </div>
                <div>{base_experience}</div>
              </div>
              <div className='info'>
                <div>Color: </div>
                <div>{capitalize(color.name)}</div>
              </div>
              <div className='info'>
                <div>Shape: </div>
                <div>{capitalize(shape.name)}</div>
              </div>
              <div className='info'>
                <div>Habitat: </div>
                <div>{habitat ? capitalize(habitat.name) : 'n/a'}</div>
              </div>
            </div>

        {/* Base Stats */}
            <div className='col-4'>
              <h3>Base Stats:</h3>
              {
                stats.map((stat, index) => 
                  <div className='stats' key={index} >
                    <div> {removeDash(stat.stat.name)}</div>
                    <div> {stat.base_stat}</div>
                  </div>
                )
              }
            </div>

        {/* Abilities */}
            <div className='col-4'>
              <h3>Abilities: </h3>
              <div className='allAbilities'>
              {
                abilities.map((ability, index) => {
                  return (
                    <div>
                      <div key={index} className='abilityDiv'>
                        <button value={ability.url} className='abilities' onClick={getAbilityDescription} >
                          {ability.hidden ? '+' : '-'} {removeDash(ability.name)}
                        </button>
                      </div>
                      <div>
                        {!ability.hidden && <p className='abilityDescription'>{ability.description}</p>}
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
    
    {/* Moves */}
          <div className='row'>
            <div className='col-12'>
              <h3>Moves: </h3>
              <div className='allMoves'>
              {
                moves.map((move, index) => {
                  return (
                    <div>
                      <div key={index} className='movesDiv' >
                        <button value={move.url} className='moves' onClick={getSkillDescription} >
                          {move.hidden ? '+' : '-'} {removeDash(move.name)}
                        </button>
                      </div>
                      <div>
                        {!move.hidden && <p className='moveDescription'>{move.description}</p>}
                      </div>
                    </div>
                  )
                })
              }
              </div>
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
