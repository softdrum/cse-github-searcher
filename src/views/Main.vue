<template>
  <b-container class="my-4">
    <b-row align-h="center" class="my-4">
      <b-col cols="12" class="text-center">
        <header>
          <h2>GitHub Search</h2>
          <search-bar
            v-model="searchQuery"
            :options="options"
            :loading="loading"
            @search="fetchUsers"
          >
          </search-bar>
        </header>
      </b-col>
    </b-row>
    <b-row class="text-center mb-2">
      <b-col>
        <message-box></message-box>
      </b-col>
    </b-row>
    <b-row v-if="loading">
       <b-col
        cols="6"
        xs="6"
        sm="6"
        md="4"
        lg="3"
        class="mb-4"
        v-for="n in 8"
        :key="n"
      >
        <user-card-mini-skeleton></user-card-mini-skeleton>
      </b-col>
    </b-row>
    <b-row v-else-if="!errorMessage">
      <b-col
        v-for="user in users"
        :key="user.id"
        cols="6"
        xs="6"
        sm="6"
        md="4"
        lg="3"
        class="mb-4"
      >
        <user-card-mini :data="user"></user-card-mini>
      </b-col>
    </b-row>
    <b-row v-if="totalPages > 1 && !loading && !errorMessage">
      <b-col>
        <b-pagination
          size="lg"
          align="center"
          :value="currentPage"
          :total-rows="totalPages"
          :per-page="1"
          first-number
          last-number
          pills
          @page-click="onPageChange"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserCardMini from '@/components/cards/UserCardMini';
import UserCardMiniSkeleton from '@/components/skeletons/UserCardMiniSkeleton';
import SearchBar from '@/components/search/TheSearchBar';
import MessageBox from '@/components/MessageBox';

import { mapActions, mapGetters, mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Main',
  components: {
    UserCardMini,
    UserCardMiniSkeleton,
    SearchBar,
    MessageBox,
  },
  props: {
    query: Object,
  },
  async created() {
    const isQueryValid = this.checkQuery(this.query);
    if (isQueryValid) {
      this.setSearchQuery(this.query);
      await this.fetchUsers();
    }
  },
  beforeDestroy() {
    this.resetMessages();
  },
  watch: {
    resultQuery:{
      deep: true,
      handler(query) {
        this.$router.replace({ query: query });
      }
    }
  },
  computed: {
    ...mapState({
      errorMessage: state => state.message.errorMessage,
      searchResult: state => state.search.searchResult,
      loading: state => state.search.loading,
    }),
    ...mapGetters([
      'totalPages',
      'currentPage',
    ]),
    ...mapFields(['searchQuery']),
    users() { return this.searchResult.data; },
    resultQuery() { return this.searchResult.query },
  },
  data: () => ({
    options: {
      sortOptions: [
        {
          value: 'desc',
          text: 'Desc',
          selected: true
        }, 
        {
          value: 'asc',
          text: 'Asc',
        }
      ]
    }
  }),
  methods: {
    ...mapActions([
      'fetchUsers',
      'setSearchQuery',
      'resetMessages',
    ]),
    async onPageChange(e, page) {
      e.preventDefault();
      this.setSearchQuery({ page });
      await this.fetchUsers();
    },
    checkQuery(query) {
      const { login, order, page } = query;
      return login && order && page;
    }
  }
}
</script>