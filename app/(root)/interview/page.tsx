import Agent from "@/components/Agent";
import { getCuurentUser } from "@/lib/actions/auth.action";

const page = async () => {
  const user = await getCuurentUser();

  return (
    <>
      <h3>Interview Generation</h3>

      <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </>
  );
};

export default page;
