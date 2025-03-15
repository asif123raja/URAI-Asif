import { connect } from "@/lib/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

       
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 400 });
        }

        // Debugging logs
        console.log("Entered password:",password);
        
        console.log("Stored hashed password:", user.password);

        // Verify password
        const validPassword = await bcryptjs.compare(password, user.password);

        console.log("Password comparison result:", validPassword);

        // if (!validPassword) {
        //     return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        // }

        // Generate JWT Token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        // Create response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token: token, // Send token in response for frontend usage
        });

        // Store token in HttpOnly cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return response;

    } catch (error: any) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Login Route
// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '@/models/user';
// import { connect } from '@/lib/dbConfig';

// connect();

// export async function POST(req: Request) {
//     try {
//         const { email, password } = await req.json();

//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
//         }

//         const token = jwt.sign(
//             { userId: user._id, email: user.email },
//             process.env.TOKEN_SECRET || 'default_secret',
//             { expiresIn: '1h' }
//         );

//         return NextResponse.json({ token, user }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: 'Server error', error }, { status: 500 });
//     }
// }
