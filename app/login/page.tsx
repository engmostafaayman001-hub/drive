import Link from 'next/link';
import { AuthForm } from '@/components/forms/AuthForm';

export default function LoginPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-md space-y-3">
      <h2 className="text-2xl font-semibold">Login</h2>
      <AuthForm mode="login" />
      <p className="text-sm">
        Need an account? <Link href="/register" className="underline">Register</Link>
      </p>
    </div>
  );
}
