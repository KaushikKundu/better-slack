"use server";

import { SignupFormSchema } from "@/lib/definitions";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export async function signup(formData: FormData): Promise<void> {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });
    console.log(validatedFields.data)
    if (!validatedFields.success) {
        console.error(validatedFields.error.issues);
        return;
    } else {
        console.log(validatedFields.data);
    }
    const { name, email, password } = validatedFields.data;
    const { data, error } = await authClient.signUp.email(
        {
            email,
            password,
            name,
            callbackURL: "/chat",
        },
        {
            onRequest: (ctx) => {
                //show loading
            },
            onSuccess: (ctx) => {
                redirect("/chat");
            },
            onError: (ctx) => {
                console.log(ctx.error)
            },
        }
    );
}
