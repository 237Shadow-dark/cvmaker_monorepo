import prisma from "../lib/prisma.js";

export const createExperience = async ( experience, CV_id ) => {
     try {
        
            const created = await prisma.experience.create({
                data:{
                    title : experience.title,
                    company: experience.company,
                    startDate: experience.startDate,
                    endDate: experience.endDate,
                    description: experience.description,
                    curriculumVitaeId : Number(CV_id)
                }
        });
        if(created) return true;

     } catch (error) {
        console.log("Error in create experience controller: ", error.message);
     }
}

export const updateExperience = async (experience, experience_id ) => {
  const data = {}

  try {
    if(experience.title) data.title = experience.title;
    if(experience.company) data.company = experience.company;
    if(experience.description) data.description = experience.description;
    if(experience.startDate) data.startDate = experience.startDate;
    if(experience.endDate) data.endDate = experience.endDate;
    if(experience.curriculumVitaeId) data.curriculumVitaeId = experience.curriculumVitaeId;

    const updated = await prisma.experience.update({
        where: {id : Number(experience_id)},
        data
    })
    if(updated) return true;

  } catch (error) {
        console.log("Error in update experience controller: ", error.message);
  }

  
}

export const deleteExperience = async ( CV_id) => {
    try {
       const deleted = await prisma.experience.deleteMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (deleted) return true;

    } catch (error) {
        console.log("Error in delete experience controller: ", error.message);
    }
}

export const getExperience = async ( CV_id) => {
  
    try {
        const experiences = await prisma.experience.findMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (experiences) return experiences;
    } catch (error) {
        console.log("Error in get experiences controller: ", error.message);
    }
}