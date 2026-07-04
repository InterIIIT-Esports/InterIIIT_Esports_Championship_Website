import jwt from "jsonwebtoken";
import User from "@/lib/models/User";

export const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            collegeEmail: user.collegeEmail,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const verifyToken = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Extracts and verifies the JWT from the Authorization header.
 * Returns the decoded payload.
 */
export const getAuthenticatedUser = (req) => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
        throw new Error("Authorization header missing");
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw new Error("Invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new Error("Token missing");
    }

    return verifyToken(token);
};

export const requireAuth = async (req) => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
        throw new Error("Authorization header missing");
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw new Error("Invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new Error("Token missing");
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};