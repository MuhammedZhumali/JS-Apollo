<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-apollo</h1>
      <article
        v-for="user in users"
        :key="user.id"
        class="flex flex-col items-start"
      >
        <div class="text-sm text-gray-800">
          <p>Id: {{ user.id }}</p>
          <p>first_name: {{ user.first_name }}</p>
          <p>avatar: {{ user.avatar }}</p>
        </div>
      </article>
      <p>{{ user }}</p>
      <button @click="test()"></button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const QueryGetAllUsers = gql`
  query {
    users {
      id
      first_name
      avatar
    }
  }
`;

export default {
  data() {
    return {
      // Initialize your apollo data
      users: "",
    };
  },
  apollo: {
    users: {
      query: QueryGetAllUsers,
    },
  },
  methods: {
    test() {
      console.log(this.users);
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
