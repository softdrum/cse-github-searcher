<template>
  <b-container class="my-4">
    <b-row class="mb-3">
      <b-col>
        <div class="d-flex align-center">
          <b-button
            class="mr-2"
            :disabled="loading"
            @click="$router.go(-1)"
            pill
          >
            <b-icon
              icon="arrow-left"
            >
            </b-icon>
            <span>Back</span>
          </b-button>
          <h3 class="mt-2">User profile</h3>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <message-box></message-box>
      </b-col>
    </b-row>
    <b-row
      v-if="!errorMessage"
      align-v="stretch"
    >
      <b-col
        cols="12"
        md="6"
        lg="4"
        class="mb-4 mb-md-0"
      >
       <UserCard :user="user" :loading="loading"/>
      </b-col>
      <b-col
        cols="12"
        md="6"
        lg="8"
        class="mb-2"
      >
        <b-row>
          <b-col>
            <h4>Pinned repositories</h4>
          </b-col>
        </b-row>
        <transition name="fade">
          <b-row
            v-if="user.repos.length"
            align-v="stretch"
          >
            <b-col
              v-for="repo in user.repos"
              :key="repo.id"
              cols="12"
              lg="6"
              class="mb-4"
            >
              <repo-info-card
                :title="repo.name"
                :sub-title="repo.id"
                :description="repo.description"
                :language="repo.language"
                :url="repo.url"
              >
              </repo-info-card>
            </b-col>
          </b-row>
        </transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RepoInfoCard from '@/components/cards/RepoInfoCard'
import UserCard from '@/components/cards/UserCard'
import MessageBox from '@/components/MessageBox';

import { mapActions, mapState } from 'vuex';

export default {
  name: 'UserInfo',
  components: {
    RepoInfoCard,
    UserCard,
    MessageBox,
  },
  computed: {
    ...mapState({
      errorMessage: state => state.message.errorMessage,
      loading: state => state.search.loading,
      user: state => state.user,
    })
  },
  async created() {
    const login = this.$route.params.login;
    await this.getUser(login)
  },
  beforeDestroy() {
    this.resetUser();
    this.resetMessages();
  },
  methods: {
    ...mapActions([
      'resetMessages',
      'resetUser',
      'getUser',
    ])
  }
}
</script>
