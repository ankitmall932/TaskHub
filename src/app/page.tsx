import LandingPage from "@/components/LandingPage";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export default async function Home ()
{
  const session = await getSession();
  if ( session )
  {
    redirect( '/user/dashboard' );
  }
  return (
    <>
      <LandingPage />
    </>
  );
}
