import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ZeissBar from '../components/zeiss-bar';

const ZeissBarContainer = ({ searchOn, searchOff, searchSetList, machines }) => {

  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if (term.length > 0) {
      searchOn();
    } if (term.length === 0) {
      searchOff();
    }
    const data = machines.filter(machine => machine.machine_type.includes(debouncedTerm));
    searchSetList(data);
  }, [debouncedTerm]);

  return (
    <ZeissBar term={term} setTerm={setTerm}/>
  );
}

const mapStateToProps = state => ({ machines: state.machines.machines });

export default connect(
  mapStateToProps,
  { searchOn: actions.searchOn, searchOff: actions.searchOff, searchSetList: actions.searchSetList }
)(ZeissBarContainer);
