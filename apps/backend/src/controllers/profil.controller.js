import prisma from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";

/**
 * CREATE Profil
 */
export const createProfil = async (profil, cvId, picture) => {
  if (!profil || !cvId) return null;

  try {
    let secureUrl = "";

    // Upload image if present
    if (picture) {
      const uploadRes = await cloudinary.uploader.upload(picture, {
        folder: "profil",
        resource_type: "image",
      });
      secureUrl = uploadRes.secure_url;
    }

    const created = await prisma.profil.create({
      data: {
        email: profil.email ?? "",
        phone: profil.phone ?? "",
        address: profil.address ?? "",
        bio: profil.bio ?? "",
        profession: profil.profession ?? "",
        picture: secureUrl,
        curriculumVitaeId: Number(cvId),
      },
    });

    return created;
  } catch (error) {
    console.error("❌ Error in createProfil:", error.message);
    throw error;
  }
};

/**
 *  UPDATE Profil
 */
export const updateProfil = async (profil, profilId, picture) => {
  if (!profilId) return null;

  try {
    const data = {};

    // Fill in defined properties only
    for (const [key, value] of Object.entries(profil)) {
      if (value !== undefined && value !== null) data[key] = value;
    }

    // Handle optional new photo upload
    if (picture) {
      const uploadRes = await cloudinary.uploader.upload(picture, {
        folder: "profil",
        resource_type: "image",
      });
      data.picture = uploadRes.secure_url;
    }

    const updated = await prisma.profil.update({
      where: { id: Number(profilId) },
      data,
    });

    return updated;
  } catch (error) {
    console.error(" Error in updateProfil:", error.message);
    throw error;
  }
};

/**
 *  DELETE all Profil entries for a given CV
 */
export const deleteProfil = async (cvId) => {
  if (!cvId) return false;

  try {
    const deleted = await prisma.profil.deleteMany({
      where: { curriculumVitaeId: Number(cvId) },
    });

    return deleted.count > 0;
  } catch (error) {
    console.error("❌ Error in deleteProfil:", error.message);
    throw error;
  }
};

/**
 *  GET Profil entries for a given CV
 */
export const getProfil = async (cvId) => {
  if (!cvId) return [];

  try {
    const profils = await prisma.profil.findMany({
      where: { curriculumVitaeId: Number(cvId) },
      orderBy: { id: "asc" },
    });

    return profils;
  } catch (error) {
    console.error(" Error in getProfil:", error.message);
    throw error;
  }
};