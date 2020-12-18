import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MachinesTable from '../components/machines-table';

const MachinesContainer = ({ machines, machineSetList, isSearching, searchResults, updId }) => {

  useEffect(() => {
    machineSetList();
  }, [machineSetList]);

  if (isSearching) {
    return <MachinesTable data={searchResults} updId={updId}/>;
  }

  return (
    <MachinesTable data={machines} updId={updId}/>
  );
}

const mapStateToProps = state => ({
  machines: state.machines.machines,
  isSearching: state.search.isSearching,
  searchResults: state.search.results,
  updId: state.machines.updatedId,
});

export default connect(
  mapStateToProps,
  { machineSetList: actions.machineSetList }
)(MachinesContainer);
