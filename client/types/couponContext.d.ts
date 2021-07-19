import { Dispatch, SetStateAction } from "react";

interface ICouponContext {
  coupon: Coupon;
  setCoupon: Dispatch<SetStateAction<Coupon>>;
}
