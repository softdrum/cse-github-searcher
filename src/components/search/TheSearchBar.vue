<template>
  <div class="d-flex align-items-center">
    <b-form-input
      v-model="searchQuery.input"
      @keyup.enter="search"
      type="search"
      autofocus
      size="lg"
      class="mr-1 ttt"
    >
    </b-form-input>
    <b-form-select
      v-if="sortOptions.length"
      v-model="searchQuery.selectValue"
      :disabled="loading"
      :options="sortOptions"
      class="order-select"
      size="lg"
      @change="search"
    >
    </b-form-select>
    <b-button
      :disabled="loading"
      variant="primary"
      class="ml-1 search-button"
      size="lg"
      @click="search"
    >
      <b-icon
        :icon="btnIcon"
        :animation="btnAnimation"
      >
      </b-icon>
    </b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'SearchBar',
  props: {
    value: {
      type: Object,
      default: () => ({
        input: '',
        selectValue: '',
      })
    },
    sortOptions: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  created() {
    this.searchQuery.selectValue = this.sortOptions.length ? this.sortOptions[0].value : '';
  },
  computed: {
    btnIcon() {
      return this.loading ? 'arrow-clockwise' : 'search';
    },
    btnAnimation() {
      return this.loading ? 'spin' : '';
    },
    searchQuery: {
      get() { return this.value },
      set(newValue) { this.$emit('input', newValue) },
    },
  },
  methods: {
    search() {
      if (this.value.input) {
        this.$emit('search', this.value);
      }
    }
  }
}
</script>
<style scoped>
.order-select {
  width: auto !important;
}
</style>