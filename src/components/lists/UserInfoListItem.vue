<template>
  <li class="d-flex align-center">
    <div class="mr-1">
      <b-icon :icon="icon"></b-icon>
    </div>
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