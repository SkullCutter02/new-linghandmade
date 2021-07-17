import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const productYupResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().min(0).required(),
    discount: yup.number().min(0).max(100).required(),
    mainImgUrl: yup.string().url().required(),
    amtLeft: yup.number().min(0).required(),
    featured: yup.boolean().required(),
    remarks: yup.string(),
    categoryId: yup.string().required(),
  })
);

export default productYupResolver;
