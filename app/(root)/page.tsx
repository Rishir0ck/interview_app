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

  return (
    <>
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
        ></Image>
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
            <p>You haven't taken any interview yet</p>
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
