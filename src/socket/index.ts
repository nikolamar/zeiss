import { Socket as Phoenix, Channel } from "phoenix";
import store from "../store";
import * as actions from "../actions";
import * as channels from "./channels";

const baseURL = `${process.env.REACT_APP_SOCKET}`;

if (process.env.NODE_ENV === "development") {
  console.log("socket: ", baseURL);
}

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 * The status can be either idle, running, finished or errorred
 * in which case they will be repaired automatically and a repaired
 * event will be sent before resetting to idle again.
 * Your colleague has recommended the phoenix npm module to connect
 * with the backend and has provided you with the following sample code:
 */
export default class Socket {
  private static instance: Socket;

  private client: Phoenix;
  private joinedChannels: Channel[];

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Socket {
    if (!Socket.instance) {
      Socket.instance = new Socket();
      Socket.instance.client = new Phoenix(`${baseURL}/events`);
      Socket.instance.joinedChannels = [];
    }

    return Socket.instance;
  }

  public connect() {
    this.client.connect();

    store.dispatch(actions.socketStatus("CONNECTED"));

    this.client.onError(() => {
      store.dispatch(actions.socketError("CONNECTION ERROR"));
    });

    this.client.onClose(() => {
      store.dispatch(actions.socketStatus("CONNECTION DROPPED"));
    });
  }

  public joinChannel(channelName) {
    // Join correct channel and log events
    const channel = this.client.channel(channelName, {});
    channel.join();

    // Listen channel new event
    if (channelName === channels.EVENTS) {
      channel.on("new", (event) => {
        store.dispatch(actions.machineUpdateIndex(event));
        store.dispatch(actions.machineUpdateStatus(event));
      });
    }

    this.joinedChannels.push(channel);
  }

  public close() {
    this.joinedChannels.forEach((channel) => channel.leave());
    this.client.disconnect();
  }
}
