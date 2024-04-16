export interface UserResponse {
  nickname: string;
  email: string;
  password: string;
  token: string;
}

export interface UserInfo {
  name: string; 
  roles: string[]; 
  token: string;
  cartId: number
}

export interface RegisterResponse {
  id: number;
  nickname: string;
  email: string;
  password: string;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface FileUploadResponse {
  message: string;
}

export interface Course {
  id?: number;
  title: string;
  oldPrice?: string;
  price: number;
  photoPath: string;
  presentationPath?: string;
  description: string;
  counter?: number;
}

export interface Enrollment {
  id: number;
  enrollmentDate: string;
  status: string;
  course: Course;
}

export interface Cart {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courses: any[]; // Определите тип массива courses
}

export interface Lesson {
  id?: number;
  title: string;
  photoPath?: string;
  content: string;
  number: number;
}