import React from 'react';

class Info extends React.Component {

  render() {
    const {capitalize, removeDash, getSkillDescription} = this.props

    if (this.props.selected) {
      const {name, id, sprites, stats, height, weight, base_experience, abilities, types, moves} = this.props.selected
      const {flavor_text_entries, color, shape, habitat} = this.props.selected.species;

      return (
      <div className='col-9 infoPage'>
        <h1>#{id}: {capitalize(name)}</h1>
        <div className='row'>
          <div className='col-4 shadow infoImageDiv'>
            <img alt='img' className='infoImage' src={sprites.front_default}/>
          </div>
          <div className='col-8 shadow'>
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
          <div className='col-4 shadow'>
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
              <div>{capitalize(habitat.name)}</div>
            </div>
          </div>

          <div className='col-4 shadow'>
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
          <div className='col-4 shadow'>
            <h3>Abilities: </h3>
            {
              abilities.map((ability, index) => 
                <div className='abilities' key={id-index} >+ {removeDash(ability.name)}</div>  
              )
            }
            
          </div>
          
        </div>

        <div className='row'>
          <div className='col-12 moveDiv shadow'>
            <h3>Moves: </h3>
            {
              moves.map((move, index) => {
                return (
                  <div>
                    <div key={index} className='movesDiv' >
                      <button value={move.url} className='moves' onClick={getSkillDescription} >
                        {move.hidden ? '+' : '-'}
                      </button>
                      <p>{removeDash(move.name)}</p>
                    </div>
                    <div>
                      {!move.hidden && <p className='moveDescription'>{move.description}</p>}
                    </div>
                  </div>
                )
              }
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
