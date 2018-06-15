/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  ws: null,
  wsReady: false,
  waitMsg: null,
  recMsg: ''
}

const getters = {
  getRecMsg: s => s.recMsg
}

const mutations = {
  WS_READY(state) {
    state.wsReady = true
  },
  SET_WS(state, ws) {
    state.ws = ws
  },
  NEW_MSG(state, msg) {
    state.waitMsg = msg
  },
  NEXT_MSG(state) {
    state.waitMsg = null
  },
  REC_MSG(state, msg) {
    state.recMsg = msg
  }
}

const actions = {
  setWS({ commit, state }, ws) {
    ws.onopen = () => {
      commit('WS_READY')
      if (state.waitMsg) {
        sendData(ws, state.waitMsg)
        commit('NEXT_MSG')
      }
      commit('REC_MSG', '{"type":"sensor","data":{"WebSocket":1}}')
    }
    ws.onmessage = e => {
      commit('REC_MSG', e.data)
    }
    commit('SET_WS', ws)
  },
  pushMsg({ commit, state }, msg) {
    if (typeof msg !== 'string')
      msg = JSON.stringify(msg)
    if (!state.ws || !state.wsReady) {
      commit('NEW_MSG', msg)
    } else {
      sendData(state.ws, msg)
    }
  }
}

/**
 * Use WebSocket to send data
 * @param {WebSocket} ws
 * @param {String} msg
 */
function sendData(ws, msg) {
  ws.send(msg)
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
