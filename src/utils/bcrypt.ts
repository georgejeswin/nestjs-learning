import * as bcrypt from 'bcrypt';

export const encodePassword = (rawPassword: string): string => {
  try {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const decodePassword = (rawPassword: string, hash: string): boolean => {
  try {
    return bcrypt.compareSync(rawPassword, hash);
  } catch (error) {
    console.log('Error decoding password: ', error);
  }
};
