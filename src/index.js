import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import debounce from 'debounce'

import styles from './styles.css'
import DefinitionList from './definition-list/definition-list'
import Table from './table/table'

export default class InclusiveTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabindex: null,
      rows: props.rows,
      sortedBy: null,
      sortDir: 'none',
      windowWidth: 0
    }
    this.container = React.createRef()
    this.sortBy = this.sortBy.bind(this)
    this.sort = this.sort.bind(this)
    this.handleResize = debounce(this.handleResize.bind(this), 50, false)
    this.captionID =
      'caption-' +
      Math.random()
        .toString(36)
        .substr(2, 9)
  }

  static propTypes = {
    /** An optional breakpoint, determines when the `<dl>` switches to a `<table>` */
    breakpoint: PropTypes.number,
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
          (customSort &&
            customSort[i] &&
            customSort[i](a, b, sortDirection, i)) ||
          // Otherwise use the default sort.
          this.sort(a, b, sortDirection, i)
        )
      }),
      sortedBy: i,
      sortDir: sortDirection
    }))
  }

  componentDidMount() {
    const { scrollWidth, clientWidth } =
      this.container && this.container.current

    let scrollable = scrollWidth > clientWidth
    this.setState({
      tabindex: scrollable ? '0' : null
    })

    if (this.props.breakpoint) {
      window.addEventListener('resize', this.handleResize)
      this.setState({ windowWidth: window.innerWidth })
    }
  }

  componentWillUnmount() {
    if (this.props.breakpoint) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth })
  }

  render() {
    const {
      breakpoint,
      caption,
      className,
      customArrow,
      headers,
      rowHeaders,
      rows,
      sortable
    } = this.props
    const { tabindex, sortedBy, sortDir, windowWidth } = this.state

    return (
      <div className={className}>
        {breakpoint && (
          <div ref={this.container}>
            {windowWidth >= breakpoint ? (
              <Table
                caption={caption}
                captionID={this.captionID}
                className={classnames(styles.tableScroll, {
                  [styles.tableContainer]: !breakpoint
                })}
                customArrow={customArrow}
                headers={headers}
                rowHeaders={rowHeaders}
                rows={this.state.rows}
                sortable={sortable}
                sortBy={this.sortBy}
                sortDir={sortDir}
                sortedBy={sortedBy}
                tabindex={tabindex}
              />
            ) : (
              <DefinitionList
                className={classnames({ [styles.listsContainer]: !breakpoint })}
                caption={caption}
                rows={rows}
                headers={headers}
              />
            )}
          </div>
        )}
        {!breakpoint && (
          <div ref={this.container}>
            <Table
              caption={caption}
              captionID={this.captionID}
              className={classnames(styles.tableScroll, {
                [styles.tableContainer]: !breakpoint
              })}
              customArrow={customArrow}
              headers={headers}
              rowHeaders={rowHeaders}
              rows={this.state.rows}
              sortable={sortable}
              sortBy={this.sortBy}
              sortDir={sortDir}
              sortedBy={sortedBy}
              tabindex={tabindex}
            />
            <DefinitionList
              className={classnames({ [styles.listsContainer]: !breakpoint })}
              caption={caption}
              rows={rows}
              headers={headers}
            />
          </div>
        )}
      </div>
    )
  }
}
