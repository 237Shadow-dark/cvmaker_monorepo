import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js'
import prisma from "../lib/prisma.js";

export const login= async (req , res ) =>{
    
    const {name, email, password} = req.body;

   try {
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

       const user = await prisma.user.findUnique({where : { email },});

       if(!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid credentials"});
        }

       const token =  generateToken(user._id, res);

        return res.status(200).json({
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
            },
            
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log("Error in login controller: ", error.message);
    }
}

export const signup = async (req, res) =>{
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await prisma.user.findUnique({where: {email}});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const token = generateToken(newUser.id, res);

        return res.status(201).json({
            user: {
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            token: token,
            message: "Signup successful"
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log("Error in signup controller: ", error.message);
    }
}

export const updateUser = async (req, res) =>{
        const {name, email, password} = req.body;
        const userId = Number(req.params.id);
    try {
        // Prépare un objet data vide
        const data = {};

        if (name) data.name = name;
        if (email) data.email = email;

        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data,
        });

        res.json(user);
    } catch (error) {
        console.error("Error in updateUser controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found or already deleted" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {

    // Gestion propre de l'erreur "record not found"
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found or already deleted" });
    }

    console.error("Error in deleteUser controller:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0, // set cookie to expire immediately
            // httpOnly: true,
            // sameSite: "strict",
            // secure: process.env.NODE_ENV !== "development"
        });
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
}  

export const getUser = async (req, res) =>{
    const userId = Number(req.params.id);
    try {
       const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user); 
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error in getUser controller: ", error.message);
    }
     
}

export const checkAuth = (req, res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}