import axios from 'axios';

export async function login( formData ) {
  const reqBody = JSON.stringify(formData);

  const data = await axios.post('/api/users/auth', reqBody);

  return data;
}