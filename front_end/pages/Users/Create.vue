<template>
  <div class="">
    <div class="flex flex-wrap justify-center mt-20">
      <div class="w-full max-w-sm">
        <label
          class="block text-indigo-500 text-4xl font-bold text-center mb-6"
        >
          Create user
        </label>
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
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="first_name"
            >
              First Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-gray-200
                appearance-none
                border-2 border-gray-200
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none
                focus:bg-white
                focus:border-purple-500
              "
              id="first_name"
              v-model="first_name"
              type="text"
              placeholder="Example"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="age"
            >
              Age
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-gray-200
                appearance-none
                border-2 border-gray-200
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none
                focus:bg-white
                focus:border-purple-500
              "
              id="age"
              v-model="age"
              type="text"
              placeholder="20"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="image_path"
            >
              Image path
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="
                bg-gray-200
                appearance-none
                border-2 border-gray-200
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none
                focus:bg-white
                focus:border-purple-500
              "
              id="image_path"
              v-model="image_path"
              type="text"
              placeholder="https://nerdist.com/wp-content/uploads/2020/07/maxresdefault.jpg"
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              class="
                shadow
                bg-purple-500
                hover:bg-purple-400
                focus:shadow-outline
                focus:outline-none
                text-white
                font-bold
                py-2
                px-4
                rounded
              "
              @click="checkUser()"
            >
              Create
            </button>
          </div>
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
      errors: [],
      first_name: null,
      age: null,
      image_path: null,
    };
  },
  methods: {
    createUser() {
      this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation ($first_name: String!, $age: Int!,$avatar: String!) {
            createUser(first_name: $first_name, age: $age,avatar: $avatar) {
              id
              first_name
              age
              avatar
            }
          }
        `,
        // Parameters
        variables: {
          first_name: this.first_name,
          age: this.age,
          avatar: this.image_path,
        },
      });
      this.$router.push("/");
    },
    checkUser() {
      this.errors = [];
      if (this.first_name == null) {
        this.errors.push("Wrong first name!");
      }
      if (this.age == null) {
        this.errors.push("Wrong age!");
      }
      if (this.image_path == null) {
        this.errors.push("Wrong image path!");
      }
      if (this.errors.length == 0) {
        this.createUser();
      }
    },
  },
};
</script>