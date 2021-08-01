import React from "react";

import Policy from "../../components/ui/other/Policy";

const ShippingPolicyPage: React.FC = () => {
  return (
    <>
      <Policy path={"/shipping_policy.md"} />
    </>
  );
};

export default ShippingPolicyPage;
