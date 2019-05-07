import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Arrow extends Component {
  render() {
    const { sortDir, isCurrent, customArrow } = this.props
    let ascending = sortDir === 'ascending'

    if (customArrow && typeof customArrow === 'function') {
      return customArrow(sortDir, isCurrent)
    }

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
  }
}

Arrow.propTypes = {
  sortDir: PropTypes.string,
  isCurrent: PropTypes.bool,
  customArrow: PropTypes.func
}
