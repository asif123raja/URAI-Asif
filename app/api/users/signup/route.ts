// // Signup Route
// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import User from '@/models/user';
// import { connect } from '@/lib/dbConfig';

// connect();

// export async function POST(req: Request) {
//     try {
//         const { fullName, email, password, country, phoneNumber, address } = await req.json();

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return NextResponse.json({ message: 'User already exists' }, { status: 400 });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             fullName,
//             email,
//             password: hashedPassword,
//             country,
//             phoneNumber,
//             address,
//         });

//         await newUser.save();
//         return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ message: 'Server error', error }, { status: 500 });
//     }
// }


import { connect } from '@/lib/dbConfig';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, country } = reqBody;

        // Input validation
        if (!username || !email || !password || !country) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
        }

        // Check if user already exists by email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
        }

        // Check if user already exists by username
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            country
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send verification email
        try {
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id.toString() });
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
        }

        // Return success response (excluding sensitive data)
        const userResponse = {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            country: savedUser.country
        };

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: userResponse
        });

    } catch (error: any) {
        console.error("Error during signup:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}