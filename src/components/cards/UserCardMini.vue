<template>
  <router-link
    :to="`/user/${login}`"
    class="user-link"
  >
    <base-card>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <b-avatar
          :src="avatarURL"
          alt="avatar"
          size="4rem"
          class="mb-2"
        />
        <span v-text="login"></span>
        <small v-text="id" class="text-muted"></small>
      </div>
    </base-card>
  </router-link>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    login: {
      type: String,
      required: true,
      validator: (value) => {
        return /[a-zA-Z0-9]{1,3}/.test(value) && value;
      }
    },
    id: {
      type: Number,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    }
  }
}
</script>
<style scoped>
.user-link {
  text-decoration: none;
  color: #333
}
</style>