export interface UserResponse {
  nickname: string;
  email: string;
  password: string;
}

export interface FileUploadResponse {
  message: string; // Предполагается, что ответ содержит URL файла.
}

export interface Course {
  id: number;
  title: string;
  price: number;
  photoPath: string;
  presentationPath?: string;
  description: string;
  // authorId: number;
}




