import * as bcrypt from 'bcrypt';

export default async function(plainPassword: string, hashedPassword: string): Promise<boolean>{
  return bcrypt.compare(plainPassword, hashedPassword);
}