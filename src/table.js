import React from 'react'

import styles from './styles.css'

const Arrow = (props) => {
  let ascending = props.sortDir === 'ascending'
  return (
    <svg viewBox='0 0 100 200' width='100' height='200'>
      {!(!ascending && props.isCurrent) && (
        <polyline points='20 50, 50 20, 80 50' />
      )}
      <line x1='50' y1='20' x2='50' y2='180' />
      {!(ascending && props.isCurrent) && (
        <polyline points='20 150, 50 180, 80 150' />
      )}
    </svg>
  )
}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabindex: null,
      rows: props.rows,
      sortedBy: null,
      sortDir: 'none'
    }
    this.container = React.createRef()
    this.sortBy = this.sortBy.bind(this)
    this.captionID =
      'caption-' +
      Math.random()
        .toString(36)
        .substr(2, 9)
  }

  sortBy(i) {
    let sortDir
    let ascending = this.state.sortDir === 'ascending'
    if (i === this.state.sortedBy) {
      sortDir = !ascending ? 'ascending' : 'descending'
    } else {
      sortDir = 'ascending'
    }
    this.setState((prevState) => ({
      rows: prevState.rows.slice(0).sort((a, b) => {
        if (sortDir === 'ascending') {
          return a[i] > b[i] ? 1 : a[i] < b[i] ? -1 : 0
        } else {
          return a[i] < b[i] ? 1 : a[i] > b[i] ? -1 : 0
        }
      }),
      sortedBy: i,
      sortDir: sortDir
    }))
  }

  componentDidMount() {
    const { scrollWidth, clientWidth } = this.container
    let scrollable = scrollWidth > clientWidth
    this.setState({
      tabindex: scrollable ? '0' : null
    })
  }
  render() {
    return (
      <div>
        <div
          className={styles.tableContainer}
          ref={this.container}
          tabIndex={this.state.tabindex}
          aria-labelledby={this.captionID}
          role='group'
        >
          <table>
            <caption id={this.captionID}>
              {this.props.caption}
              {this.state.tabindex === '0' && (
                <div>
                  <small>(scroll to see more)</small>
                </div>
              )}
            </caption>
            <tbody>
              <tr>
                {this.props.headers.map((header, i) => (
                  <th
                    role='columnheader'
                    scope='col'
                    key={i}
                    aria-sort={
                      this.state.sortedBy === i ? this.state.sortDir : 'none'
                    }
                  >
                    {header}
                    {this.props.sortable && (
                      <button onClick={() => this.sortBy(i)}>
                        <Arrow
                          sortDir={this.state.sortDir}
                          isCurrent={this.state.sortedBy === i}
                        />
                        <span className='visually-hidden'>
                          sort by {header} in
                          {this.state.sortDir !== 'ascending'
                            ? 'ascending'
                            : 'descending'}
                          order
                        </span>
                      </button>
                    )}
                  </th>
                ))}
              </tr>
              {this.state.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, i) =>
                    this.props.rowHeaders && i < 1 ? (
                      <th scope='row' key={i}>
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.listsContainer}>
          <h2>{this.props.caption}</h2>
          {this.props.rows.map((row, i) => (
            <div key={i}>
              <h3>{row[0]}</h3>
              <dl>
                {this.props.headers.map(
                  (header, i) =>
                    i > 0 && (
                      <React.Fragment key={i}>
                        <dt>{header}</dt>
                        <dd>{row[i]}</dd>
                      </React.Fragment>
                    )
                )}
              </dl>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Table
