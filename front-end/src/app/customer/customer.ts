import {User} from "../authentication/user";

export interface Customer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  streetNumber: number;
  postalCode: string;
  user: User
}
