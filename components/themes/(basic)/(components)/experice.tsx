"use client";

import Link from "next/link";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Experience } from "@prisma/client";
import ExperienceComponent from "@/components/experience-component";

type Props = {
  experiences: Experience[];
};

const ExperienceBasic = ({ experiences }: Props) => {
  return (
    <div className="h-screen my-container sticky flex flex-col top-[120px] z-10 bg-white  border rounded-3xl">
      <Link
        href={"#experience"}
        className="text-4xl font-bold block text-center p-1 py-8 "
      >
        {" "}
        Experience
      </Link>

      <div className="mt-10 max-h-[600px] overflow-y-auto myScroll pb-10">
        <Timeline position="alternate">
          {experiences.map((experience) => (
            <TimelineItem key={experience.id}>
              <TimelineOppositeContent color="text.secondary">
                {experience.startDate?.toLocaleDateString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <ExperienceComponent
                preview={true}
                  key={experience.id}
                  experience={experience}
                />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div className="h-[300px]"></div>
    </div>
  );
};

export default ExperienceBasic;
