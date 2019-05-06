import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from './table'

// import './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const headers = ['Band', 'Singer', 'Inception', 'Label']

    const rows = [
      ['Napalm Death', 'Barney Greenway', '1981', 'Century Media'],
      ['Carcass', 'Jeff Walker', '1985', 'Earache'],
      ['Extreme Noise Terror', 'Dean Jones', '1985', 'Candlelight'],
      ['Discordance Axis', 'Jon Chang', '1992', 'Hydrahead']
    ]
    return (
      <div className='App'>
        <Table
          rows={rows}
          headers={headers}
          rowHeaders
          caption='Grindcore bands'
          sortable
        />
      </div>
    )
  }
}
