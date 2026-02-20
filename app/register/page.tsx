import Link from 'next/link';
import { AuthForm } from '@/components/forms/AuthForm';

export default function RegisterPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-md space-y-3">
      <h2 className="text-2xl font-semibold">Register</h2>
      <AuthForm mode="register" />
      <p className="text-sm">
        Have an account? <Link href="/login" className="underline">Login</Link>
      </p>
    </div>
  );
}
