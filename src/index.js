import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Arrow from './arrow'

import styles from './styles.css'
import DefinitionList from './definition-list'

export default class Table extends Component {
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

  static propTypes = {
    caption: PropTypes.string,
    className: PropTypes.string,
    headers: PropTypes.array.isRequired,
    rowHeaders: PropTypes.bool,
    rows: PropTypes.array.isRequired,
    sortable: PropTypes.bool
  };

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
    const { scrollWidth, clientWidth } =
      this.container && this.container.current

    let scrollable = scrollWidth > clientWidth
    this.setState({
      tabindex: scrollable ? '0' : null
    })
  }
  render() {
    const {
      rows,
      caption,
      headers,
      sortable,
      rowHeaders,
      className
    } = this.props

    return (
      <div className={className}>
        <div
          className={styles.tableContainer}
          ref={this.container}
          tabIndex={this.state.tabindex}
          aria-labelledby={this.captionID}
          role='group'
        >
          <table>
            <caption id={this.captionID}>
              {caption}
              {this.state.tabindex === '0' && (
                <div>
                  <small>(scroll to see more)</small>
                </div>
              )}
            </caption>
            <tbody>
              <tr>
                {headers.map((header, i) => (
                  <th
                    role='columnheader'
                    scope='col'
                    key={i}
                    aria-sort={
                      this.state.sortedBy === i ? this.state.sortDir : 'none'
                    }
                  >
                    {header}
                    {sortable && (
                      <button onClick={() => this.sortBy(i)}>
                        <Arrow
                          sortDir={this.state.sortDir}
                          isCurrent={this.state.sortedBy === i}
                        />
                        <span className={styles.visuallyHidden}>
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
                    rowHeaders && i < 1 ? (
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
        <DefinitionList caption={caption} rows={rows} headers={headers} />
      </div>
    )
  }
}
