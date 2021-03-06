<template>
  <b-container class="my-4">
    <b-row align-h="center" class="my-4">
      <b-col cols="12" class="text-center">
        <header>
          <h2>GitHub Search</h2>
          <search-bar
            @search="fetchUsers"
            v-model="searchQuery"
            :sort-options="sortOptions"
            :loading="loading"
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
        v-for="n in 8"
        :key="n"
        cols="6"
        xs="6"
        sm="6"
        md="4"
        lg="3"
        class="mb-4"
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
        <user-card-mini
          :id="user.id"
          :login="user.login"
          :avatarURL="user.avatarURL"
        >
        </user-card-mini>
      </b-col>
    </b-row>
    <b-row v-if="paginationProperties.isVisible">
      <b-col>
        <b-pagination
          @page-click="onPageChange"
          :value="currentPage"
          :total-rows="totalPages"
          :per-page="1"
          :size="paginationProperties.size"
          :align="paginationProperties.align"
          first-number
          last-number
          pills
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

import { isMobile, isIE } from 'mobile-device-detect';

export default {
  name: 'Main',
  title: 'Main',
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
      const { login, order, page } = this.query;
      this.searchQuery = {
        input: login,
        selectValue: order,
        page,
      }
      await this.fetchUsers(this.searchQuery);
    }
  },
  beforeDestroy() {
    this.resetMessages();
  },
  watch: {
    resultQuery:{
      deep: true,
      handler(query) {
        if (!isIE) {
          this.$router.replace({ query: query });
        }
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
    paginationProperties() {
      const { totalPages, loading, errorMessage } = this;
      let properties = {};
      properties.isVisible = totalPages > 1 && !loading && !errorMessage;
      properties.align = isMobile ? 'fill' : 'center';
      properties.size = isMobile ? 'md' : 'lg';
      return properties;
    },
  },
  data: () => ({
    sortOptions: [
      {
        value: 'desc',
        text: 'Desc',
      }, 
      {
        value: 'asc',
        text: 'Asc',
      }
    ]
  }),
  methods: {
    ...mapActions([
      'fetchUsers',
      'resetMessages',
    ]),
    async onPageChange(e, page) {
      e.preventDefault();
      await this.fetchUsers({ page });
    },
    checkQuery(query) {
      const { login, order, page } = query;
      return login && page;
    }
  }
}
</script>