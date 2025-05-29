import supabase from "@/app/_libs/supabase";
export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error)
    {
        console.error("Error fetching cabins:", error);
        throw new Error("Failed to fetch cabins");
    }
    return data;
}