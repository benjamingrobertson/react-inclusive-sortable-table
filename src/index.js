import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import DefinitionList from './definition-list/definition-list'
import Th from './th/th'

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
    this.sort = this.sort.bind(this)
    this.captionID =
      'caption-' +
      Math.random()
        .toString(36)
        .substr(2, 9)
  }

  static propTypes = {
    caption: PropTypes.string,
    className: PropTypes.string,
    customArrow: PropTypes.func,
    customSort: PropTypes.object,
    headers: PropTypes.array.isRequired,
    rowHeaders: PropTypes.bool,
    rows: PropTypes.array.isRequired,
    sortable: PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
  };

  sort(a, b, sortDir, i) {
    if (sortDir === 'ascending') {
      return a[i] > b[i] ? 1 : a[i] < b[i] ? -1 : 0
    } else {
      return a[i] < b[i] ? 1 : a[i] > b[i] ? -1 : 0
    }
  }

  sortBy(i) {
    const { customSort } = this.props
    const { sortDir, sortedBy } = this.state

    let sortDirection
    let ascending = sortDir === 'ascending'
    if (i === sortedBy) {
      sortDirection = !ascending ? 'ascending' : 'descending'
    } else {
      sortDirection = 'ascending'
    }
    this.setState((prevState) => ({
      rows: prevState.rows.slice(0).sort((a, b) => {
        return (
          // If a custom sort method is provided for this column, use it.
          (customSort[i] && customSort[i](a, b, sortDirection, i)) ||
          // Otherwise use the default sort.
          this.sort(a, b, sortDirection, i)
        )
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
      caption,
      className,
      customArrow,
      headers,
      rowHeaders,
      rows,
      sortable
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
                  <Th
                    header={header}
                    i={i}
                    key={i}
                    sortable={sortable}
                    sortBy={this.sortBy}
                    sortDir={this.state.sortDir}
                    sortedBy={this.state.sortedBy}
                    customArrow={customArrow}
                  />
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
