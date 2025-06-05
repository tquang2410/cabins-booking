"use server";
import {auth,signIn, signOut} from "./auth";
import {supabase} from "@/app/_libs/supabase";

export async function updateGuest(formData) {
    const session = await auth();
    if (!session)
        throw new Error("You must be signed in to update your profile.");
    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");
    const regex = /^[a-zA-Z0-9]{6,12}$/;

    if (!regex.test(nationalID)) {
        throw new Error("National ID must be 6-12 alphanumeric characters");
    }
    const updateDate = {nationality, countryFlag, nationalID};
    console.log(updateDate)

    const { data, error } = await supabase
        .from('guests')
        .update(updateDate)
        .eq('id', session.user.guestId)

    if (error) {
        throw new Error('Guest could not be updated');
    }
}
export async function signInAction() {
    await signIn("google", {redirectTo: "/account"});
}
export async function signOutAction() {
    await signOut({redirectTo: "/"});
}