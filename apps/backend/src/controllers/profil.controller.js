import prisma from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js"

export const createProfil = async ( profil, CV_id, picture ) => {
     try {
        let uploadResponse = null
        if(picture){
            uploadResponse = await cloudinary.uploader.upload(picture, {
                folder: "profil"
            });
        }
        
            const created = await prisma.profil.create({
                data:{
                    email : profil.email,
                    phone : profil.phone,
                    address : profil.address,
                    bio : profil.bio,
                    profession : profil.profession,
                    picture:  picture? uploadResponse.secure_url : '',
                    curriculumVitaeId : Number(CV_id)
                }
        });
        if(created) return true;

     } catch (error) {
        console.log("Error in create profil controller: ", error.message);
     }
}

export const updateProfil = async (profil, profil_id, picture ) => {
  const data = {}

  try {
    if(profil.email) data.email = profil.email;
    if(profil.phone) data.phone = profil.phone;
    if(profil.bio) data.bio = profil.bio;
    if(profil.address) data.address = profil.address;
    if(profil.profession) data.profession = profil.profession;
    if(profil.picture) data.picture = profil.picture;
    if(profil.curriculumVitaeId) data.curriculumVitaeId = profil.curriculumVitaeId;
    if(picture){
            uploadResponse = await cloudinary.uploader.upload(picture, {
                folder: "profil"
            });
            data.picture = uploadResponse.secure_url;
        }

    const updated = await prisma.profil.update({
        where: {id : Number(profil_id)},
        data,
    })
    if(updated) return true;

  } catch (error) {
        console.log("Error in update profil controller: ", error.message);
  }

  
}

export const deleteProfil = async ( CV_id) => {
    try {
       const deleted = await prisma.profil.deleteMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (deleted) return true;

    } catch (error) {
        console.log("Error in delete profil controller: ", error.message);
    }
}

export const getProfil = async ( CV_id) => {
  
    try {
        const profils = await prisma.profil.findMany({
            where:{curriculumVitaeId: Number(CV_id)}
        })
        if (profils) return profils;
    } catch (error) {
        console.log("Error in get profils controller: ", error.message);
    }
}