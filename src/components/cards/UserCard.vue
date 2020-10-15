<template>
  <base-card
    class="d-flex flex-column justify-content-center align-items-center p-2"
  >
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <user-card-skeleton></user-card-skeleton>
      </template>
      <picture class="d-flex justify-content-center mb-4">
        <img
          :src="user.avatarURL"
          class="user-avatar"
        />
      </picture>
      <section class="user-info">
        <div class="mb-2">
          <h2 v-text="user.name"></h2>
          <h5 v-text="user.login"></h5>
        </div>
        <div class="d-flex mb-3">
          <b-icon icon="people" class=" mr-1"></b-icon>
          <h6 class="mr-2">
            <strong v-text="user.followers"></strong>
            followers
          </h6>
          <h6>
            <strong v-text="user.following"></strong>
            following
          </h6>
        </div>
        <b-list-group class="mb-2">
          <UserInfoListItem
            v-for="(item, i) in userInfo"
            :key="i"
            :text="item.text"
            :icon="item.icon"
          />
        </b-list-group>
        <b-card-text v-if="user.bio" v-text="user.bio"></b-card-text>
      </section>
    </b-skeleton-wrapper>
  </base-card>
</template>

<script>
import UserInfoListItem from '@/components/lists/UserInfoListItem';
import UserCardSkeleton from '@/components/skeletons/UserCardSkeleton';

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    UserCardSkeleton,
    UserInfoListItem
  },
  computed: {
    userInfo() {
      return Object.keys(this.user.info)
        .filter((key) => this.user.info[key])
        .map(filteredKey => {
          const text = this.user.info[filteredKey];
          const icon = this.setUserInfoItemIcon(filteredKey);
          return {
            text, 
            icon,
          }
        });
    }
  },
  methods: {
    setUserInfoItemIcon(key) {
      switch (key) {
        case 'company': {
          return 'briefcase';
        }
        case 'location': {
          return 'geo-alt';
        }
        case 'email': {
          return 'mailbox';
        }
        case 'blog': {
          return 'pencil-square';
        }
        default: {
          return '';
        }
      }
    }
  }
}
</script>

<style scoped>
.user-avatar {
  width: 80%;
  border-radius: 50%;
}
</style>