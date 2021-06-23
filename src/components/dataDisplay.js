/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid, GridFilterToolbarButton, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid'

import Delete from './delete'

const useStyles = makeStyles({
  table: {
    padding: '1em',
    fontSize: '13px',
    background: '#d3d3d314',
    '& .MuiDataGrid-row': {
      background: '#d3d3d314',
      fontFamily: 'verdana',
      fontSize: '13px'
    },
    '& .MuiDataGrid-colCellWrapper': {
      color: '#000',
      fontFamily: 'verdana'
    },
    '& .MuiDataGrid-columnsContainer': {
      // background: '#0c6394',
      borderBottom: '1px solid #d3d3d3',
      color: '#000'
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #d3d3d3',
      color: '#808080'
    },

  },
  componentContainer: {
    '& .MuiButton-textSizeSmall': {
      margin: '1em 1em'
    }
  }
})

const DataDisplay = ({ columns, rows, CreateButton, InviteButton, resource }) => {
  const classes = useStyles()
  const customToolbar = () => {
    return (
      <GridToolbarContainer className={classes.componentContainer}>
        <GridToolbarExport />
        <GridFilterToolbarButton />
        {resource !== 'invitations' && <CreateButton />}
        {(InviteButton && selectionModel[0]) && <InviteButton id={selectionModel[0]} />}
        {(selectionModel[0] && resource !== 'invitations') && <Delete id={selectionModel[0]} resource={resource} />}
      </GridToolbarContainer>
    )
  }
  const [selectionModel, setSelectionModel] = React.useState([])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        className={classes.table}
        rows={rows}
        columns={columns}
        checkboxSelection={true}
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection.selectionModel)
        }}
        selectionModel={selectionModel}
        components={{
          Toolbar: customToolbar
        }}
      />
    </div>
  )
}

DataDisplay.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  CreateButton: PropTypes.func,
  InviteButton: PropTypes.func,
  resource: PropTypes.string.isRequired,
}

export default DataDisplay