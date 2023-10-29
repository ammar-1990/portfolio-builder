
'use client'
import {Inter} from 'next/font/google'
import { Experience, Portfolio, Profile, Project } from "@prisma/client";
import { cn } from '@/lib/utils';

type props = {
    portfolio:Portfolio & {experiences:Experience[],projects:Project[],profile:Profile}
}


const inter = Inter({ subsets: ['latin'] })

const ResumeBasic = ({ portfolio }:props) => (
    <div className={cn("p-[3vw] aspect-[1/1.4142]    border rounded-md w-[50vw] ",inter.className)}>
      <h1 className="text-[2vw] font-bold capitalize text-center">{portfolio.profile.name}</h1>
      <div className="flex-row flex-wrap flex items-center gap-2 justify-center mt-1">
        <p className="text-[0.8vw] text-gray-500">{portfolio.country}</p>
        <p className="text-[0.8vw] text-gray-500">{portfolio.tel}</p>
        <p className="text-[0.8vw] text-gray-500">{portfolio.email}</p>
        <p className="text-[0.8vw] text-gray-500">{portfolio.linkedin}</p>
      </div>
      <div>
        <h2 className="font-bold text-[1vw] mt-[1vw] border-b pb-1 uppercase">Summary</h2>
        <p className="text-[0.8vw] mt-[1vw] text-gray-500">{portfolio.bio}</p>
      </div>
      <div>
        <h2 className="font-bold text-[1vw] mt-[1vw] border-b pb-1 uppercase">Experience</h2>
        {portfolio.experiences.map((experience) => (
          <div key={experience.id} className="mt-[0.5vw]">
            <p className="text-[0.9vw] mt-[1vw] font-extrabold capitalize">{experience.title}</p>
            <div className="flex-row flex-wrap flex justify-between">
              <p className="text-[0.8vw] mt-[0.08vw] font-bold capitalize">{experience.place}</p>
              <div className="flex-row flex-wrap flex gap-3 mt-[0.08vw] text-black font-semibold">
                <p className="text-[0.8vw]">{experience.startDate?.toLocaleDateString()}</p>
                <p className="text-[0.8vw]">{experience.endDate?.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-[0.8vw] mt-[0.08vw] text-gray-500">{experience.achievments.map((achievment)=><p key={achievment}>&bull; {achievment}</p>)}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="font-bold text-[1vw] mt-[1vw] border-b pb-1 uppercase">Skills</h2>
        <div className="flex-row flex-wrap gap-1 flex">
          {portfolio.skills.map((skill, i) => (
            <p key={skill} className="text-[0.8vw] mt-[1vw] text-gray-500">
              {i !== 0 && " - "}
              {skill}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  export default ResumeBasic