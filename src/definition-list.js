import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const DefinitionList = ({ caption, rows, headers }) => (
  <div className={styles.listsContainer}>
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
  rows: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired
}

export default DefinitionList
