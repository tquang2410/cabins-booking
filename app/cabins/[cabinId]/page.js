
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import {getBookedDatesByCabinId, getCabin, getCabins, getSettings} from "@/app/_libs/data-service";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";

import Reservation from "@/app/_components/Reservation";
import {Suspense} from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";


// export async function generateMetadata({params}) {
//     const cabin = await getCabin(params.cabinId);
//     return {
//         title: `Cabin ${cabin.name}`,
//         description: cabin.description,
//     };
// }
export async function generateMetadata({params}){
    const resolvedParams = await params;
    const {name} = await getCabin(resolvedParams.cabinId);
    return { title: `Cabin ${name}`}
}
export async function generateStaticParams(){
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({
        cabinId: String(cabin.id)
    }));
    return ids;
}
export default async function Page({params}) {
    // params.cabinId = "123" nếu URL là /cabins/123
    const resolvedParams = await params;
    const [cabin, settings] = await Promise.all([
        getCabin(resolvedParams.cabinId),
        getSettings()
    ]);


    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} settings={settings}/>

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner/>}>
                    <Reservation cabin={cabin}/>
                </Suspense>

            </div>
        </div>
    );
}
