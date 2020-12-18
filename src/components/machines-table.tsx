import React, { FC } from 'react';
import moment from 'moment';
import Machine from '../models/machine';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './machines-table-styles';

interface MachinesTableProps {
  data: Machine[];
  updId: string;
}

const MachinesTable: FC<MachinesTableProps> = ({ data, updId }) => {

  const classes = useStyles();

  const handleStatusColor = (status) => {
    switch (status) {
      case 'running':
        return { color: '#76FF03' };
      case 'finished':
        return { color: '#03A9F4' };
      case 'idle':
        return { color: '#1B5E20' };
      case 'errored':
        return { color: '#ff1744' };
      case 'repaired':
        return { color: '#FF6F00' };
      default:
        return { color: '#FFFFFF' };
    }
  }

  return (
    <TableContainer component={Paper}>
      <div className="app-bar-height"/>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <MachineCell>Idx</MachineCell>
            <MachineCell>Status</MachineCell>
            <MachineCell align="left">Machine Type</MachineCell>
            <MachineCell align="left">Longitude</MachineCell>
            <MachineCell align="left">Latitude</MachineCell>
            <MachineCell align="left">Last Maintanance</MachineCell>
            <MachineCell align="left">Install Date</MachineCell>
            <MachineCell align="right">Floor</MachineCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <MachineRow key={row.id} className={row.id === updId ? 'updated' : null}>
              <MachineCell align="left">{idx+1}</MachineCell>
              <MachineCell style={handleStatusColor(row.status)} align="left" component="th" scope="row">{row.status}</MachineCell>
              <MachineCell align="left">{row.machine_type}</MachineCell>
              <MachineCell align="left">{row.longitude}</MachineCell>
              <MachineCell align="left">{row.latitude}</MachineCell>
              <MachineCell align="left">{moment(row.last_maintenance).format('MMMM Do YYYY, h:mm:ss a')}</MachineCell>
              <MachineCell align="left">{moment(row.install_date).format("MMM Do YYYY")}</MachineCell>
              <MachineCell align="right">{row.floor}</MachineCell>
            </MachineRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const MachineCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const MachineRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default MachinesTable;
