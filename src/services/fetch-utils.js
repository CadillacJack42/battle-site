import { client, checkError } from './client';

export const fetchUser = async () => {
  return client.auth.session();
};

export const checkAuth = async () => {
  const user = await fetchUser();

  if (!user) {
    location.replace('../');
  }
};

export const redirectIfLoggedIn = async () => {
  if (await fetchUser()) {
    location.replace('./profile');
  }
};

export const signUpUser = async (email, password) => {
  const response = await client.auth.signUp({ email, password });

  return response.user;
};

export const signInUser = async (email, password) => {
  const response = await client.auth.signIn({ email, password });

  return response.user;
};

export const logout = async () => {
  await client.auth.signOut();

  return location.replace('../');
};

export const createProfile = async ({ user }) => {
  const response = await client
    .from('profile')
    .insert([
      {
        username: user.username,
        email: user.email,
      }
    ]);
  return checkError(response);
};

export const uploadVideo = async ({ newVideo }) => {
  const response = await client
    .from('videos')
    .insert([
      {
        tags: [...newVideo.tags],
        name: newVideo.name ? newVideo.name : null,
        video: 'a crazy string.... FIGURE IT OUT'
      }
    ]);
};


