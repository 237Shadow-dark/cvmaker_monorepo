import prisma from "../lib/prisma.js";
import { deleteUser } from "./auth.controller.js";
import { createEducation, deleteEducation, updateEducation } from "./education.controller.js";
import { createExperience, deleteExperience, updateExperience } from "./experience.controller.js";
import { createLanguage, deleteLanguage, updateLanguage } from "./language.controller.js";
import { createProfil, deleteProfil, updateProfil } from "./profil.controller.js";
import { createProject, deleteProject, updateProject } from "./project.controller.js";
import { createSkill, deleteSkill, updateSkill } from "./skill.controller.js";

export const createCV = async (req, res) => {
  const { education, experience, language, profil, project, skill} = req.body;
  const picture = req.body.photo ?? null;
  const {userId} = Number(req.params)

  try {
    if(!education && !language && !profil && !skill) return res.status(400).json({ message: "All fields are required" });

    const CV = await prisma.curriculumVitae.create({
      data: {
        userId: userId
      }
    })

    if(!CV) return res.status(400).json({message: "CV not created, try again later"});

    education.array.forEach(  async  (element) => {
      await createEducation(element, CV.id)
    });

    language.array.forEach(  async  (element) => {
      await createLanguage(element, CV.id)
    });

    profil.array.forEach(  async  (element) => {
      await createProfil(element, CV.id, picture)
    });

    skill.array.forEach(  async  (element) => {
      await createSkill(element, CV.id)
    });

    if(experience){
      experience.array.forEach(  async  (element) => {
        await createExperience(element, CV.id)
      });
    }

    if(project){
      project.array.forEach(  async  (element) => {
        await createProject(element, CV.id)
      });
    }
    return res.status(200).json(CV)
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error in create CV controller: ", error.message);
  }
}

export const updateCV = async (req, res) => {
  const { education, experience, language, profil, project, skill} = req.body;
  const picture = req.body.photo ?? null;
  try {
    if (education) {
      education.array.forEach(  async  (element) => {
        await updateEducation(element, element.id)
      })
    };

    if (language) {
      language.array.forEach(  async  (element) => {
        await updateLanguage(element, element.id)
      });
    }

    if (profil) {
      profil.array.forEach(  async  (element) => {
        await updateProfil(element, element.id, picture)
      });
    }

    if (skill) {
      skill.array.forEach(  async  (element) => {
        await updateSkill(element, element.id)
      });
    }

    if(experience){
      experience.array.forEach(  async  (element) => {
        await updateExperience(element, element.id)
      });
    }

    if(project){
      project.array.forEach(  async  (element) => {
        await updateProject(element, element.id)
      });
    }
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error in update CV controller: ", error.message);
  }
}

export const deleteCV = async (req, res) => {
    const {id} = req.params
    let deletedEd = false
    let deletedEx = false
    let deletedLg = false
    let deletedProf = false
    let deletedProj = false
    let deletedSk = false
    let deletedCV
    try {
      deletedEd = await deleteEducation(id);
      deletedEx = await deleteExperience(id);
      deletedLg = await deleteLanguage(id);
      deletedProf = await deleteProfil(id);
      deletedProj = await deleteProject(id);
      deletedSk = await deleteSkill(id);


      if(deletedEd && deletedEx && deletedLg && deletedProf && deletedProj && deletedSk){
        deletedCV = await prisma.curriculumVitae.delete({
          where:{id : Number(id)}
        })
      }
      if (!deletedCV)  return res.status(400).json({ message: "Unable to delete the cv  " });
      return res.status(200).json({ message: "CV delete successfully" });
    } catch (error) {
      res.status(500).json({message: "Internal server error"});
      console.log("Error in delete CV controller: ", error.message);
    }
}

export const getCV = async (req, res) => {
  const {id} = req.params

  try {
    const CV = await prisma.curriculumVitae.findUnique({
      where: {id: Number(id)}
    })
    if(!CV) return res.status(400).json({ message: "Unable to get the cv  " });
    return res.status(200).json({ 
      CV: CV,
      message: "Get CV successfully" });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error in get CV controller: ", error.message);
  }
}
export const getAllCV = async (req, res) => {
    const {id} = req.params

  try {
    const CV = await prisma.curriculumVitae.findMany({
      where: {userId: Number(id)}
    })
    if(!CV) return res.status(400).json({ message: "Unable to get all the cv  " });
    return res.status(200).json({ 
      CV: CV,
      message: "Get all CV  successfully" });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error in get all CV controller: ", error.message);
  }
}