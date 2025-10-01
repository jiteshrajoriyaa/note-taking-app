import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models";

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.BACKEND_URL + '/auth/google/callback'
    },
        async (_, __, profile, done) => {
            try {

                const existingUser = await User.findOne({
                    email: profile.emails![0].value
                })

                if (existingUser) return done(null, existingUser);
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails![0].value,
                    googleId: profile.id,
                    imageURL: profile.photos?.[0]?.value
                })

                done(null, newUser)
            } catch (e) {
                done(e, undefined)
            }
        }
    )
)