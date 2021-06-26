<template>
  <div class="w-full">
    <div v-for="post in user.posts" :key="post.id" class="w-full">
      <div
        class="
          border-r border-l border-b border-t border-gray-400
          bg-white
          p-4
          flex flex-col
        "
      >
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">
            {{ post.title }}
          </div>
          <p class="text-gray-700">
            {{ post.content }}
          </p>
        </div>
        <div class="flex items-center">
          <img
            class="w-10 h-10 rounded-full mr-4"
            :src="user.avatar"
            alt="Avatar of Writer"
          />
          <div class="text-sm">
            <p class="text-gray-900 leading-none">{{ user.first_name }}</p>
            <p class="text-gray-600">{{ user.salary }}</p>
          </div>
        </div>
        <div class="block">
          <div
            class="
              inline
              ml-1
              float-right
              w-20
              bg-transparent
              hover:bg-green-500
              text-green-700
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-green-500
              hover:border-transparent
              rounded
            "
          >
            <Nuxt-Link class="" :to="'/posts/update/' + post.id">
              Update
            </Nuxt-Link>
          </div>
          <div
            class="
              inline
              float-right
              w-20
              bg-transparent
              hover:bg-red-500
              text-red-700
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-red-500
              hover:border-transparent
              rounded
            "
          >
            <button class="" @click="deletePost(post.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <Nuxt-Link
      :to="'/posts/create/' + user.id"
      class="
        mt-4
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
        mr-2
      "
      >Add post</Nuxt-Link
    >
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  name: "Posts",
  data() {
    return {
      user: "",
    };
  },
  apollo: {
    user: {
      query: gql`
        query ($id: Int!) {
          user(id: $id) {
            id
            first_name
            avatar
            posts {
              id
              title
              content
            }
          }
        }
      `,
      variables() {
        return {
          id: Number(this.$route.params.id),
        };
      },
    },
  },

  methods: {
    deletePost(postId) {
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($id: Int!) {
            deletePost(id: $id) {
              id
              title
              content
            }
          }
        `,
        // Parameters
        variables: {
          id: postId,
        },
      });
    },
  },
};
</script>