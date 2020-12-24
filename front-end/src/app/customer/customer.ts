import {User} from "../authentication/user";

export interface Customer {
  id?: number
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  streetNumber: number;
  postalCode: string;
  city: string
  country: string
  user: User
}
