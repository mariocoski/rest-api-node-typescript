import * as bcrypt from 'bcrypt';

const hashPassword = async function(input: string): Promise<string>{
  return bcrypt.hash(input, 10);
}

export {
  hashPassword
}
