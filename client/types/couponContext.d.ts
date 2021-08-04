import { Dispatch, SetStateAction } from "react";

import { Coupon } from "./coupon";

interface ICouponContext {
  coupon: Coupon;
  setCoupon: Dispatch<SetStateAction<Coupon>>;
}
