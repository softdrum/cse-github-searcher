<template>
  <b-form-select
    v-model="localValue"
    :options="options"
    class="order-select"
    size="lg"
  >
  </b-form-select>
</template>

<script>
export default {
  name: 'OrderSelect',
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localValue: {
      get() { return this.value },
      set(newLocalValue) {
        if (newLocalValue && newLocalValue !== this.value) {
          this.$emit('input', newLocalValue);
          this.$emit('changed');
        }
      },
    }
  },
}
</script>

<style scoped>
.order-select {
  width: 100px !important;
}
</style>