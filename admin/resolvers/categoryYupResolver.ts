import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const categoryYupResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required(),
  })
);

export default categoryYupResolver;
