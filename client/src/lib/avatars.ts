// Import all avatar images
import fox1 from "@/assets/avatars/fox1.png";
import fox2 from "@/assets/avatars/fox2.png";
import fox3 from "@/assets/avatars/fox3.png";
import giraffe1 from "@/assets/avatars/giraffe1.png";
import giraffe2 from "@/assets/avatars/giraffe2.png";
import giraffe3 from "@/assets/avatars/giraffe3.png";
import wolf1 from "@/assets/avatars/wolf1.png";
import wolf2 from "@/assets/avatars/wolf2.png";
import wolf3 from "@/assets/avatars/wolf3.png";

export interface AvatarOption {
  id: string;
  name: string;
  imageUrl: string;
  type: 'fox' | 'giraffe' | 'wolf';
}

// All available avatars
export const ALL_AVATARS: AvatarOption[] = [
  { id: 'fox1', name: 'Fox Explorer', imageUrl: fox1, type: 'fox' },
  { id: 'fox2', name: 'Fox Scholar', imageUrl: fox2, type: 'fox' },
  { id: 'fox3', name: 'Fox Master', imageUrl: fox3, type: 'fox' },
  { id: 'giraffe1', name: 'Giraffe Seeker', imageUrl: giraffe1, type: 'giraffe' },
  { id: 'giraffe2', name: 'Giraffe Sage', imageUrl: giraffe2, type: 'giraffe' },
  { id: 'giraffe3', name: 'Giraffe Legend', imageUrl: giraffe3, type: 'giraffe' },
  { id: 'wolf1', name: 'Wolf Hunter', imageUrl: wolf1, type: 'wolf' },
  { id: 'wolf2', name: 'Wolf Alpha', imageUrl: wolf2, type: 'wolf' },
  { id: 'wolf3', name: 'Wolf Elder', imageUrl: wolf3, type: 'wolf' },
];

// Avatars available for initial signup selection
export const SIGNUP_AVATARS: AvatarOption[] = [
  { id: 'fox1', name: 'Fox Explorer', imageUrl: fox1, type: 'fox' },
  { id: 'giraffe1', name: 'Giraffe Seeker', imageUrl: giraffe1, type: 'giraffe' },
  { id: 'wolf1', name: 'Wolf Hunter', imageUrl: wolf1, type: 'wolf' },
];

// Get avatar by ID
export const getAvatarById = (id: string): AvatarOption | undefined => {
  return ALL_AVATARS.find(avatar => avatar.id === id);
};

// Get random avatar
export const getRandomAvatar = (): AvatarOption => {
  const randomIndex = Math.floor(Math.random() * ALL_AVATARS.length);
  return ALL_AVATARS[randomIndex];
};

// Get avatar URL by ID, fallback to random if not found
export const getAvatarUrl = (id: string | null): string => {
  if (!id) return getRandomAvatar().imageUrl;
  const avatar = getAvatarById(id);
  return avatar ? avatar.imageUrl : getRandomAvatar().imageUrl;
};