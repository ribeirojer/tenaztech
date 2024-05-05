export interface IUser {
  activationdate?: Date;
  passwordresettoken?: string | null;
  activationDate?: Date;
  emailVerified?: boolean;
  emailverified?: boolean;
  _id?: any;
  confirmationtoken?: string | null;
  passwordresetexpiresat?: Date | null;
  passwordResetExpiresAt?: Date | null;
  passwordResetToken?: string | null;
  id?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  billingInfo?: {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  };
  orders?: IOrder[];
}

export interface IOrder {
  id: number;
  date: Date;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  paymentInfo: {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  };
}

export interface IAddress {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}
