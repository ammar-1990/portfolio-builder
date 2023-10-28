import EmptyComponent from "@/components/empty-component";
import ResumeComponent from "@/components/resume-component";
import db from "@/lib/prisma";
import React from "react";

type Props = { params: { portfolioId: string } };

const ResumePage = async ({ params }: Props) => {
  const portfolio = await db.portfolio.findUnique({
    where: {
      id: params.portfolioId,
    },
    include: {
      profile: true,
      experiences: true,
      projects:true
    },
  });

  if (!portfolio)
    return (
      <div>
        <EmptyComponent title="No portfolio found" />
      </div>
    );

  return (
    <div className="h-full pb-20">
      <h2 className="text-3xl font-bold">Resume</h2>
      <ResumeComponent portfolio={portfolio} />
    </div>
  );
};

export default ResumePage;
