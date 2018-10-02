<template>
	<div id="app" class="container">
        
		<Colony v-if="grid==='colony'" v-on:showGrid="grid=$event"></Colony>
    <Rate v-else-if="grid==='rate'" v-on:showGrid="grid=$event"></Rate>

    <preloader v-if="preloader == true"></preloader>

		<div v-if="errors.length > 0" class="errorsPreview">
			<div class="errors">
				<h4>Ой, ошибочка вышла</h4>
				<p v-for="error in errors" :key="error">
					{{ error }}
				</p>
				<button v-on:click="errors = []">Скрыть</button>
			</div>
		</div>
	</div>
</template>

<script>
import Colony from "./components/Colony.vue";
import Rate from "./components/Rate.vue";

export default {
  components: {
    Colony,
    Rate
  },
  data() {
    return {
      grid: "colony",
      errors: [],
      preloader: false
    };
  },
  watch: {
    
  },
  methods: {
    
  }
};
</script>

<style>
  #app {
    margin-bottom: 35px;
  }
</style>
