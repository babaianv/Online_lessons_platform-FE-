export interface UserResponse {
  nickname: string;
  email: string;
  password: string;
}

export interface Course {
  id: number;
  title: string;
  photoPath: string;
  price: number;
  description: string;
  authorId: number;
}


