import axios from "axios";

const API_URL = "http://localhost:3000/api/cv";

export interface Profil {
  email: string;
  picture?: string;
  phone: string;
  bio: string;
  address?: string;
  profession?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string; // format ISO string
  endDate?: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Project {
  title: string;
  company?: string;
  description: string;
  startDate: string;
  endDate?: string;
  link?: string;
}

export interface CVPayload {
  profil: Profil;
  education?: Education[];
  experience?: Experience[];
  language?: Language[];
  skill?: Skill[];
  project?: Project[];
}

/**
 * Envoie un nouveau CV à ton backend
 */
export const createCV = async (userId: number, data: CVPayload) => {
  try {
    const response = await axios.post(`${API_URL}/create/${userId}`, data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Erreur Axios :", err.response?.data || err.message);
    } else if (err instanceof Error) {
      console.error("Erreur :", err.message);
    } else {
      console.error("Erreur inconnue :", err);
    }
    throw err;
  }
};

