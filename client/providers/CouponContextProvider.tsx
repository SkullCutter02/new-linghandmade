import React, { createContext, useState } from "react";

import { ICouponContext } from "../types/couponContext";

export const CouponContext = createContext<ICouponContext>(null);

const CouponContextProvider: React.FC = ({ children }) => {
  const [coupon, setCoupon] = useState<Coupon>(null);

  return (
    <>
      <CouponContext.Provider value={{ coupon, setCoupon }}>{children}</CouponContext.Provider>
    </>
  );
};

export default CouponContextProvider;
