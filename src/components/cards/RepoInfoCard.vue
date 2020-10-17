<template>
  <base-card
    style="height: 100%"
  >
    <div class="d-flex flex-column justify-content-between" style="height: 100%">
      <div>
        <b-card-title>
          <b-link :href="url">
            <small>{{ title }}</small>
          </b-link>
        </b-card-title>
        <b-card-text>{{ description }}</b-card-text>
      </div>
      <b-card-text class="small text-muted">{{ language }}</b-card-text>
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'RepoInfoCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    }
  }
}
</script>