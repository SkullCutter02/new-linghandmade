import React from "react";
import { FieldErrors } from "react-hook-form";
import NumberInputControl from "../inputs/NumberInputControl";

interface Props {
  errors: FieldErrors<CouponFormInput>;
  register: any;
}

const CouponFormTemplate: React.FC<Props> = ({ errors, register }) => {
  return (
    <>
      <NumberInputControl
        name={"discount"}
        label={"Discount"}
        error={errors.discount}
        register={register}
      />
    </>
  );
};

export default CouponFormTemplate;
