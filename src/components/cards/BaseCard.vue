<template>
  <b-card class="base-card">
   <slot />
 </b-card>
</template>

<script>

export default {
  name: 'BaseCard',
}
</script>

<style scoped>
.base-card {
  border-radius: 10px;
}
</style>