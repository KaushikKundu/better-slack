"use server"
import jwt from "jsonwebtoken";
import { SignInSchema, SignupFormSchema } from "../../lib/definitions";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import dotenv from "dotenv";
import { cookies } from "next/headers";

dotenv.config();

export async function signup(formData: FormData): Promise<void> {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });
    if (!validatedFields.success) {
        console.error(validatedFields.error.issues);
        return;
    } else {
        console.log(validatedFields.data);
    }
    const { name, email, password } = validatedFields.data;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw new Error("Email already exists.");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const payload = {
            userId: newUser.id,
            email: newUser.email,
            name: newUser.name,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        const cookieStore = await cookies();
        cookieStore.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
    } catch (err) {
        console.error(err);
    }
    redirect("/chat");
}
export async function login(formData: FormData) {
    const validatedFields = SignInSchema.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });
    if (!validatedFields.success) {
        console.error(validatedFields.error.issues);
        return;
    } else {
        console.log(validatedFields.data);
    }
    const { email, password } = validatedFields.data;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!existingUser) {
            throw new Error("user doesn't exist.");
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if (!isPasswordCorrect) {
            throw new Error("wrong password");
        }
        const payload = {
            userId: existingUser.id,
            name: existingUser.name,
            email: existingUser.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        const cookieStore = await cookies();
        cookieStore.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
       
    } catch (error) {
        console.error(error);
    }
    redirect('/chat');
}
