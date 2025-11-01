import prisma from "../lib/prisma.js";

export const createEducation = async ( education, CV_id ) => {
     try {
        
            const created = await prisma.education.create({
                data:{
                    institution : education.institution,
                    degree: education.degree,
                    fieldOfStudy: education.fieldOfStudy,
                    startDate: education.startDate,
                    endDate: education.endDate,
                    description: education.description,
                    curriculumVitaeId : Number(CV_id)
                }
        });
        if(created) return true;

     } catch (error) {
        console.log("Error in create education controller: ", error.message);
     }
}

export const updateEducation = async (education, Education_id ) => {
  const data = {}

  try {
    if(education.institution) data.institution = education.institution;
    if(education.degree) data.degree = education.degree;
    if(education.fieldOfStudy) data.fieldOfStudy = education.fieldOfStudy;
    if(education.description) data.description = education.description;
    if(education.startDate) data.startDate = education.startDate;
    if(education.endDate) data.endDate = education.endDate;
    if(education.curriculumVitaeId) data.curriculumVitaeId = education.curriculumVitaeId;

    const updated = await prisma.education.update({
        where: {id : Number(Education_id)},
        data
    })
    if(updated) return true;

  } catch (error) {
        console.log("Error in update education controller: ", error.message);
  }

  
}

export const deleteEducation = async ( CV_id) => {
    try {
       const deleted = await prisma.education.deleteMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (deleted) return true;

    } catch (error) {
        console.log("Error in delete education controller: ", error.message);
    }
}

export const getEducation = async ( CV_id) => {
  
    try {
        const educations = await prisma.education.findMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (educations) return educations;
    } catch (error) {
        console.log("Error in get educations controller: ", error.message);
    }
}