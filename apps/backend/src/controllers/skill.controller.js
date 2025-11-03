import prisma from "../lib/prisma.js";

/**
 *  CREATE skill
 */
export const createSkill = async (skill, cvId) => {
  if (!skill || !cvId) return null;

  try {
    const created = await prisma.skill.create({
      data: {
        name: skill.name ?? "",
        level: skill.level ?? "",
        curriculumVitaeId: Number(cvId),
      },
    });

    return created;
  } catch (error) {
    console.error(" Error in createskill:", error.message);
    throw error;
  }
};

/**
 *  UPDATE skill
 */
export const updateSkill = async (skill, skillId) => {
  if (!skillId) return null;

  try {
    const updated = await prisma.skill.update({
      where: { id: Number(skillId) },
      data: {
        name: skill.name,
        level: skill.level,
        curriculumVitaeId: skill.curriculumVitaeId
          ? Number(skill.curriculumVitaeId)
          : undefined,
      },
    });

    return updated;
  } catch (error) {
    console.error(" Error in updateskill:", error.message);
    throw error;
  }
};

/**
 * DELETE all skill entries for a given CV
 */
export const deleteSkill = async (cvId) => {
  if (!cvId) return null;

  try {
    const deleted = await prisma.skill.deleteMany({
      where: { curriculumVitaeId: Number(cvId) },
    });

    return deleted.count > 0;
  } catch (error) {
    console.error(" Error in deleteskill:", error.message);
    throw error;
  }
};

/**
 *  GET skill records for a given CV
 */
export const getSkill = async (cvId) => {
  if (!cvId) return [];

  try {
    const skills = await prisma.skill.findMany({
      where: { curriculumVitaeId: Number(cvId) },
      orderBy: { startDate: "desc" },
    });

    return skills;
  } catch (error) {
    console.error("Error in getskill:", error.message);
    throw error;
  }
};