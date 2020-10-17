<template>
  <section class="text-center">
    <div
      class="error-box text-danger"
      v-if="errorMessage"
    >
      <b-icon
        icon="exclamation-triangle-fill"
        font-scale="8"
        class="mb-3"
      >
      </b-icon>
      <h1>{{ errorMessage }}</h1>
    </div>
    <div v-else class="info-box">
      <h5>{{ infoMessage }}</h5>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MessageBox',
  computed: {
    ...mapState({
      errorMessage: state => state.message.errorMessage,
      infoMessage: state => state.message.infoMessage,
    })
  }
}
</script>