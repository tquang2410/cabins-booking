import CabinList from "@/app/_components/CabinList";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";

// export const revalidate = 3600 ;// Cập nhập dữ liệu mỗi giờ
//     export const revalidate = 10; // Không dùng nữa vì đã thành trang render động
    export const metadata = {
    title: "Cabins",
};

export default async function Page({searchParams}) {
    const resolvedSearchParams = await searchParams;
     const filter = resolvedSearchParams?.capacity ?? "all";
    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the Italian
                Dolomites. Imagine waking up to beautiful mountain views, spending your
                days exploring the dark forests around, or just relaxing in your private
                hot tub under the stars. Enjoy natural&apos;s beauty in your own little home
                away from home. The perfect spot for a peaceful, calm vacation. Welcome
                to paradise.
            </p>
            <div className="flex flex-col gap-5 mb-10">
                <Filter/>
            </div>

     <Suspense fallback={<Spinner/>}>
         <CabinList filter={filter}/>
     </Suspense>

        </div>
    );
}
