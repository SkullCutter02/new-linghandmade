import React from "react";
import { FieldErrors } from "react-hook-form";
import NumberInputControl from "../inputs/NumberInputControl";
import TextInputControl from "../inputs/TextInputControl";

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
      <TextInputControl
        name={"remarks"}
        label={"Remarks"}
        error={errors.remarks}
        register={register}
        isRequired={false}
      />
    </>
  );
};

export default CouponFormTemplate;
