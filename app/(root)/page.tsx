import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Home = async () => {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  // --------------
  // const handleLogout = async () => {
  //   await logout(); // Assuming `logout` clears the session or token
  //   // Redirect user after logout
  //   window.location.href = "/sign-in"; // Or use `router.push("/login")` for Next.js
  // };
  // --------------

  return (
    <>
      {/* ----------------- */}
      {/* Header Section with User Profile */}
      {/* <header className="relative flex justify-between items-center p-6"> */}
      {/* <h1 className="text-2xl font-bold">Interview Dashboard</h1> */}

      {/* User Profile Section */}
      {/* <div className="absolute top-6 right-6 flex items-center gap-4">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              {user?.name?.[0]}
            </div>
          )} */}
      {/* <span>{user?.name}</span> */}
      {/* Logout Button */}
      {/* <Button
            onClick={handleLogout}
            className="btn-logout text-sm text-red-500"
          >
            Logout
          </Button>
        </div>
      </header> */}
      {/* ----------------- */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>
            Enhance Your Interview Skills with AI-Driven Practice and
            Personalized Feedback
          </h2>
          <p className="text-lg">
            Practice with Real Interview Questions and Receive Instant,
            Actionable Feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Launch Interview Simulation</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          height={400}
          width={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Interview Sessions</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interview yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Initiate Interview Simulation</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no new interview available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
