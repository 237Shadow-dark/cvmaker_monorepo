import prisma from "../lib/prisma.js";

export const createSkill = async ( skill, CV_id ) => {
     try {
        
            const created = await prisma.skill.create({
                data:{
                    name : skill.name,
                    level: skill.level,
                    curriculumVitaeId : Number(CV_id)
                }
        });
        if(created) return true;

     } catch (error) {
        console.log("Error in create skill controller: ", error.message);
     }
}

export const updateSkill = async (skill, skill_id ) => {
  const data = {}

  try {
    if(skill.name) data.name = skill.name;
    if(skill.level) data.level = skill.level;
    if(skill.curriculumVitaeId) data.curriculumVitaeId = skill.curriculumVitaeId;

    const updated = await prisma.skill.update({
        where: {id : Number(skill_id)},
        data
    })
    if(updated) return true;

  } catch (error) {
        console.log("Error in update skill controller: ", error.message);
  }

  
}

export const deleteSkill = async ( CV_id) => {
    try {
       const deleted = await prisma.skill.deleteMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (deleted) return true;

    } catch (error) {
        console.log("Error in delete skill controller: ", error.message);
    }
}

export const getSkill = async ( CV_id) => {
  
    try {
        const skills = await prisma.skill.findMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (skills) return skills;
    } catch (error) {
        console.log("Error in get skills controller: ", error.message);
    }
}