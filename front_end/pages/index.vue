<template>
  <div class="">
    <div class="block">
      <Nuxt-Link
        to="/users/create"
        class="
          float-right
          bg-transparent
          hover:bg-blue-500
          text-blue-700
          font-semibold
          hover:text-white
          py-2
          px-4
          border border-blue-500
          hover:border-transparent
          rounded-full
          mr-1
        "
      >
        +
      </Nuxt-Link>
    </div>
    <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
      <tr class="text-left border-b-2 border-gray-300">
        <th class="px-4 py-3">Image</th>
        <th class="px-4 py-3">ID</th>
        <th class="px-4 py-3">Firstname</th>
        <th class="px-4 py-3">Age</th>
        <th class="px-4 py-3">Actions</th>
      </tr>

      <tr
        v-for="user in users"
        :key="user.id"
        class="bg-gray-100 border-b border-gray-200"
      >
        <td class="px-4 py-3">
          <img class="rounded-full h-32 w-32" :src="user.avatar" alt="" />
        </td>
        <td class="px-4 py-3">{{ user.id }}</td>
        <td class="px-4 py-3">{{ user.first_name }}</td>
        <td class="px-4 py-3">{{ user.age }}</td>
        <td class="px-4 py-3">
          <div class="block">
            <div
              class="
                inline
                px-4
                py-3
                bg-red-500
                hover:bg-red-700
                text-white
                rounded
              "
            >
              <button @click="deleteUser(user.id)">Delete</button>
            </div>
            <div
              class="
                inline
                px-4
                py-3
                bg-pink-500
                hover:bg-red-700
                text-white
                rounded
              "
            >
              <Nuxt-Link :to="'/users/update/' + user.id" class="">
                Update</Nuxt-Link
              >
            </div>
          </div>
        </td>
        <td class="px-4 py-3">
          <Nuxt-Link
            class="px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded"
            :to="'posts/' + user.id"
            >Messages
          </Nuxt-Link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  // data() {
  //   return {
  //     users: [],
  //   };
  // },
  // async mounted() {
  //   const { data, status } = await app.get("users");
  //   console.log(status);
  //   this.users = data;
  // },
  apollo: {
    users: gql`
      {
        users {
          id
          first_name
          age
          avatar
        }
      }
    `,
  },
  methods: {
    deleteUser(userId) {
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($id: Int!) {
            deleteUser(id: $id) {
              id
              first_name
              age
              avatar
            }
          }
        `,
        // Parameters
        variables: {
          id: userId,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
