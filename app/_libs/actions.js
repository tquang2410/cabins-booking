"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid national ID");

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId);

    if (error) throw new Error("Guest could not be updated");

    revalidatePath("/account/profile");
}

export async function signInAction() {
    await signIn("google", {redirectTo: "/account"});
}

export async function signOutAction() {
    await signOut({redirectTo: "/"});
}

export async function createBooking(bookingData, formData) {
    // console.log(formData)
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    Object.entries(formData.entries())
    const newBooking = {
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        numNights: bookingData.numNights,
        cabinId: bookingData.cabinId,
        cabinPrice: bookingData.cabinPrice,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get("observations").slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        status: "unconfirmed",
    };
    console.log(newBooking);
    const {data, error} = await supabase.from("bookings").insert([newBooking]);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be created");
    }

    revalidatePath("/cabins");
    redirect("/account/reservations");
}

export async function deleteBooking(bookingId) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
        throw new Error("Not allowed to delete this booking");

    const {error} = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    revalidatePath("/account/reservations")
}

export async function updateBooking(formData) {
    const bookingId = Number(formData.get("bookingId"));
    // 1. Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    // 2. Authorization
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
        throw new Error("Not allowed to delete this booking");
    // 3. Building update data
    const updateData = {
        numGuests: formData.get('numGuests'),
        observations: formData.get("observations").slice(0, 1000),
    };

    // 4. Mutation
    const {error} = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId)
        .select()
        .single();
    // 5) Error handling
    if (error)
        throw new Error("Booking could not be updated");

    // 6) Revalidate - đoạn này không dùng vì nextjs 15+ không bị lỗi refetch data
    // revalidatePath(`/account/reservations/edit/${bookingId}`)
    // revalidatePath("/account/reservations")

    // 7) Redirecting
    redirect('/account/reservations')
}
