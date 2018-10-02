import Axios from 'axios'

export default {
    namespaced: true,
    state: {
        errors:[],
        selectedColony: {},
        colonies: [],
        FSINRegions: [],
        FSINColonies: []
    },
    getters: {
        colonies: state => {
            return state.colonies
        },
        selectedColony: state => {
            return state.selectedColony
        },
        FSINRegions: state => {
            return state.FSINRegions
        },
        FSINColonies: state => {
            return state.FSINColonies
        }
    },
    mutations: {
        // SELECT
        loadColonies (state) {
            Axios
            // .get("http://192.168.71.143/index.php", {
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Colony",
                    method: "select"
                }
            })
            .then(response => {
                state.colonies = [];
                response.data.data.forEach(c => {
                let colony = {
                    id: c.id,
                    state: (c.state=='active' ? true : false),
                    can_scan: c.can_scan,
                    region_name: c.region.name,
                    short_name: c.short_name,
                    rate_id: c.rate.id,
                    rate_name: c.rate.name
                };
                state.colonies.push(colony);
                });
            })
            .catch(e => {
                state.errors.push(e);
            })
        },
        // UPDATE
        updateColony (state, payload) {
            Axios
            // .get("http://192.168.71.143/index.php", {
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Colony",
                    method: "update",
                    // Payload
                    id: payload.id,
                    state: (payload.state==true ? 'active' : 'disabled' ),
                    rate_id: payload.rate_id,
                    can_scan: payload.can_scan
                }
            })
            .then(response => {
                let res = response.data;
                let colonies = state.colonies;
                colonies.forEach(col => {
                    if (col.id == res.id) {
                        col.state = (res.state=='active' ? true : false),
                        col.rate_id = res.rate.id,
                        col.can_scan = res.can_scan,
                        col.rate_name = res.rate.name
                    }
                });
                state.colonies = colonies;
            })
            .catch(e => {
                state.errors.push(e);
            })
        },
        // CREATE
        createColony (state, payload) {
            Axios
            // .get("http://192.168.71.143/index.php", {
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Colony",
                    method: "create",
                    // Payload
                    name: payload.name,
                    short_name: payload.short_name,
                    external_id: payload.external_id,
                    region_id: payload.region_id,
                    state: (payload.state==true ? 'active' : 'disabled' ),
                    rate_id: payload.rate_id,
                    can_scan: payload.can_scan
                }
            })
            .then(response => {
                let c = response.data;
                let colonies = state.colonies;
                let colony = {
                    id: c.id,
                    state: (c.state=='active' ? true : false),
                    can_scan: c.can_scan,
                    region_name: c.region.name,
                    short_name: c.short_name,
                    rate_id: c.rate.id,
                    rate_name: c.rate.name
                };
                colonies.push(colony);
                state.colonies = colonies;
            })
            .catch(e => {
                state.errors.push(e);
            })
        },
        loadFSINRegions(state) {
            Axios
            // .get("http://192.168.71.143/index.php", {
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Fsin",
                    agent: "regions",
                }
            })
            .then(response => {
                state.FSINRegions = [];
                response.data.forEach(c => {
                let region = {
                    id: c.id,
                    region_id: c.region_id,
                    region_name: c.region_name
                };
                state.FSINRegions.push(region);
                });
            })
            .catch(e => {
                state.errors.push(e);
            })
        },
        loadFSINColonies(state, payload) {
            Axios
            // .get("http://192.168.71.143/index.php", {
            .get("index.php", {
                params: {
                    module: "ZMailInterface",
                    action: "Fsin",
                    agent: "colonies",
                    // Payload
                    region_id: payload.region_id
                }
            })
            .then(response => {
                state.FSINColonies = [];
                response.data.forEach(c => {
                let colony = {
                    external_id: c.external_id,
                    short_name: c.short_name,
                    name: c.name
                };
                state.FSINColonies.push(colony);
                });
            })
            .catch(e => {
                state.errors.push(e);
            })
        }
    },
    actions: {

    }
}
