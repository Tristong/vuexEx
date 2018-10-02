<template>
  <div>
    <grid :data="colonies" :columns="gridColumns"
          v-on:select="selectedColony = $event; showModal = true">
      <div slot="header">
        <div class="col-md-1">
          <button class="btn btn-default active" @click="grid=showGrid('colony')">Колонии</button>
        </div>
        <div class="col-md-1">
          <button class="btn btn-default" @click="grid=showGrid('rate')">Тарифы</button>
      </div>
      </div>
      <div class="row" slot="footer">
        <div class="col-xs-2 col-xs-offset-10">
          <button class="btn btn-default" @click="selectedColony = {}; showCreateModal = true">Добавить Колонию</button>
        </div>
      </div>
    </grid>
    
    <modal v-if="showModal" @close="showModal = false">
      <!-- you can use custom content here to overwrite default content -->
      <div slot="header">
        <h4>Редактирование колонии</h4>
      </div>
      <div slot="body">
        <div class="row">
          <span>Название учереждения</span>
          <div class="col-xs-12">
            <input type="text" class="custom-input" v-model="selectedColony.short_name" disabled>
          </div>
        </div>
        <div class="row">
          <span>Активность на сайте</span>
          <div class="col-xs-12">
            <input class="tgl tgl-ios" id="tgl-state" type="checkbox" v-model="selectedColony.state"/>
            <label class="tgl-btn" for="tgl-state"></label>
          </div>
        </div>
        <div class="row">
          <span>Бланк исходящего письма</span>
          <div class="col-xs-12">
            <input class="tgl tgl-ios" id="tgl" type="checkbox" v-model="selectedColony.can_scan"/>
            <label class="tgl-btn" for="tgl"></label>
          </div>
        </div>
        <div class="row">
          <span>Тариф</span>
          <div class="col-xs-12">
            <select v-model="selectedColony.rate_id" class="custom-select">
              <option v-for="rate in rates" :key="rate.id" v-bind:value="rate.id">
                {{ rate.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-default" @click="showModal=false">Отмена</button>
        <button class="btn btn-default" @click="updateColony(); showModal=false">Сохранить</button>
      </div>
    </modal>

    <modal v-if="showCreateModal" @close="showCreateModal = false">
      <!-- you can use custom content here to overwrite default content -->
      <div slot="header">
        <h4>Редактирование колонии</h4>
      </div>
      <div slot="body">
        <div class="row">
          <span>Регион</span>
          <div class="col-xs-12">
            <select v-model="selectedFSINRegion" class="custom-select">
              <option v-for="region in FSINRegions" :key="region.id" v-bind:value="region">
                {{ region.region_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <span>Колония</span>
          <div class="col-xs-12">
            <select v-model="selectedFSINColony" class="custom-select">
              <option v-for="colony in FSINColonies" :key="colony.external_id" v-bind:value="colony">
                {{ colony.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <span>Активность на сайте</span>
          <div class="col-xs-12">
            <input class="tgl tgl-ios" id="tgl-state" type="checkbox" v-model="selectedColony.state"/>
            <label class="tgl-btn" for="tgl-state"></label>
          </div>
        </div>
        <div class="row">
          <span>Бланк исходящего письма</span>
          <div class="col-xs-12">
            <input class="tgl tgl-ios" id="tgl" type="checkbox" v-model="selectedColony.can_scan"/>
            <label class="tgl-btn" for="tgl"></label>
          </div>
        </div>
        <div class="row">
          <span>Тариф</span>
          <div class="col-xs-12">
            <select v-model="selectedColony.rate_id" class="custom-select">
              <option v-for="rate in rates" :key="rate.id" v-bind:value="rate.id">
                {{ rate.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="showCreateModal=false">Отмена</button>
        <button @click="createColony(); showCreateModal=false">Добавить</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Modal
      showModal: false,
      showCreateModal: false,
      // Grid
      selectedColony: {},
      selectedFSINRegion: {},
      selectedFSINColony: {},
      gridColumns: [
        { id: "state", name: "Активность" },
        { id: "region_name", name: "Регион" },
        { id: "short_name", name: "Имя" },
        { id: "rate_name", name: "Тариф" },
        { id: "can_scan", name: "Исходящее письмо" }
      ]
    };
  },
  beforeMount: function () {
    this.$store.commit('Colony/loadColonies')
    this.$store.commit('Rate/loadRates')
    this.$store.commit('Colony/loadFSINRegions')
  },
  watch: {
    selectedFSINRegion: function (region) {
      this.$store.commit('Colony/loadFSINColonies', {
          region_id: region.region_id
        })
    }
  },
  computed: {
    colonies: function () {
      return this.$store.getters['Colony/colonies']
    },
    rates: function () {
      return this.$store.getters['Rate/rates']
    },
    FSINRegions: function () {
      return this.$store.getters['Colony/FSINRegions']
    },
    FSINColonies: function () {
      return this.$store.getters['Colony/FSINColonies']
    }
  },
  methods: {
    updateColony: function() {
      this.$store.commit('Colony/updateColony', {
        id: this.selectedColony.id,
        state: this.selectedColony.state,
        rate_id: this.selectedColony.rate_id,
        can_scan: this.selectedColony.can_scan,
        can_print: this.selectedColony.can_print,
        can_color_print: this.selectedColony.can_color_print
      })
    },
    createColony: function() {
      this.$store.commit('Colony/createColony', {
        name: this.selectedFSINColony.name,
        short_name: this.selectedFSINColony.short_name,
        external_id: this.selectedFSINColony.external_id,
        region_id: this.selectedFSINRegion.region_id,
        state: this.selectedColony.state,
        rate_id: this.selectedColony.rate_id,
        can_scan: this.selectedColony.can_scan,
      })
    },
    showGrid: function(payload) {
      // console.log(payload);
      this.$emit('showGrid', payload);
    }
  }
};
</script>

<style>
.custom-input {
  min-width: 185px;
  background: #fbfbfb;
  border-radius: 0.5em;
  padding: 5px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
  margin-bottom: 7px;
}

.custom-select {
  min-width: 185px;
  max-width: 185px;
  background-color: #fbfbfb;
  border-radius: 0.5em;
  padding: 5px;
  height: 32px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
  margin-bottom: 7px;
}

/* Flip Button */
.tgl {
  display: none;
}
.tgl,
.tgl:after,
.tgl:before,
.tgl *,
.tgl *:after,
.tgl *:before,
.tgl + .tgl-btn {
  box-sizing: border-box;
}
.tgl::-moz-selection,
.tgl:after::-moz-selection,
.tgl:before::-moz-selection,
.tgl *::-moz-selection,
.tgl *:after::-moz-selection,
.tgl *:before::-moz-selection,
.tgl + .tgl-btn::-moz-selection {
  background: none;
}
.tgl::selection,
.tgl:after::selection,
.tgl:before::selection,
.tgl *::selection,
.tgl *:after::selection,
.tgl *:before::selection,
.tgl + .tgl-btn::selection {
  background: none;
}
.tgl + .tgl-btn {
  outline: 0;
  display: inline-block;
  width: 4em;
  height: 2em;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.tgl + .tgl-btn:after,
.tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}
.tgl + .tgl-btn:after {
  left: 0;
}
.tgl + .tgl-btn:before {
  display: none;
}
.tgl:checked + .tgl-btn:after {
  left: 50%;
}

.tgl-ios + .tgl-btn {
  background: #fbfbfb;
  border-radius: 2em;
  padding: 2px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
}
.tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #fbfbfb;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 0 rgba(0, 0, 0, 0.08);
}
.tgl-ios + .tgl-btn:hover:after {
  will-change: padding;
}
.tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 2em #e8eae9;
}
.tgl-ios + .tgl-btn:active:after {
  padding-right: 0.8em;
}
.tgl-ios:checked + .tgl-btn {
  background: #86d993;
}
.tgl-ios:checked + .tgl-btn:active {
  box-shadow: none;
}
.tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.8em;
}
</style>
