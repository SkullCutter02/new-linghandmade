import React from "react";
import { FieldErrors } from "react-hook-form";
import TextInputControl from "../inputs/TextInputControl";

interface Props {
  errors: FieldErrors<CategoryFormInput>;
  register: any;
}

const CategoryFormTemplate: React.FC<Props> = ({ errors, register }) => {
  return (
    <>
      <TextInputControl name={"name"} label={"Name"} error={errors.name} register={register} />
    </>
  );
};

export default CategoryFormTemplate;
