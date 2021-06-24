<template>
  <div class="page">
    <div class="page_container">
      <div class="user_cards">
        <div class="buttons">
          <button
            class="btn btn_long btn--submit"
            @click="goToCreateUser()"
            href="/addUser"
          >
            Add User
          </button>
          <button class="btn btn_long btn--gray" @click="goToMainPage()">
            Go Main
          </button>
        </div>
        <div v-for="(user, index) in users" :key="user.id">
          <button @click="getPosts(index)" class="user_card">
            <img :src="user.avatar" class="user_photo" />
            <div class="user_card_info">
              <div>
                <p class="user_card_name">{{ user.first_name }}</p>
                <!-- <p class="user_card_activity">{{ user.activity }}</p> -->
                <!-- <p class="user_card_salary">{{ user.salary }}</p> -->
                <p class="user_card_salary">{{ user.id }}</p>
              </div>
            </div>
            <div class="user_cart_buttons">
              <button
                class="btn btn_small btn--submit"
                @click="deleteUser(index)"
              >
                X
              </button>
              <button
                class="btn btn_small btn--submit"
                @click="goToEditUser(user.id)"
              >
                Edit
              </button>
            </div>
          </button>
        </div>
      </div>
      <!-- 979b85c7-1a2b-4b2e-b580-0d5cb4007b5e -->
      <div class="post_cards">
        <div v-for="post in posts" :key="post.id">
          <div class="post_card">
            <p class="post_card_title">{{ post.title }}</p>
            <p class="post_card_text">{{ post.content }}</p>
          </div>
        </div>
      </div>
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
const QueryGetAllUserPosts = gql`
  query ($id: Int!) {
    postsWhereAuthorId(id: $id) {
      title
      content
      authorId
    }
  }
`;
export default {
  data() {
    return {
      // Initialize your apollo data
      users: "",
      posts: [],
    };
  },
  apollo: {
    users: {
      query: QueryGetAllUsers,
    },
  },
  methods: {
    async getPosts(index) {
      const id = this.users[index].id;
      console.log(id);
      const res = await client
        .query({
          query: QueryGetAllUserPosts,
          variables: {
            id,
          },
        })
        .then((data) => {
          // Result
          console.log(data);
        });
      console.log(res);
      posts = res;
    },
    async deleteUser(index) {
      const userId = this.users[index].id;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation ($id: Int!) {
              deleteUser(id: $id) {
                id
                first_name
                avatar
              }
            }
          `,
          // Parameters
          variables: {
            id: userId,
          },
        })
        .then((data) => {
          // Result
          console.log(data);
        });
    },
    goToCreateUser() {
      this.$router.push(`/addUser`);
    },
    goToEditUser(id) {
      this.$router.push(`/editUser/?id=${id}`);
    },
    goToMainPage() {
      this.$router.push(`../`);
    },
  },
};
</script>


<style scoped>
/* MY STYLES */
*,
*::after,
*::before {
  margin: 0;
  padding: 0;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  background-color: #000;

  font-size: 14px;
}

button {
  outline: none;
  background: 0 0;
  border: none;
}
.page {
  width: 100vw;
  height: 100vh;

  background: #000;

  font-family: poppins, arial, helvetica neue, sans-serif;
}

.page_container {
  margin: 0 auto;
  max-width: 1080px;
  padding: 0px 15px;

  display: flex;
  flex-direction: row;
}

/* ========== User Cards ========== */
.user_cards {
  padding: 20px 10px;
  width: 35%;
}
.user_card {
  /* width: 350px; */
  width: 100%;
  padding: 15px 15px;
  margin-bottom: 10px;

  background-color: #fff;
  display: flex;
  flex-direction: row;

  position: relative;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;

  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);

  cursor: pointer;
}

.user_photo {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 15px;

  margin-right: 10px;
}

.user_card_info {
  display: flex;
  text-align: left;
}

.user_card_name {
  font-size: 20px;
  font-weight: 700;
  color: #525252;
}

.user_card_activity {
  font-size: 16px;
  color: #525252;
  margin-bottom: 10px;
}

.user_card_salary {
  font-size: 30px;
  font-weight: 600;
  color: #5c0000;
}

.user_cart_buttons {
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  flex-direction: column;
}

/* ========== POST Cards ======== */
.post_cards {
  padding: 20px 10px;
  width: 65%;
}

.post_card {
  width: 100%;
  padding: 15px 15px;
  margin-bottom: 10px;

  background-color: #fff;

  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;

  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
}

.post_card_title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}

.post_card_text {
  font-size: 15px;
  color: #292929;
}

/* Buttons */
.buttons {
  margin-bottom: 10px;
}
.btn {
  display: inline-block;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  color: #fff;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

  margin-bottom: 5px;
}

.btn_long {
  line-height: 40px;
  padding: 0 40px;
}
.btn--gray {
  background: #525252;
}
.btn--gray:hover {
  background: #292929;
}
.btn--submit {
  background: #c5245a;
}
.btn--submit:hover {
  background: #961c45;
}

.btn_small {
  width: 30px;
  height: 30px;

  font-weight: 600;
}
</style>