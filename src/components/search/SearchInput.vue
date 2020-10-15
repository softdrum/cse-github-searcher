<template>
  <b-input
    v-model="searchInput"
    @keyup.enter="$emit('enter')"
    class="mr-1"
    size="lg"
  >
  </b-input>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    value: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.searchInput = this.value;
  },
  data: () => ({
    searchInput: '',
  }),
  watch: {
    searchInput(inputValue) {
      this.$emit('input', this.searchInput);
    },
  },
}
</script>