import prisma from "../lib/prisma.js";

/**
 *  CREATE project
 */
export const createProject = async (project, cvId) => {
  if (!project || !cvId) return null;

  try {
    const created = await prisma.project.create({
      data: {
        title: project.title ?? "",
        company: project.company ?? "",
        link: project.link ?? "",
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null,
        description: project.description ?? "",
        curriculumVitaeId: Number(cvId),
      },
    });

    return created;
  } catch (error) {
    console.error(" Error in createproject:", error.message);
    throw error;
  }
};

/**
 *  UPDATE project
 */
export const updateProject = async (project, projectId) => {
  if (!projectId) return null;

  try {
    const updated = await prisma.project.update({
      where: { id: Number(projectId) },
      data: {
        title: project.title,
        company: project.company,
        link: project.link,
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null,
        description: project.description,
        curriculumVitaeId: project.curriculumVitaeId
          ? Number(project.curriculumVitaeId)
          : undefined,
      },
    });

    return updated;
  } catch (error) {
    console.error(" Error in updateproject:", error.message);
    throw error;
  }
};

/**
 * DELETE all project entries for a given CV
 */
export const deleteProject = async (cvId) => {
  if (!cvId) return null;

  try {
    const deleted = await prisma.project.deleteMany({
      where: { curriculumVitaeId: Number(cvId) },
    });

    return deleted.count > 0;
  } catch (error) {
    console.error(" Error in deleteproject:", error.message);
    throw error;
  }
};

/**
 *  GET project records for a given CV
 */
export const getProject = async (cvId) => {
  if (!cvId) return [];

  try {
    const projects = await prisma.project.findMany({
      where: { curriculumVitaeId: Number(cvId) },
      orderBy: { startDate: "desc" },
    });

    return projects;
  } catch (error) {
    console.error("Error in getproject:", error.message);
    throw error;
  }
};