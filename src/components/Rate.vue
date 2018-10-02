<template>
  <div>
    <grid :data="rates" :columns="gridColumns"
          v-on:select="selectedRate = $event; showModal = true">
      <div slot="header">
        <div class="col-md-1">
          <button class="btn btn-default" @click="grid=showGrid('colony')">Колонии</button>
        </div>
        <div class="col-md-1">
          <button class="btn btn-default active" @click="grid=showGrid('rate')">Тарифы</button>
        </div>
      </div>
      <div class="row" slot="footer">
        <div class="col-xs-2 col-xs-offset-10">
          <button class="btn btn-default" @click="selectedRate = {}; showModal = true">Добавить тариф</button>
        </div>
      </div>
    </grid>
    
    <modal v-if="showModal" @close="showModal = false">
      <!-- you can use custom content here to overwrite default content -->
      <div slot="header">
        <h4>Редактирование тарифа</h4>
      </div>
      <div slot="body">
        <div class="row">
          <span class="test">Название тарифа</span>
          <div class="col-xs-12">
            <input type="text" class="custom-input" v-model="selectedRate.name">
          </div>
        </div>
        <div class="row">
          <span class="test">Входящее письмо /руб</span>
          <div class="col-xs-12">
            <input type="text" class="custom-input" v-model="selectedRate.page">
          </div>
        </div>
        <div class="row">
          <span class="test">Исходяшее письмо /руб</span>
          <div class="col-xs-12">
            <input type="text" class="custom-input" v-model="selectedRate.outgoing">
          </div>
        </div>
        <div class="row">
          <span class="test">Ч/Б изображение /руб</span>
          <div class="col-xs-12">
            <input type="text" class="custom-input" v-model="selectedRate.bw_image">
          </div>
        </div>
        <div class="row">
          <span class="test">Цветное изображение /руб</span>
          <div class="col-xs-12">
            <input type="text" class="custom-input" v-model="selectedRate.color_image">
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-default" @click="showModal=false">Отмена</button>
        <button class="btn btn-default" v-if="selectedRate.id" @click="saveRate(); showModal=false">Сохранить</button>
        <button class="btn btn-default" v-else @click="createRate(); showModal=false">Добавить</button>
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
      // Grid
      selectedRate: {},
      gridColumns: [
        { id: "name", name: "Имя" },
        { id: "page", name: "Входящее письмо /руб" },
        { id: "outgoing", name: "Исходяшее письмо /руб " },
        { id: "bw_image", name: "Ч/Б изображение /руб" },
        { id: "color_image", name: "Цветное изображение /руб" },
      ],
      gridData: []
    };
  },
  created() {
      
  },
  beforeMount: function () {
    this.$store.commit('Rate/loadRates')
  },
  computed: {
    rates: function () {
      return this.$store.getters['Rate/rates']
    }
  },
  methods: {
    saveRate: function() {
      this.$store.commit('Rate/updateRate', {
        id: this.selectedRate.id,
        name: this.selectedRate.name,
        page: this.selectedRate.page,
        outgoing: this.selectedRate.outgoing,
        bw_image: this.selectedRate.bw_image,
        color_image: this.selectedRate.color_image
      })
    },
    createRate: function() {
      this.$store.commit('Rate/createRate', {
        name: this.selectedRate.name,
        page: this.selectedRate.page,
        outgoing: this.selectedRate.outgoing,
        bw_image: this.selectedRate.bw_image,
        color_image: this.selectedRate.color_image
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
  background-color: #fbfbfb;
  border-radius: 0.5em;
  padding: 5px;
  height: 32px;
  transition: all 0.4s ease;
  border: 1px solid #e8eae9;
  margin-bottom: 7px;
}
</style>
