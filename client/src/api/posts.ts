import axios from 'axios';

export async function getAllPosts() {
  return await axios.get('/api/posts');
}