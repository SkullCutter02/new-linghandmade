import { useState, useEffect } from "react";

export default function useMarkdownFile(path: string) {
  const [markdown, setMarkdown] = useState<string | null>(null);

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return { markdown };
}
