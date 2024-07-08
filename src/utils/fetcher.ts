// export const fetcher = (input: RequestInfo, init?: RequestInit) =>
//   fetch(input, init).then((res) => res.json());

export const buildAPIUrl = (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return `${baseUrl}/${url}`;
};
