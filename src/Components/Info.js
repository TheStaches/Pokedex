import React from 'react';

class Info extends React.Component {

  render() {
    const {capitalize} = this.props

    if (this.props.selected) {
      const {name, id, sprites, stats, height, weight, base_experience, abilities, types, game_indices} = this.props.selected

      return (
      <div className='col-9 infoPage'>
        <h1>#{id}: {(name[0].toUpperCase() + name.slice(1, )).match(/^(\w+)/)[0]}</h1>
        <div className='row'>
          <div className='col-4 border'>
            <img alt='img' className='infoImage' src={sprites.front_default}/>
          </div>
          <div className='col-8 border'>
            {<p>Height: {height}</p>}
            {<p>Weight: {weight}</p>}
            {<p>Base Exp: {base_experience}</p>}
          </div>
        </div>

        <div className='row'>
          <div className='col-4 border'>
            <h3>Base Stats:</h3>
            {
              stats.map((stat, index) => 
                <div className='stats' key={index} >
                  <div> {capitalize(stat.stat.name)}</div>
                  <div> {stat.base_stat}</div>
                </div>
                )
            }
          </div>
          <div className='col-4 types border'>
            {
              types.map((type, index) => 
                <div key={index} >{capitalize(type.type.name)}</div>
              )
            }
          </div>
          <div className='col-4 border'>
            <h3>Games: </h3>
            {
              game_indices.reverse().map((game, index) => 
                <div className='games' key={index} >
                  <div> {capitalize(game.version.name).replace('-', ' ')}</div>
                </div>
              )
            }
          </div>
        </div>

        <div className='row'>
          <div className='col-12 border'>
          {
            abilities.map((ability, index) => 
              <div className='abilities' key={id-index} >+ {capitalize(ability.ability.name)}</div>  
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
