import React from "react";
import marked from "marked";

import useMarkdownFile from "../../../hooks/useMarkdownFile";

interface Props {
  path: string;
}

const Policy: React.FC<Props> = ({ path }) => {
  const { markdown } = useMarkdownFile(path);

  return (
    <>
      <div
        className="policy"
        dangerouslySetInnerHTML={{ __html: markdown && marked(markdown, { gfm: true }) }}
      />
    </>
  );
};

export default Policy;
