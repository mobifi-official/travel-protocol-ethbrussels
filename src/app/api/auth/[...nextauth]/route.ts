import { authOptions } from '@/src/lib/auth/authConfig';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };