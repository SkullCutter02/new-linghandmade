import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import FormContainerTemplate from "../../../components/templates/FormContainerTemplate";
import CategoryFormTemplate from "../../../components/templates/CategoryFormTemplate";
import categoryYupResolver from "../../../resolvers/categoryYupResolver";
import HOST from "../../../constants/host";

const CreateCategoryPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    mode: "onBlur",
    resolver: categoryYupResolver,
  });

  const createCategory = async ({ name }: CategoryFormInput) => {
    setIsLoading(false);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/category`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (res.ok) await router.push("/dashboard/category");
      else {
        setIsLoading(false);
        errMsgRef.current.innerText = data.message;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      errMsgRef.current.innerText = err;
    }
  };

  return (
    <>
      <FormContainerTemplate
        handleSubmit={handleSubmit}
        submitFn={createCategory}
        heading={"Create Category"}
        buttonText={"Create"}
        isLoading={isLoading}
        errMsgRef={errMsgRef}
      >
        <CategoryFormTemplate errors={errors} register={register} />
      </FormContainerTemplate>
    </>
  );
};

export default CreateCategoryPage;
