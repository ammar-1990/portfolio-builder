import { Experience } from "@prisma/client";
import { motion } from "framer-motion";

type Props = { experience: Experience };

const ExperienceComponent = ({ experience }: Props) => {
  return (
    <motion.div
      key={experience.id}
      className="p-6 rounded-lg bg-slate-800 w-[300px] sm:w-[400px] flex-shrink-0 snap-start "
    >
      <h3 className="text-slate-200 text-base font-bold capitalize  pb-1 ">
        {experience.title}
      </h3>
      <h3 className="text-slate-200 text-xl font-bold capitalize  pb-1 ">
        {experience.place}
      </h3>
      <p className="text-xs text-slate-200 mt-2 font-medium">{`From: ${
        experience.startDate?.toLocaleDateString() || "N/A"
      } - To: ${experience.endDate?.toLocaleDateString() || "N/A"}`}</p>
      <div className="max-h-[200px] overflow-y-auto myScroll p-1 mt-3">
      <p className="text-xs text-slate-200 mt-2 font-normal ">
        {experience.description}
      </p>
      <div className="mt-4 ">
        {experience?.achievments.map((achievment) => (
          <p className="text-xs text-white font-normal p-1" key={achievment}>
            &bull; {achievment}
          </p>
        ))}
      </div>
      </div>

  
    </motion.div>
  );
};

export default ExperienceComponent;
