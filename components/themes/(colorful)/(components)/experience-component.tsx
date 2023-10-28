import { Experience } from '@prisma/client'
import {motion} from 'framer-motion'

type Props = {experience:Experience}



const ExperienceComponent = ({experience}: Props) => {
  return (
    <motion.div
          
 

    key={experience.id} className="p-6 rounded-lg bg-slate-800 w-[300px] sm:w-[400px] flex-shrink-0 snap-start ">
      <h3 className="text-slate-200 text-xl font-bold capitalize  pb-1 ">
        {experience.place}
      </h3>
      <p className="text-xs text-slate-200 mt-2 font-medium">{`From: ${
        experience.startDate?.toLocaleDateString() || "N/A"
      } - To: ${experience.endDate?.toLocaleDateString() || "N/A"}`}</p>

      <p className="text-xs text-slate-200 mt-2 font-normal max-h-[200px] overflow-y-auto myScroll">
        {experience.description}
      </p>
    </motion.div>
  )
}

export default ExperienceComponent