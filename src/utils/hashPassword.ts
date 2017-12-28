import * as bcrypt from 'bcrypt';

export default async function(input: string): Promise<string>{
  return bcrypt.hash(input, 12);
}

