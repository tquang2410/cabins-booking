import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {getBookedDatesByCabinId, getCabin, getSettings} from "@/app/_libs/data-service";

 async function Reservation ({cabin}) {
    {
        // Dùng Promise.all để fetch dữ liệu song song
        const [settings, bookedDates] = await Promise.all([
            getSettings(),
            getBookedDatesByCabinId(cabin.id)]);
        return (
            <div className="border border-primary-800 min-h-[400px] flex">
                <DateSelector
                    settings={settings}
                    bookedDates={bookedDates}
                    cabin={cabin}
                />
                <ReservationForm cabin ={cabin}/>
            </div>
        )
    }
}
export default Reservation;