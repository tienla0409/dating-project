import { GenderType, PassionType, UserPhotoType } from "@/types";

type UserAuthType = Partial<{
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string;
  email: string;
  gender: GenderType;
  age: number;
  avatar: string;
  photos: UserPhotoType[];
  passions: PassionType[];
  userLikes: string[];
  userDiscards: string[];
  userMatches: string[];
}>;

export default UserAuthType;
