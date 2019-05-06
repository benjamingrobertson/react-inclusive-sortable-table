# react-inclusive-sortable-table

> An accessible, sortable table based off of Heydon Pickering&#x27;s Sortable Table from Inclusive Components.

[![NPM](https://img.shields.io/npm/v/react-inclusive-sortable-table.svg)](https://www.npmjs.com/package/react-inclusive-sortable-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-inclusive-sortable-table
```

## Usage

```jsx
import React, { Component } from 'react'

import Table from 'react-inclusive-sortable-table'

class Example extends Component {
  render () {
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
      <Table
        rows={rows}
        headers={headers}
        rowHeaders
        caption="Front end websites"
        sortable
        />
    )
  }
}
```

## Todos

- Set what columns are sortable
- Customizable sorting button
- Customizable sorting methods

## License

MIT © [benjamingrobertson](https://github.com/benjamingrobertson)
