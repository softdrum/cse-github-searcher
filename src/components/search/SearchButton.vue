<template>
  <b-button
    variant="primary"
    size="lg"
    class="ml-1"
    :disabled="loading"
    @click="$emit('click')"
  >
    <b-icon
      :icon="loading ? 'arrow-clockwise' : 'search'"
      :animation="loading ? 'spin' : ''"
    >
    </b-icon>
  </b-button>
</template>

<script>
export default {
  name: 'SearchButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
