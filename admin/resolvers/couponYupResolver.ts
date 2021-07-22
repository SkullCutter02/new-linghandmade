import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const couponYupResolver = yupResolver(
  yup.object().shape({
    discount: yup.number().min(0).max(100).required(),
    remarks: yup.string(),
  })
);

export default couponYupResolver;
