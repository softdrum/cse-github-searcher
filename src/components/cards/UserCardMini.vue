<template>
  <router-link
    :to="`/user/${data.login}`"
    style="text-decoration: none; color: #333"
  >
    <base-card>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <b-avatar
          class="mb-2"
          :src="data.avatarURL"
          alt="avatar"
          size="4rem"
        />
        <span v-text="data.login"></span>
        <small
          v-text="data.id"
          class="text-muted"
        >
        </small>
      </div>
    </base-card>
  </router-link>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    data: {
      type: Object,
      required: true,
    }
  }
}
</script>