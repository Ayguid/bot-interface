<template>
    <v-btn @click="connect()">Connect</v-btn>
    <v-btn @click="disconnect()">Disconnect</v-btn>
  </template>
  
  <script>
  import { socket } from "@/sockets";
  
  export default {
    name: "ConnectionManager",
  
    methods: {
      connect() {
        socket.connect();
      },
      disconnect() {
        socket.disconnect();
      }
    }
  }
  </script>