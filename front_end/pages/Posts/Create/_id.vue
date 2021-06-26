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
        <h4 class="text-2xl mb-4 text-black font-semibold">New post</h4>
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
            placeholder=" "
            style="transition: all 0.15s ease 0s"
            v-model="title"
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
            placeholder=""
            v-model="content"
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
            Create
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
      title: null,
      content: null,
      user_id: null,
      errors: [],
    };
  },
  async mounted() {
    this.user_id = Number(this.$route.params.id);
  },
  methods: {
    checkPost() {
      this.errors = [];
      if (this.title == null) {
        this.errors.push("Wrong title!");
      }
      if (this.content == null) {
        this.errors.push("Wrong content!");
      }
      if (this.errors.length == 0) {
        this.createPost();
      }
    },
    async createPost() {
      await this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($title: String!, $content: String!, $authorId: Int!) {
            createPost(title: $title, content: $content, authorId: $authorId) {
              id
              title
              content
              authorId
            }
          }
        `,
        // Parameters
        variables: {
          title: this.title,
          content: this.content,
          authorId: this.user_id,
        },
      });
      this.$router.push("/posts/" + this.user_id);
    },
  },
};
</script>
