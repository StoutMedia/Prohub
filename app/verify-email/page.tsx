import { AuthShell } from '@/components/auth/AuthShell';
import { VerifyEmailForm } from '@/components/auth/AuthForms';

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const params = await searchParams;
  return <AuthShell eyebrow="Email verification"><VerifyEmailForm email={params.email} /></AuthShell>;
}
