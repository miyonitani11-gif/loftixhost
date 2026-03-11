export const ADMIN_EMAILS = [
  "fightergamerofficial1@gmail.com",
  "ankitsarkarmukerjee123@gmail.com",
  "og.fighterplayz@gmail.com",
];

export const isAdmin = (email: string | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
