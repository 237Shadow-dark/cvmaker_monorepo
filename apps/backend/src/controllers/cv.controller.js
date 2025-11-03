import prisma from "../lib/prisma.js";
import {
  createEducation, deleteEducation, updateEducation,
} from "./education.controller.js";
import {
  createExperience, deleteExperience, updateExperience,
} from "./experience.controller.js";
import {
  createLanguage, deleteLanguage, updateLanguage,
} from "./language.controller.js";
import {
  createProfil, deleteProfil, updateProfil,
} from "./profil.controller.js";
import {
  createProject, deleteProject, updateProject,
} from "./project.controller.js";
import {
  createSkill, deleteSkill, updateSkill,
} from "./skill.controller.js";

// CREATE CV
export const createCV = async (req, res) => {
  const { education = [], experience = [], language = [], profil, project = [], skill = [] } = req.body;
  const picture = req.body.photo ?? null;
  const userId = Number(req.params.userId);

  if (!userId)
    return res.status(400).json({ message: "Invalid or missing userId" });

  if ([education, language, profil, skill].every(arr => arr.length === 0))
    return res.status(400).json({ message: "At least one section is required" });

  try {
    const cv = await prisma.curriculumVitae.create({ data: { userId } });

    await Promise.all([
  ...(education ? education.map(e => createEducation(e, cv.id)) : []),
  ...(experience ? experience.map(e => createExperience(e, cv.id)) : []),
  ...(language ? language.map(l => createLanguage(l, cv.id)) : []),
  ...(project ? project.map(p => createProject(p, cv.id)) : []),
  ...(skill ? skill.map(s => createSkill(s, cv.id)) : []),
  profil ? createProfil(profil, cv.id, picture) : null
].filter(Boolean));

    return res.status(201).json({
      message: "CV created successfully",
      CV: cv,
    });
  } catch (error) {
    console.error("Error in createCV:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  UPDATE CV
export const updateCV = async (req, res) => {
  const { education = [], experience = [], language = [], profil , project = [], skill = [] } = req.body;
  const picture = req.body.photo ?? null;

  try {
    if([education, language, profil, skill, experience, project, ].every(arr => arr.length === 0))
    {
      return res.status(400).json({ message: "At least one section is required" });
    }
    await Promise.all([
  ...(education ? education.map(e => updateEducation(e, cv.id)) : []),
  ...(experience ? experience.map(e => updateExperience(e, cv.id)) : []),
  ...(language ? language.map(l => updateLanguage(l, cv.id)) : []),
  ...(project ? project.map(p => updateProject(p, cv.id)) : []),
  ...(skill ? skill.map(s => updateSkill(s, cv.id)) : []),
  profil ? updateProfil(profil, cv.id, picture) : null
].filter(Boolean));

    return res.status(200).json({ message: "CV updated successfully" });
  } catch (error) {
    console.error("Error in updateCV:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  DELETE CV
export const deleteCV = async (req, res) => {
  const { id } = req.params;
  const cvId = Number(id);

  try {
    await prisma.$transaction([
      deleteEducation(cvId),
      deleteExperience(cvId),
      deleteLanguage(cvId),
      deleteProfil(cvId),
      deleteProject(cvId),
      deleteSkill(cvId),
      prisma.curriculumVitae.delete({ where: { id: cvId } }),
    ]);

    return res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCV:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  GET SINGLE CV
export const getCV = async (req, res) => {
  const { id } = req.params;
  const cvId = Number(id);

  try {
    const cv = await prisma.curriculumVitae.findUnique({
      where: { id: cvId },
      include: {
        education: true,
        experience: true,
        language: true,
        profil: true,
        project: true,
        skill: true,
      },
    });

    if (!cv) return res.status(404).json({ message: "CV not found" });

    return res.status(200).json({
      message: "CV retrieved successfully",
      CV: cv,
    });
  } catch (error) {
    console.error("Error in getCV:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  GET ALL CV FOR A USER
export const getAllCV = async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);

  try {
    const cvs = await prisma.curriculumVitae.findMany({
      where: { userId },
      include: {
        education: true,
        experience: true,
        language: true,
        profil: true,
        project: true,
        skill: true,
      },
    });

    return res.status(200).json({
      message: "All CVs retrieved successfully",
      CV: cvs,
    });
  } catch (error) {
    console.error("Error in getAllCV:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};