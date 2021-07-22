interface Order extends Base {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  orderItems: string[];
  user: User;
}
