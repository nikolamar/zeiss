import React, { useEffect } from 'react';
import Socket from '../socket';
import * as channels from "../socket/channels";
import MachinesContainer from '../containers/machines-container';
import ZeissBarContainer from '../containers/zeiss-bar-container';

const Home = () => {

  useEffect(() => {
    const socket = Socket.getInstance();
    socket.connect();
    socket.joinChannel(channels.EVENTS);

    return () => {
      socket.close();
    }
  }, []);

  return (
    <>
      <ZeissBarContainer/>
      <MachinesContainer/>
    </>
  );
}

export default Home;
