import prisma from "../lib/prisma.js";

/**
 *  CREATE language
 */
export const createLanguage = async (language, cvId) => {
  if (!language || !cvId) return null;

  try {
    const created = await prisma.language.create({
      data: {
        name: language.name ?? "",
        proficiency: language.proficiency ?? "",
        curriculumVitaeId: Number(cvId),
      },
    });

    return created;
  } catch (error) {
    console.error(" Error in createlanguage:", error.message);
    throw error;
  }
};

/**
 *  UPDATE language
 */
export const updateLanguage = async (language, languageId) => {
  if (!languageId) return null;

  try {
    const updated = await prisma.language.update({
      where: { id: Number(languageId) },
      data: {
        name: language.name,
        proficiency: language.proficiency,
        curriculumVitaeId: language.curriculumVitaeId
          ? Number(language.curriculumVitaeId)
          : undefined,
      },
    });

    return updated;
  } catch (error) {
    console.error(" Error in updatelanguage:", error.message);
    throw error;
  }
};

/**
 * DELETE all language entries for a given CV
 */
export const deleteLanguage = async (cvId) => {
  if (!cvId) return null;

  try {
    const deleted = await prisma.language.deleteMany({
      where: { curriculumVitaeId: Number(cvId) },
    });

    return deleted.count > 0;
  } catch (error) {
    console.error(" Error in deletelanguage:", error.message);
    throw error;
  }
};

/**
 *  GET language records for a given CV
 */
export const getLanguage = async (cvId) => {
  if (!cvId) return [];

  try {
    const languages = await prisma.language.findMany({
      where: { curriculumVitaeId: Number(cvId) },
      orderBy: { startDate: "desc" },
    });

    return languages;
  } catch (error) {
    console.error("Error in getlanguage:", error.message);
    throw error;
  }
};