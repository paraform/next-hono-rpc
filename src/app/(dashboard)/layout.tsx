import { auth } from "@/server/auth";
import { UserMenu } from "./dashboard/components/user-menu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <header className="flex w-full justify-end p-2">
        {session?.user && (
          <UserMenu
            user={{
              image: session.user.image,
              name: session.user.name,
              email: session.user.email,
            }}
          />
        )}
      </header>
      {children}
    </>
  );
}
