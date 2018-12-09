import React from 'react';

class Info extends React.Component {

  render() {
    if (this.props.selected) {
      const {name, id, sprites, stats, height, weight, base_experience, abilities, types} = this.props.selected

      return (
      <div className='col-9'>
        <h1>#{id}: {(name[0].toUpperCase() + name.slice(1, )).match(/^(\w+)/)[0]}</h1>
        <div className='row'>
          <div className='col-4 border'>
            <img alt='img' className='pokeImage' src={sprites.front_default}/>
          </div>
          <div className='col-8 border'>
            {<p>{height}</p>}
            {<p>{weight}</p>}
            {<p>{base_experience}</p>}
          </div>
        </div>

        <div className='row'>
          <div className='col-3 border'>
            {
              stats.map((stat, index) => 
                <div key={index} >{stat.stat.name} {stat.base_stat}</div>
                )
            }
          </div>
          <div className='col-3 border'>
            {
              types.map((type, index) => 
                <div key={index} >{type.type.name}</div>
              )
            }
          </div>
          <div className='col-3 border'>
            {
              abilities.map((ability, index) => 
                <div key={index} >{ability.ability.name}</div>  
              )
            }
          </div>
        </div>

        <div className='row'>
          <div className='col-12 border'>
          </div>
        </div>
      </div>
    )
    } else {
      return (
      <div className='col-9'>
          Pokemon Info
        </div>
      )
    }
  }
}

export default Info;
