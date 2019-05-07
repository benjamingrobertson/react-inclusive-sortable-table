# react-inclusive-sortable-table

> An accessible, responsive, sortable table based off of Heydon Pickering&#x27;s Sortable Table from Inclusive Components.

[![NPM](https://img.shields.io/npm/v/react-inclusive-sortable-table.svg)](https://www.npmjs.com/package/react-inclusive-sortable-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Read the artice! [Data Tables](https://inclusive-components.design/data-tables/)

This component displays a `<table>` on large viewports and a definition list `<dl>` on small viewports.

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

## Props

### caption

The title of your table. Will be wrapped in a `<caption>` for the table display and an `<h2>` for the definition list display.

### className

An optional class name to use for custom styling. Will be added to the component wrapper.

### customArrow

A render props method for using a custom arrow icon.

Here is an example of how you override the arrow with a custom component:

```jsx
<Table
  customArrow={(sortDir, isCurrent) => (
    <p>
      {sortDir}, {isCurrent}
    </p>
  )}
  caption="Front end websites"
  headers={headers}
  rows={rows}
  sortable
/>

```

The default arrow looks like this (it uses sortDirection and isCurrent to determine which way the arrow should point):

```jsx
let ascending = sortDir === 'ascending'

return (
  <svg viewBox='0 0 100 200' width='100' height='200'>
    {!(!ascending && isCurrent) && (
      <polyline points='20 50, 50 20, 80 50' />
    )}
    <line x1='50' y1='20' x2='50' y2='180' />
    {!(ascending && isCurrent) && (
      <polyline points='20 150, 50 180, 80 150' />
    )}
  </svg>
)
```

### headers

An array of table headers. Will be wrapped in `<th>` for the table display and `<dt>` for the definition list display.

### rowHeaders

A boolean, determines whether or not to wrap the first column in each row in a `<th>`  for the table display.

It makes the font-weight bold.

### rows

An array of arrays for each row, containing the data for the table.

For example:

```js
[
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
```

### sortable

Can be either a boolean or an array. By default, no columns will be sortable.

#### boolean

If it is passed without arguments (ie, `<Table sortable />`), all columns will be sortable.

#### array

To control what columns to sort, pass in an array containing the index of the columns you want to sort.

For example, to sort the 2nd and 4th columns:

```jsx
<Table
  caption="Front end websites"
  headers={headers}
  rows={rows}
  sortable={[1, 3]}
/>
```

## Todos

- Customizable sorting methods

## License

MIT © [benjamingrobertson](https://github.com/benjamingrobertson)
