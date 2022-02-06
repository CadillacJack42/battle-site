import { client, checkError } from './client';

export const fetchUser = () => {
  const user = client.auth.user();
  return user;
};

export const fetchUserProfile = async (id) => {

  const profile = await client
    .from('profiles')
    .select()
    .match({ user_id: id });

  return checkError(profile);
};

export const checkAuth = () => {
  const user = fetchUser();

  if (!user) {
    location.replace('./auth');
  }
};

export const redirectIfLoggedIn = () => {
  if (fetchUser()) {
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
  return location.replace('./auth');
};

export const createProfile = async (username, email) => {
  const response = await client
    .from('profiles')
    .insert([
      {
        username,
        email,
      }
    ]);
  return checkError(response);
};

export const uploadVideo = async ({ newVideo }) => {
  await client
    .from('videos')
    .insert([
      {
        tags: [...newVideo.tags],
        name: newVideo.name ? newVideo.name : null,
        video: 'a crazy string.... FIGURE IT OUT'
      }
    ]);
};

export const getUserState = async () => {
  const user = fetchUser();
  if (user) {
    const profile = await fetchUserProfile(user.id);
    return profile[0];
  } else return null;
};

export const fetchAllUsers = async () => {
  const allUsers = await client
    .from('profiles')
    .select();
  
  console.log(allUsers.data);
  if (allUsers) {
    return allUsers.data;
  } else return null;
};

