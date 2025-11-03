import prisma from "../lib/prisma.js";

/**
 *  CREATE Education
 */
export const createEducation = async (education, cvId) => {
  if (!education || !cvId) return null;

  try {
    const created = await prisma.education.create({
      data: {
        institution: education.institution ?? "",
        degree: education.degree ?? "",
        fieldOfStudy: education.fieldOfStudy ?? "",
        startDate: education.startDate ? new Date(education.startDate) : null,
        endDate: education.endDate ? new Date(education.endDate) : null,
        description: education.description ?? "",
        curriculumVitaeId: Number(cvId),
      },
    });

    return created;
  } catch (error) {
    console.error(" Error in createEducation:", error.message);
    throw error;
  }
};

/**
 *  UPDATE Education
 */
export const updateEducation = async (education, educationId) => {
  if (!educationId) return null;

  try {
    const updated = await prisma.education.update({
      where: { id: Number(educationId) },
      data: {
        institution: education.institution,
        degree: education.degree,
        fieldOfStudy: education.fieldOfStudy,
        startDate: education.startDate ? new Date(education.startDate) : null,
        endDate: education.endDate ? new Date(education.endDate) : null,
        description: education.description,
        curriculumVitaeId: education.curriculumVitaeId
          ? Number(education.curriculumVitaeId)
          : undefined,
      },
    });

    return updated;
  } catch (error) {
    console.error(" Error in updateEducation:", error.message);
    throw error;
  }
};

/**
 * DELETE all Education entries for a given CV
 */
export const deleteEducation = async (cvId) => {
  if (!cvId) return null;

  try {
    const deleted = await prisma.education.deleteMany({
      where: { curriculumVitaeId: Number(cvId) },
    });

    return deleted.count > 0;
  } catch (error) {
    console.error(" Error in deleteEducation:", error.message);
    throw error;
  }
};

/**
 *  GET Education records for a given CV
 */
export const getEducation = async (cvId) => {
  if (!cvId) return [];

  try {
    const educations = await prisma.education.findMany({
      where: { curriculumVitaeId: Number(cvId) },
      orderBy: { startDate: "desc" },
    });

    return educations;
  } catch (error) {
    console.error("Error in getEducation:", error.message);
    throw error;
  }
};