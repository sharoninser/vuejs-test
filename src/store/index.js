import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import mocks from '@/mocks/getPayments';

const isDev = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },

    clearCache(state) {
      localStorage.removeItem('data');
      state.data = [];
      state.isCached = false;
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });

      const storageData = localStorage.getItem('data');

      if (storageData) {
        commit('setState', { data: JSON.parse(storageData), isCached: true, isLoading: false });
        return;
      }

      try {
        const { data } = isDev ? await mocks(params) : await api.getPayments(params);

        if (Array.isArray(data)) {
          localStorage.setItem('data', JSON.stringify(data));
          commit('setState', { data, isCached: true });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },

    async onClearCache({ commit, dispatch }) {
      commit('clearCache');
      dispatch('load');
    },
  },
});
