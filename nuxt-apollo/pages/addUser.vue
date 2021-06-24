<template>
  <div class="page">
    <div class="page_container">
      <div class="user_cards">
        <div class="card">
          <div class="card-body">
            <div class="card-top">
              <h2 class="card-title">Add User</h2>
              <a class="btn btn--gray" href="/">Go Main</a>
            </div>
            <div class="input-group">
              <label class="label">First Name</label>
              <input
                class="input"
                type="text"
                v-model="user.first_name"
                required
              />
            </div>
            <div class="input-group">
              <label class="label">Avatar Url</label>
              <input class="input" type="text" required v-model="user.avatar" />
            </div>
          </div>
          <button class="btn btn--submit" @click="addUser()">Add</button>
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
      first_name
      avatar
    }
  }
`;
export default {
  data() {
    return {
      user: {
        first_name: "",
        avatar: "",
      },
    };
  },
  methods: {
    async addUser() {
      if (this.user.first_name == "" || this.user.avatar == "") {
        console.log("Bad Inputs");
        return;
      } else {
        console.log(this.user);

        this.$apollo.mutate({
          // Query
          mutation: gql`
            mutation{
                createUser(first_name:"${this.user.first_name}", avatar:"${this.user.avatar}"){
                id
                first_name
                avatar
            }
        }
          `,
          optimisticResponse: {
            __typename: "Mutation",
            addTag: {
              __typename: "User",
              id: -1,
              label: this.user,
            },
          },
        });
        this.goToMainPage();
      }
    },
    goToMainPage() {
      this.$router.push(`..//`);
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
.page {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;

  font-family: poppins, arial, helvetica neue, sans-serif;
}

input {
  outline: none;
  margin: 0;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  width: 100%;
  /* font-size: 14px; */
  font-family: inherit;
}

button {
  outline: none;
  background: 0 0;
  border: none;
}
.page {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: poppins, arial, helvetica neue, sans-serif;
}

.card {
  width: 400px;

  padding: 25px;

  background-color: #fff;

  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;

  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
}

.card-top {
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  /* font-size: 24px; */
  color: #525252;
  font-weight: 400;
}

.input-group {
  margin-bottom: 22px;
}

.label {
  /* font-size: 16px; */
  color: #555;
  text-transform: capitalize;
  display: block;
  margin-bottom: 5px;
}

.input {
  line-height: 40px;
  background: #fafafa;
  -webkit-box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 0 20px;
  color: #666;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.input::-webkit-input-placeholder {
  color: #666;
}
.input:-moz-placeholder {
  color: #666;
  opacity: 1;
}
.input::-moz-placeholder {
  color: #666;
  opacity: 1;
}
.input:-ms-input-placeholder {
  color: #666;
}
.input:-ms-input-placeholder {
  color: #666;
}

.card-bottom {
  margin-top: 15px;
}

.btn {
  display: inline-block;
  line-height: 40px;
  padding: 0 40px;
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

@media (max-width: 767px) {
  .card {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>