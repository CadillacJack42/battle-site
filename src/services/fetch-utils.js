import { client, checkError } from './client';

export const fetchUser = () => {
  const user = client.auth.user();
  return user;
};

export const fetchUserProfile = async (id) => {
  const profile = await client.from('profiles').select().match({ user_id: id }).single();

  return checkError(profile);
};

export const fetchProfileById = async (id) => {
  const profile = await client.from('profiles').select().match({ id });

  return checkError(profile);
};

export const fetchProfileByUserId = async (user_id) => {
  const profile = await client.from('profiles').select().match({ user_id }).single();

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
  const response = await client.from('profiles').insert([
    {
      username,
      email,
    },
  ]);
  return checkError(response);
};

export const uploadVideo = async ({ newVideo }) => {
  await client.from('videos').insert([
    {
      tags: [...newVideo.tags],
      name: newVideo.name ? newVideo.name : null,
      video: 'a crazy string.... FIGURE IT OUT',
    },
  ]);
};

export const getUserState = async (user) => {
  if (user) {
    const profile = await fetchUserProfile(user);
    return profile;
  } else return null;
};

export const fetchAllUsers = async () => {
  const allUsers = await client.from('profiles').select().order('created_at', { ascending: true });
  if (allUsers) {
    return allUsers.data;
  } else return null;
};

const avatarBucket = async (user_id, media) => {
  const response = await client.storage.from('avatars').upload(`${user_id}/${media.name}`, media, {
    cacheControl: '3600',
    upsert: false,
  });
  checkError(response);
};

export const uploadProfileAvatar = async (user_id, media) => {
  const response = await client
    .from('profiles')
    .update({
      avatar_url: `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/avatars/${user_id}/${media.name}`,
    })
    .match({ user_id });

  await avatarBucket(user_id, media);

  return checkError(response);
};

const videoBucket = async (user_id, media) => {
  const response = await client.storage.from('videos').upload(`${user_id}/${media.name}`, media, {
    cacheControl: '3600',
    upsert: false,
  });
  checkError(response);
};

export const uploadNewVideo = async (user_id, media) => {
  const user = await fetchUserProfile(user_id);
  const videos = user.video_uploads;

  const response = await client
    .from('profiles')
    .update({
      video_uploads: [
        ...videos,
        `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/videos/${user_id}/${media.name}`,
      ],
    })
    .match({ user_id });

  await videoBucket(user_id, media);

  return checkError(response);
};

export const uploadCallOut = async (opponent, media, currentUser) => {
  const response = await client
    .from('battles')
    .insert([
      {
        challenger: currentUser.user_id,
        challenger_username: currentUser.username,
        opponent: opponent.user_id,
        opponent_username: opponent.username,
        call_out: `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/videos/${currentUser.user_id}/${media.name}`,
      },
    ])
    .match({ user_id: currentUser.user_id });

  await videoBucket(currentUser.user_id, media);

  return checkError(response);
};

export const fetchAllBattles = async () => {
  const response = await client.from('battles').select();
  if (response) {
    return response.data;
  } else return null;
};

export const fetchMyBattles = async (user_id) => {
  const response = await client.from('battles').select().match({ opponent: user_id });
  return checkError(response);
};

export const fetchMyChallenges = async (user_id) => {
  const response = await client.from('battles').select().match({ challenger: user_id });
  return checkError(response);
};

export const respondToCallOut = async (user_id, id, media) => {
  const res = await client
    .from('battles')
    .update({
      response: `https://nqbvdgzoxvmdlnjovyqu.supabase.in/storage/v1/object/public/videos/${user_id}/${media.name}`,
    })
    .match({ id: id });
  await videoBucket(user_id, media);
  return checkError(res);
};

export const declineCallOut = async (id) => {
  const response = await client.from('battles').delete().match({ id });
  return checkError(response);
};

export const submitComment = async (battle, newComment) => {
  const response = await client
    .from('comments')
    .upsert({ comments: newComment, battle: battle.id }, { onConflict: 'battle' })
    .match({ battle: battle.id });

  return checkError(response);
};

export const fetchComments = async (id) => {
  const response = await client.from('comments').select().match({ battle: id });

  return checkError(response);
};

export const fetchRating = async (battle) => {
  const response = await client.from('ratings').select().match({ battle });
  return checkError(response);
};

export const updateRatings = async (id, updatedRating, contender) => {
  const response = await client
    .from('ratings')
    .upsert({ [`${contender}_rating`]: updatedRating, battle: id }, { onConflict: 'battle' })
    .match({ battle: id });
  return checkError(response);
};
