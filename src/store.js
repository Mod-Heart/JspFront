import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    type: '',
    id: ''
  },

  mutations: {
    setname(state,step){
      this.state.name=step;
    },
    settype(state,step){
      this.state.type=step;
    },
    setid(state,step){
      this.state.id=step;
    }
  },

  actions: {

  }
})
