import Axios from 'axios'

export default {
    namespaced: true,
    state: {
        errors: [],
        selectedRate: {},
        rates: []
    },
    getters: {
      rates: state => {
          return state.rates
      },
      selectedRate: state => {
          return state.selectedRate
      },
    },
    mutations: {
      // SELECT
      loadRates (state) {
          Axios
        .get("index.php", {
              params: {
                  module: "ZMailInterface",
                  action: "Rate",
                  method: "select"
              }
          }) 
          .then(response => {
              state.rates = [];
              response.data.data.forEach(rat => {
              let rate = {
                id: rat.id,
                name: rat.name,
                page: rat.page,
                bw_image: rat.bw_image,
                color_image: rat.color_image,
                outgoing: rat.outgoing
              };
              state.rates.push(rate);
              });
          })
          .catch(e => {
            state.errors.push(e);
          })
      },
       // UPDATE
       updateRate (state, payload) {
            Axios
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Rate",
                    method: "update",
                    // Payload
                    id: payload.id,
                    name: payload.name,
                    page: payload.page,
                    outgoing: payload.outgoing,
                    bw_image: payload.bw_image,
                    color_image: payload.color_image
                }
            })
            .then(response => {
                let res = response.data;
                let rates = state.rates;
                rates.forEach(rat => {
                    if (rat.id == res.id) {
                        rat.name = res.name,
                        rat.page = res.page,
                        rat.outgoing = res.outgoing,
                        rat.bw_image = res.bw_image,
                        rat.color_image = res.color_image
                    }
                });
                state.rates = rates;
            })
            .catch(e => {
                state.errors.push(e);
            })
        },
        // CREATE
       createRate (state, payload) {
            Axios
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Rate",
                    method: "create",
                    // Payload
                    name: payload.name,
                    page: payload.page,
                    outgoing: payload.outgoing,
                    bw_image: payload.bw_image,
                    color_image: payload.color_image
                }
            })
            .then(response => {
                let rat = response.data;
                let rates = state.rates;
                let rate = {
                    id: rat.id,
                    name: rat.name,
                    page: rat.page,
                    bw_image: rat.bw_image,
                    color_image: rat.color_image,
                    outgoing: rat.outgoing
                  };
                  rates.push(rate);
                  state.rates = rates;
            })
            .catch(e => {
                state.errors.push(e);
            })
        },
    },
    actions: {

    }
}
