import React, { Component } from 'react';

import Table from 'react-inclusive-sortable-table';

export default class App extends Component {
  render() {
    const headers = ['Site', 'Founder', 'Inception', 'URL'];

    const rows = [
      [
        'CSS Tricks',
        'Chris Coyier',
        '2007',
        <a href="http://css-tricks.com">http://css-tricks.com</a>
      ],
      [
        'Smashing Magazine',
        'Vitaly Friedman and Sven Lennartz',
        '2006',
        <a href="https://www.smashingmagazine.com/">
          https://www.smashingmagazine.com/
        </a>
      ],
      [
        'A List Apart',
        'Jeffrey Zeldman',
        '1998',
        <a href="https://alistapart.com/">https://alistapart.com/</a>
      ],
      [
        'codrops',
        'Manoela Ilic and Pedro Botelho',
        '2009',
        <a href="https://tympanus.net/codrops/">
          https://tympanus.net/codrops/
        </a>
      ]
    ];

    return (
      <div>
        <Table
          rows={rows}
          headers={headers}
          rowHeaders
          caption="Front end websites"
          sortable
        />
      </div>
    );
  }
}
