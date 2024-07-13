import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "worldcoin",
            name: "Worldcoin",
            type: "oauth",
            wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
            authorization: { params: { scope: "openid" } },
            clientId: "app_staging_10835abc2ab6e1e0fdc2831476848fb9",
            clientSecret: "sk_e2f2c99aafdb3534d3bbccca063796860ef7fa9f96866ff8",
            idToken: true,
            checks: ["state", "nonce", "pkce"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.sub,
                    verificationLevel:
                        profile["https://id.worldcoin.org/v1"].verification_level,
                };
            },
        },
    ],
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin";
            return token;
        },
    },
   
};