import * as argon2 from 'argon2';

export async function hashPassword(rawPassword: string) {
  return await argon2.hash(rawPassword);
}

export async function comparePassword(
  rawPassword: string,
  hashedPassword: string,
) {
  return await argon2.verify(rawPassword, hashedPassword);
}
