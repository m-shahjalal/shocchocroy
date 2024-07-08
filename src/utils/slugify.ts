export const slugify = (str: string, joiner = '-' as '-' | '_') => {
  return str.toLowerCase().trim().split(' ').join(joiner);
};
