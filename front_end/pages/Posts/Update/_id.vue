<template>
  <div class="w-full">
    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        w-full
        mb-6
        shadow-lg
        rounded-lg
        bg-white
      "
    >
      <div class="flex-auto p-5 lg:p-10">
        <h4 class="text-2xl mb-4 text-black font-semibold">Update post</h4>
        <div
          v-if="errors.length"
          class="
            bg-red-100
            border border-red-400
            text-red-700
            px-4
            py-3
            rounded
            relative
            mb-4
          "
          role="alert"
        >
          <ul>
            <li class="inline-block" v-for="error in errors" :key="error.id">
              {{ error }}&nbsp;
            </li>
          </ul>
        </div>
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            for="title"
            >Title</label
          ><input
            type="text"
            name="title"
            id="title"
            class="
              border-0
              px-3
              py-3
              rounded
              text-sm
              shadow
              w-full
              bg-gray-300
              placeholder-black
              text-gray-800
              outline-none
              focus:bg-gray-400
            "
            style="transition: all 0.15s ease 0s"
            v-model="post.title"
          />
        </div>
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            for="content"
            >Content</label
          ><textarea
            maxlength="300"
            name="content"
            id="content"
            rows="4"
            cols="80"
            class="
              border-0
              px-3
              py-3
              bg-gray-300
              placeholder-black
              text-gray-800
              rounded
              text-sm
              shadow
              focus:outline-none
              w-full
            "
            v-model="post.content"
          ></textarea>
        </div>
        <div class="text-center mt-6">
          <button
            class="
              bg-transparent
              hover:bg-blue-500
              text-blue-700
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-blue-500
              hover:border-transparent
              rounded
            "
            @click="checkPost()"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      post: "",
      errors: [],
    };
  },
  apollo: {
    post: {
      query: gql`
        query ($id: Int!) {
          post(id: $id) {
            id
            title
            content
            authorId
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
    checkPost() {
      this.errors = [];
      if (this.post.title == null) {
        this.errors.push("Wrong title!");
      }
      if (this.post.content == null) {
        this.errors.push("Wrong content!");
      }
      if (this.errors.length == 0) {
        this.updatePost();
      }
    },
    updatePost() {
      this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!, $title: String!, $content: String!) {
            updatePost(id: $id, title: $title, content: $content) {
              id
              title
              content
            }
          }
        `,
        variables: {
          id: this.post.id,
          title: this.post.title,
          content: this.post.content,
        },
      });
      this.$router.push("/posts/" + this.post.authorId);
    },
  },
};
</script>
