import React from 'react';

class Info extends React.Component {

  render() {
    const {capitalize, removeDash, getSkillDescription, getAbilityDescription} = this.props

    if (this.props.selected) {
      const {name, id, sprites, stats, height, weight, base_experience, abilities, types, moves} = this.props.selected
      const {flavor_text_entries, color, shape, habitat} = this.props.selected.species;

      return (
        <div className='infoPage border'>
          <h1 className='title' >Pokédex</h1>
          
          
    {/* Info page header */}
          <div className='infoHeader'>
            <h1 className=''>#{id}: {capitalize(name)}</h1>
            <div className='typeIcons'>
              {types.map((type, index) => 
                <div key={index}className={`types ${type.type.name}`}>{capitalize(type.type.name)}</div>
              )}
            </div>
          </div>

    {/* Image and pokedex entry data */}
          <div className='row rows'>
            <div className='col-3 infoImageDiv shadow'>
              <img alt='img' className='infoImage' src={sprites.front_default} />
            </div>
            <div className='col-8 shadow'>
              {<p><span className='bold'>ID: </span>#{id}</p>}
              {<p><span className='bold'>Name:</span>: {capitalize(name)}</p>}
              {<p><span className='bold'>Entry:</span>  {flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>}
            </div>
          </div>
        
    {/* Info, Base Stats, and Abilities */}
          <div className='row rows'>

        {/* Info */}
            <div className='col-4 shadow'>
              <h3 className='statTitles' >Info </h3>
              <div className='info '>
                <div className='bold'>Height: </div>
                <div>{Math.abs(height / 39.3701 * 12).toFixed(0)}' {(height / 39.3701 * 12 % 12).toFixed(0)}"</div>
              </div>
              <div className='info'>
                <div className='bold'>Weight: </div>
                <div>{(weight * .220462262185).toFixed(1)} lbs</div>
              </div>
              <div className='info'>
                <div className='bold'>Base Exp: </div>
                <div>{base_experience}</div>
              </div>
              <div className='info'>
                <div className='bold'>Color: </div>
                <div>{capitalize(color.name)}</div>
              </div>
              <div className='info'>
                <div className='bold'>Shape: </div>
                <div>{capitalize(shape.name)}</div>
              </div>
              <div className='info'>
                <div className='bold'>Habitat: </div>
                <div>{habitat ? capitalize(habitat.name) : 'n/a'}</div>
              </div>
            </div>

        {/* Base Stats */}
            <div className='col-4 shadow'>
              <h3 className='statTitles' >Base Stats</h3>
              {
                stats.map((stat, index) => 
                  <div className='stats' key={index} >
                    <div className='bold'> {removeDash(stat.stat.name)}</div>
                    <div> {stat.base_stat}</div>
                  </div>
                )
              }
            </div>

        {/* Abilities */}
            <div className='col-4 shadow'>
              <h3 className='statTitles'>Abilities </h3>
              <div className='allAbilities'>
              {
                abilities.map((ability, index) => {
                  return (
                    <div key={index}>
                      <div className='abilityDiv'>
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
          <div className='row rows'>
            <div className='col-12'>
              <h3 className='statTitles'>Moves </h3>
              <div className='allMoves'>
              {
                moves.map((move, index) => {
                  return (
                    <div key={index}>
                      <div className='movesDiv' >
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
      <div className='infoPage'>
        <h1 className='title' >Pokédex</h1> 
          <h1 className='select'>Select a Pokémon</h1>
        </div>
      )
    }
  }
}

export default Info;
