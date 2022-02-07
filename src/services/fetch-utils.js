import { client, checkError } from './client';

export const fetchUser = () => {
  const user = client.auth.user();
  return user;
};

export const fetchUserProfile = async (id) => {

  const profile = await client
    .from('profiles')
    .select()
    .match({ user_id: id })
    .single();

  return checkError(profile);
};
export const fetchProfileById = async (id) => {

  const profile = await client
    .from('profiles')
    .select()
    .match({ id });

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
    return profile;
  } else return null;
};

export const fetchAllUsers = async () => {
  const allUsers = await client
    .from('profiles')
    .select();
  if (allUsers) {
    return allUsers.data;
  } else return null;
};

const avatarBucket = async (user_id, media) => {
  const response = await client 
    .storage
    .from('avatars')
    .upload(`${user_id}/${media.name}`, media, {
      cacheControl: '3600',
      upsert: false
    });
  checkError(response);
};

export const uploadProfileAvatar = async (user_id, media) => {
  const response = await client
    .from('profiles')
    .update({ 
      avatar_url: `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/avatars/${user_id}/${media.name}`
    })
    .match({ user_id });

  await avatarBucket(user_id, media);

  
  return checkError(response);
};

const videoBucket = async (user_id, media) => {
  const response = await client 
    .storage
    .from('videos')
    .upload(`${user_id}/${media.name}`, media, {
      cacheControl: '3600',
      upsert: false
    });
  checkError(response);
};

export const uploadNewVideo = async (user_id, media) => {
  const user = await fetchUserProfile(user_id);
  const videos = user[0].video_uploads;

  const response = await client
    .from('profiles')
    .update({ 
      video_uploads: [...videos, `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/videos/${user_id}/${media.name}`]
    })
    .match({ user_id });

  await videoBucket(user_id, media);

  
  return checkError(response);
};

export const uploadCallOut = async (opponent_id, media) => {

  const user = fetchUser();

  const response = await client
    .from('battles')
    .insert([{ 
      challenger: user.id,
      opponent: opponent_id,
      call_out: `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/videos/${user.id}/${media.name}`,
    }])
    .match({ user_id: user.id });
    
  await videoBucket(user.id, media);

  return checkError(response);
};

export const fetchAllBattles = async () => {
  const response = await client
    .from('battles')
    .select();
  if (response) {
    return response.data;
  } else return null;
};

export const fetchMyBattles = async (user_id) => {
  const response = await client
    .from('battles')
    .select()
    .match({ opponent: user_id });
  return checkError(response);
};