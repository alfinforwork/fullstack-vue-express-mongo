<template>
  <div>
    <h1>Latest Posts</h1>
    <!-- CREATE POST HERE -->
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Create a post"
      />
      <button @click="createPost">Post</button>
    </div>
    <hr />
    <p class="err" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        {{
          `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`
        }}
        <p>{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostServices";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPost();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPost();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPost();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  width: 500px;
  padding: 15px;
  color: white;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  background: mediumseagreen;
}
.err {
  margin-left: auto;
  margin-right: auto;
  background: tomato;
  color: white;
  padding: 20px;
  width: 500px;
}
</style>
