import  jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const protectRoute = async (req, res, next) => {
    try {
        const  token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({message: "Unauthorized - No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized - No token provided"});
        
    }
}