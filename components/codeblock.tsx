import hljs from "highlight.js";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  codeText: string;
  className?: string;
};
function CodeBlock({ codeText, className }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  useEffect(() => {
    console.log("hilightedddddd");
    // Apply highlighting when component mounts or updates
    if (codeRef.current) {
      console.log(codeRef.current);
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
    }
  }, [codeText]);
  return (
    <pre className={twMerge("block", className)}>
      <code ref={codeRef} className="language-cpp overflow-auto h-full">
        {codeText}
      </code>
    </pre>
  );
}

export default CodeBlock;
