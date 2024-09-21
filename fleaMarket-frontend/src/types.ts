
export interface Product {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    phoneNumber: string;
  };
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface ProductMutation {
  title: string;
  description: string;
  image: File |string;
  price: string;
  category: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}