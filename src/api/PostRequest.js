import api from "./posts";

class PostRequest {
  constructor() {}

  async getAllPosts() {
    const response = await api.get("/posts");
    return response;
  }

  async createPost(newPost) {
    const response = await api.post("/posts", newPost);
    return response;
  }

  async editPost(id, updatedPost) {
    const response = api.put(`/posts/${id}`, updatedPost);
    return response;
  }

  async deletePost(id) {
    await api.delete(`/posts/${id}`);
  }
}

const postRequest = new PostRequest();
export default postRequest;
