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
import { cn } from "@/lib/utils";

type Props = {
  experiences: Experience[];
  preview?:boolean
  noLink?:boolean
};

const ExperienceBasic = ({ experiences,preview ,noLink}: Props) => {
  return (
    <section className={cn("h-screen my-container sticky flex flex-col top-[165px] sm:top-[120px] z-10 bg-gray-300/50 backdrop-blur-lg   border rounded-3xl",!experiences.length && 'hidden')}>
      <Link
        href={"#experience"}
        className="text-4xl font-bold block text-center p-1 py-8 "
        onClick={(e)=>{
          noLink && e.preventDefault()
        }} 
      >
        
        {" "}
        Experience
      </Link>

      <div className="mt-10 max-h-[600px] overflow-y-auto myScroll pb-10">
        <Timeline   position="alternate">
          {experiences.map((experience) => (
            <TimelineItem   key={experience.id}>
              <TimelineOppositeContent  color="text.secondary">
                {experience.startDate?.toLocaleDateString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="grey"  />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <ExperienceComponent
                readOnly={true}
                preview={preview}
                  key={experience.id}
                  experience={experience}
                />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div className="h-[300px]"></div>
    </section>
  );
};

export default ExperienceBasic;
