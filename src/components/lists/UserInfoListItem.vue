<template>
  <li class="d-flex">
    <b-icon :icon="icon" class="mr-1"></b-icon>
    <h6 v-text="text"></h6>
  </li> 
</template>

<script>
export default {
  name: 'UserINfoListItem',
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  }
}
</script>