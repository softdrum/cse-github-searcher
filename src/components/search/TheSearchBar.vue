<template>
  <div class="d-flex">
    <search-input
      @enter="search"
      v-model="searchQuery.login"
    >
    </search-input>
    <search-order-select
      v-if="isOrderSelectEnabled"
      v-model="searchQuery.order"
      :options="options.sortOptions"
      @changed="search"
    >
    </search-order-select>
    <search-button
      @click="search"
      :loading="loading"
    >
    </search-button>
  </div>
</template>

<script>
import SearchInput from '@/components/search/SearchInput';
import SearchOrderSelect from '@/components/search/SearchOrderSelect';
import SearchButton from '@/components/search/SearchButton';

import has from 'has';

export default {
  name: 'SearchBar',
  components: {
    SearchInput,
    SearchOrderSelect,
    SearchButton,
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    searchQuery: {
      get() { return this.value },
      set(newValue) { this.$emit('input', newValue) },
    },
    isOrderSelectEnabled() {
      return has(this.options, 'sortOptions');
    }
  },
  methods: {
    search() {
      this.$emit('search');
    }
  }
}
</script>