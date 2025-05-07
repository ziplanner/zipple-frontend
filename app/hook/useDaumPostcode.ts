import { useEffect, useState } from "react";

export const useDaumPostcode = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("daum-postcode-script");
    if (existingScript) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  return loaded;
};
