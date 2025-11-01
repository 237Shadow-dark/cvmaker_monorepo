import prisma from "../lib/prisma.js";

export const createProject = async ( project, CV_id ) => {
     try {
        
            const created = await prisma.project.create({
                data:{
                    title : project.title,
                    company: project.company,
                    startDate: project.startDate,
                    endDate: project.endDate,
                    description: project.description,
                    link: project.link,
                    curriculumVitaeId : Number(CV_id)
                }
        });
        if(created) return true;

     } catch (error) {
        console.log("Error in create project controller: ", error.message);
     }
}

export const updateProject = async (project, project_id ) => {
  const data = {}

  try {
    if(project.title) data.title = project.title;
    if(project.company) data.company = project.company;
    if(project.link) data.link = project.link;
    if(project.description) data.description = project.description;
    if(project.startDate) data.startDate = project.startDate;
    if(project.endDate) data.endDate = project.endDate;
    if(project.curriculumVitaeId) data.curriculumVitaeId = project.curriculumVitaeId;

    const updated = await prisma.project.update({
        where: {id : Number(project_id)},
        data
    })
    if(updated) return true;

  } catch (error) {
        console.log("Error in update project controller: ", error.message);
  }

  
}

export const deleteProject = async ( CV_id) => {
    try {
       const deleted = await prisma.project.deleteMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (deleted) return true;

    } catch (error) {
        console.log("Error in delete project controller: ", error.message);
    }
}

export const getProject = async ( CV_id) => {
  
    try {
        const projects = await prisma.project.findMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (projects) return projects;
    } catch (error) {
        console.log("Error in get projects controller: ", error.message);
    }
}