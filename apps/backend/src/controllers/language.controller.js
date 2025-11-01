import prisma from "../lib/prisma.js";

export const createLanguage = async ( language, CV_id ) => {
     try {
        
            const created = await prisma.language.create({
                data:{
                    name : language.name,
                    proficiency: language.proficiency,
                    curriculumVitaeId : Number(CV_id)
                }
        });
        if(created) return true;

     } catch (error) {
        console.log("Error in create language controller: ", error.message);
     }
}

export const updateLanguage = async (language, language_id ) => {
  const data = {}

  try {
    if(language.name) data.name = language.name;
    if(language.proficiency) data.proficiency = language.proficiency;
    if(language.curriculumVitaeId) data.curriculumVitaeId = language.curriculumVitaeId;

    const updated = await prisma.language.update({
        where: {id : Number(language_id)},
        data
    })
    if(updated) return true;

  } catch (error) {
        console.log("Error in update language controller: ", error.message);
  }

  
}

export const deleteLanguage = async ( CV_id) => {
    try {
       const deleted = await prisma.language.deleteMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (deleted) return true;

    } catch (error) {
        console.log("Error in delete language controller: ", error.message);
    }
}

export const getlanguage = async ( CV_id) => {
  
    try {
        const languages = await prisma.language.findMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (languages) return languages;
    } catch (error) {
        console.log("Error in get languages controller: ", error.message);
    }
}