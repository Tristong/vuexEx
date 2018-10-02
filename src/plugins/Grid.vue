<template>
  <div>
    <table class="table table-striped  table-hover">
        <caption>
            <div class="row">
              <slot name="header">
                <div>
                    default header
                </div>
              </slot>
              <div class="col-md-2 col-md-offset-7">
                  <input class="custom-input" name="query" v-model="searchQuery" placeholder="Поиск">
              </div>
            </div>
        </caption>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column['id']" @click="sortBy(column['id'])" :class="{ active: sortKey == column['id'] }">
                    {{ column['name'] | capitalize }}
                    <span class="arrow" :class="sortOrders[column['id']] > 0 ? 'asc' : 'dsc'"></span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in filteredData" :key="entry['id']" @click="select(entry)">
                <td v-for="column in columns" :key="column['id']">
                    {{ entry[column['id']] }}
                </td>
            </tr>
        </tbody>
    </table>
    <slot name="footer">
      <div>
          default footer
      </div>
    </slot>
  </div> 
</template>

<script>
export default {
  data() {
    var sortOrders = {};
    this.columns.forEach(function(column) {
      sortOrders[column["id"]] = 1;
    });
    return {
      sortKey: "",
      searchQuery: "",
      sortOrders: sortOrders
    };
  },
  props: {
    columns: Array,
    data: Array
  },
  watch: {
    columns: function(columns) {
      var sortOrders = {};
      columns.forEach(column => {
        sortOrders[column["id"]] = 1;
      });
      this.sortOrders = sortOrders;
    }
  },
  computed: {
    filteredData: function() {
      var sortKey = this.sortKey;
      var searchQuery = this.searchQuery && this.searchQuery.toLowerCase();
      var sortOrders = this.sortOrders;
      var order = sortOrders[sortKey] || 1;
      var data = this.data;
      if (searchQuery) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchQuery) > -1
            );
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    select: function(record) {
      this.$emit('select', Object.assign({}, record));
    }
  }
};
</script>

<style>
</style>