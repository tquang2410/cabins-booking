"use client";

import {useSearchParams, useRouter, usePathname} from "next/navigation";
// import {useRouter} from "next/router"; không dùng

function Filter() {
    // Hook useSearchParams dùng để lấy các tham số tìm kiếm từ URL
   const searchParams = useSearchParams();
    // Hook useRouter dùng để thay đổi URL mà không làm mới trang
   const router = useRouter();
    // Hook usePathname dùng để lấy đường dẫn hiện tại
   const pathname = usePathname()
    function handleFilter(filter){
        // Hàm này sẽ được gọi khi người dùng nhấn vào một trong các nút lọc
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);
        // Sử dụng router.replace để thay đổi URL mà không làm mới trang
    router.replace(`${pathname}?${params.toString()}`,{scroll: false})
    }
    return (
        <div className="border border-primary-800 flex">
            <button className="px-5 py-2 hover:bg-primary-700 "
                onClick={() => handleFilter('all')}
            >
                All cabins
            </button>
            <button className="px-5 py-2 hover:bg-primary-800 transition-colors"
            onClick={() => handleFilter('small')} >
                1&mdash;3 guests
            </button>
            <button className="px-5 py-2 hover:bg-primary-800 transition-colors"
            onClick={() => handleFilter('medium')} >
                4&mdash;7 guests
            </button>
            <button className="px-5 py-2 hover:bg-primary-800 transition-colors"
            onClick={() => handleFilter('large')} >
                8&mdash;12 guests
            </button>
        </div>
    )
}
export default Filter;