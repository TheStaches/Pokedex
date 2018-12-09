import React from 'react';

class Info extends React.Component {

  render() {
    const {selected} = this.props
    return (
      <div className='col-9'>Info Card
        {
          selected && <p>{selected.name}</p>
        }
      </div>
    )
  }
}

export default Info;
