import prisma from "../lib/prisma.js";

/**
 *  CREATE experience
 */
export const createExperience = async (experience, cvId) => {
  if (!experience || !cvId) return null;

  try {
    const created = await prisma.experience.create({
      data: {
        title: experience.title ?? "",
        company: experience.company ?? "",
        startDate: experience.startDate ? new Date(experience.startDate) : null,
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        description: experience.description ?? "",
        curriculumVitaeId: Number(cvId),
      },
    });

    return created;
  } catch (error) {
    console.error(" Error in createexperience:", error.message);
    throw error;
  }
};

/**
 *  UPDATE experience
 */
export const updateExperience = async (experience, experienceId) => {
  if (!experienceId) return null;

  try {
    const updated = await prisma.experience.update({
      where: { id: Number(experienceId) },
      data: {
        title: experience.title,
        company: experience.company,
        startDate: experience.startDate ? new Date(experience.startDate) : null,
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        description: experience.description,
        curriculumVitaeId: experience.curriculumVitaeId
          ? Number(experience.curriculumVitaeId)
          : undefined,
      },
    });

    return updated;
  } catch (error) {
    console.error(" Error in updateexperience:", error.message);
    throw error;
  }
};

/**
 * DELETE all experience entries for a given CV
 */
export const deleteExperience = async (cvId) => {
  if (!cvId) return null;

  try {
    const deleted = await prisma.experience.deleteMany({
      where: { curriculumVitaeId: Number(cvId) },
    });

    return deleted.count > 0;
  } catch (error) {
    console.error(" Error in deleteexperience:", error.message);
    throw error;
  }
};

/**
 *  GET experience records for a given CV
 */
export const getExperience = async (cvId) => {
  if (!cvId) return [];

  try {
    const experiences = await prisma.experience.findMany({
      where: { curriculumVitaeId: Number(cvId) },
      orderBy: { startDate: "desc" },
    });

    return experiences;
  } catch (error) {
    console.error("Error in getexperience:", error.message);
    throw error;
  }
};