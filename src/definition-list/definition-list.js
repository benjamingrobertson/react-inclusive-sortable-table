import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const DefinitionList = ({ caption, className, rows, headers }) => (
  <div className={className}>
    <h2>{caption}</h2>
    {rows.map((row, i) => (
      <div key={i}>
        <h3>{row[0]}</h3>
        <dl>
          {headers.map(
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
)

DefinitionList.propTypes = {
  caption: PropTypes.string.isRequired,
  className: PropTypes.string,
  rows: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired
}

export default DefinitionList
