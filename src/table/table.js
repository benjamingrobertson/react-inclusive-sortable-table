import React from 'react'
import PropTypes from 'prop-types'

import Th from '../th/th'

const Table = ({
  caption,
  customArrow,
  className,
  headers,
  rowHeaders,
  rows,
  sortable,
  sortBy,
  sortDir,
  sortedBy,
  tabindex,
  captionID
}) => {
  return (
    <div
      className={className}
      tabIndex={tabindex}
      aria-labelledby={captionID}
      role='group'
    >
      <table>
        <caption id={captionID}>
          {caption}
          {tabindex === '0' && (
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
                sortBy={sortBy}
                sortDir={sortDir}
                sortedBy={sortedBy}
                customArrow={customArrow}
              />
            ))}
          </tr>
          {rows.map((row, i) => (
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
  )
}

Table.propTypes = {
  caption: PropTypes.string,
  className: PropTypes.string,
  customArrow: PropTypes.func,
  headers: PropTypes.array.isRequired,
  rowHeaders: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  sortable: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  sortBy: PropTypes.func.isRequired,
  sortDir: PropTypes.string.isRequired,
  sortedBy: PropTypes.number,
  tabindex: PropTypes.number,
  captionID: PropTypes.string.isRequired
}

export default Table
