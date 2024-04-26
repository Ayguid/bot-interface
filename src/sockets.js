import { reactive } from "vue";
import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://192.168.214.10:7000";

export const socket = io(URL);
export const state = reactive({
  connected: false,
  snackbar: false,
  snackbar_msg: '',
  over_modal_show: false,
  fooEvents: [],
  barEvents: [],
  startBotEmit() {
    /*
    socket.emit("start:bot", { label }, (res) => {
      item.id = res.data;
    });
    */
    socket.emit('start bot');
  },
  stopBotEmit() {
    socket.emit('stop bot');
  }
});



socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});

socket.on('PAIRS_MESSAGE', (data) => {
  //console.log('PAIRS_MESSAGE', data);
  state.pairs = data;
  //messages = [...this.messages, data];
  // you can also do this.messages.push(data)
});
socket.on('ACCOUNT_MESSAGE', (data) => {
  //console.log('ACCOUNT_MESSAGE', data);
  state.account = data;
  //messages = [...this.messages, data];
  // you can also do this.messages.push(data)
});
socket.on('ORDER_PLACED', (data) => {
  //console.log('WAITING', data);
  state.snackbar = true;
  state.snackbar_msg = data;
});
socket.on('WAITING', (data) => {
  //console.log('WAITING', data);
  //state.snackbar = true;
  state.snackbar_msg = data;
  //messages = [...this.messages, data];
  // you can also do this.messages.push(data)
});