'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const Five_Day = 60 * 60 * 24 * 5 ; // 5 days in milliseconds

export async function signUp(params: SignUpParams) {
    const{uid, name, email} = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
    
        if (userRecord.exists) {
            return { success: false, message: 'User already exists. Please sign in instead.' };
        }
    
        await db.collection('users').doc(uid).set({
            name,
            email
        });

        return { success: true, message: 'Account created successfully' };

    }catch (e: any) {
        console.error('Error signing up:', e);
        
        if (e.code === "auth/email-already-exists") {
            return { success: false, message: 'Email already exists' };
        };
        return { success: false, message: 'Failed to create an account' };
    }    
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: Five_Day* 1000, // 5 days
    });

    cookieStore.set("session", sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Five_Day, // 5 days
        path: "/",
        sameSite: "lax",
    });
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return { success: false, message: 'User not found. Please sign up.' };
        }

        // const idToken = await auth.createCustomToken(userRecord.uid);
        await setSessionCookie(idToken);

        // return { success: true, message: 'Sign in successful' };
    } catch (e: any) {
        console.log("");
        // console.error('Error signing in:', e);
        return { success: false, message: 'Failed to sign in' };
    }
}

export async function getCuurentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
            // name: userRecord.data()?.name || null,
            // email: userRecord.data()?.email || null,
        }as User;

    } catch (e) {
        console.log(e);
        // console.error('Error getting current user:', e);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCuurentUser();

    return !!user; 

}

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection("interviews")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
    
    return interviews.docs.map((doc) => ({
        id : doc.id,
        ...doc.data(),
    })) as Interview[];
    
}

export async function getLatestInterviews(params:GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
    
    const interviews = await db
        .collection("interviews")
        .orderBy("createdAt", "desc")
        .where("finalized", "==", true)
        .where("userId", "!=", userId)
        .limit(limit)
        .get();
    
    return interviews.docs.map((doc) => ({
        id : doc.id,
        ...doc.data(),
    })) as Interview[];
    
}