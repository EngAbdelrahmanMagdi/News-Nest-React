export const getExtractedToken = (): string => {
    const token = localStorage.getItem("token") || "";
    return token.includes("|") ? token.split("|")[1] : token;
  };
  