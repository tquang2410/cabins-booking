import {getBookedDatesByCabinId, getCabin} from "@/app/_libs/data-service";

export async function GET(request, {params}) {
    const {cabinId} = params;
    try {
       const [cabin,bookedDates] = await
               Promise.all([getCabin(cabinId),
                getBookedDatesByCabinId(cabinId)]);
       return Response.json({cabin, bookedDates});
    }
    catch {
        return Response.json({message: "Cabin not found"}, {status: 404});
    }
    return Response.json({test: "test"});
}

// export async function POST() {
//
// }

