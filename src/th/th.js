import React from 'react'
import PropTypes from 'prop-types'
import Arrow from '../arrow/arrow'

import styles from './styles.css'

const th = ({
  sortedBy,
  i,
  header,
  sortBy,
  sortDir,
  sortable,
  customArrow
}) => {
  const sortableColumn =
    (Array.isArray(sortable) && sortable.includes(i)) || sortable === true

  return (
    <th
      role='columnheader'
      scope='col'
      aria-sort={sortedBy === i ? sortDir : 'none'}
    >
      {header}
      {sortableColumn && (
        <button onClick={() => sortBy(i)}>
          <Arrow
            sortDir={sortDir}
            isCurrent={sortedBy === i}
            customArrow={customArrow}
            className={styles.defaultArrow}
          />
          <span className={styles.visuallyHidden}>
            sort by {header} in
            {sortDir !== 'ascending' ? 'ascending' : 'descending'}
            order
          </span>
        </button>
      )}
    </th>
  )
}

th.propTypes = {
  customArrow: PropTypes.func,
  header: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  sortable: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  sortBy: PropTypes.func.isRequired,
  sortDir: PropTypes.string,
  sortedBy: PropTypes.number
}

export default th
