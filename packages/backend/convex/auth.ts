import {AuthKit, type AuthFunctions} from "@convex-dev/workos-authkit";
import {components, internal} from "./_generated/api";
import type {DataModel} from "./_generated/dataModel";
import {generateUsername} from "unique-username-generator";

const authFunctions: AuthFunctions = internal.auth;

export const authKit = new AuthKit<DataModel>(components.workOSAuthKit, {
    authFunctions,
});

export const {authKitEvent} = authKit.events({
    "user.created": async (ctx, event) => {
        await ctx.db.insert("users", {
            username: event.data.name ?? generateUsername("", 4),
            authId: event.data.id,
            email: event.data.email,
            pfp: event.data.profilePictureUrl ?? `https://api.dicebear.com/9.x/rings/svg?seed=${Array.from(
                new Uint8Array(
                    await crypto.subtle.digest(
                        "SHA-256",
                        new TextEncoder().encode(event.data.id),
                    ),
                ),
            )
                .map((b) => b.toString(16).padStart(2, "0"))
                .join(
                    "",
                )}&ringFive=full,eighth,half,quarter&ringFour=half,quarter,full,eighth&ringOne=half,quarter,full,eighth&ringThree=half,quarter,full,eighth&ringTwo=half,quarter,full,eighth`,
            role: "User",
            badges: []
        })
    },
});
