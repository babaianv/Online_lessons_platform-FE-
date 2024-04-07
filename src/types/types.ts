export interface UserInfo {
  name: string; // Имя пользователя
  roles: string[]; // Роли пользователя
}

export interface RegisterResponse {
  id: number,
  nickname:string,
  email: string,
  password: string,
  roles: string[];
}

export interface RegisterResponse {
  id: number,
  nickname:string,
  email: string,
  password: string,
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface FileUploadResponse {
  message: string; // Предполагается, что ответ содержит URL файла.
}

export interface Course {
  id?: number;
  title: string;
  price: number;
  photoPath: string;
  presentationPath?: string;
  description: string;
}

export interface Enrollment {
  id: number;
  enrollmentDate: string;
  status: string;
  course: Course;
}




