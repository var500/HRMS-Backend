import { verify, hash } from 'argon2';

export const getHash = (password) => {
  return hash(password);
};

export const verifyHash = (hash, password) => {
  return verify(hash, password);
};
