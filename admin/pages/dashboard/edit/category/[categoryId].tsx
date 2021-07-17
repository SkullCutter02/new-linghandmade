import React, { useState, useRef } from "react";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import getCategory from "../../../../queries/getCategory";
import FormContainerTemplate from "../../../../components/templates/FormContainerTemplate";
import categoryYupResolver from "../../../../resolvers/categoryYupResolver";
import CategoryFormTemplate from "../../../../components/templates/CategoryFormTemplate";
import HOST from "../../../../constants/host";

const EditCategoryPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { categoryId } = router.query;

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const { data: category } = useQuery<Category>(["category", categoryId], () =>
    getCategory(categoryId as string)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    mode: "onBlur",
    resolver: categoryYupResolver,
    defaultValues: {
      name: category.name,
    },
  });

  const editCategory = async ({ name }: CategoryFormInput) => {
    setIsLoading(false);
    errMsgRef.current.innerText = "";

    try {
      const res = await fetch(`${HOST}/category/${categoryId}`, {
        method: "PATCH",
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
        submitFn={editCategory}
        heading={"Update Category"}
        buttonText={"Update"}
        isLoading={isLoading}
        errMsgRef={errMsgRef}
      >
        <CategoryFormTemplate errors={errors} register={register} />
      </FormContainerTemplate>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const { categoryId } = ctx.query;

  await queryClient.prefetchQuery(["category", categoryId], () =>
    getCategory(categoryId as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EditCategoryPage;
