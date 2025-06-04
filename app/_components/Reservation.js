import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import {getBookedDatesByCabinId, getCabin, getSettings} from "@/app/_libs/data-service";
import LoginMessage from "@/app/_components/LoginMessage";
import {auth} from "@/app/_libs/auth";

 async function Reservation ({cabin}) {
    {
        // Dùng Promise.all để fetch dữ liệu song song
        const [settings, bookedDates] = await Promise.all([
            getSettings(),
            getBookedDatesByCabinId(cabin.id)]);
        const session = await auth()
        return (
            <div className="border border-primary-800 min-h-[400px] flex">
                <DateSelector
                    settings={settings}
                    bookedDates={bookedDates}
                    cabin={cabin}
                />
                {session?.user? <ReservationForm cabin ={cabin}
                                                user = {session.user}
                /> : <LoginMessage/>}
            </div>
        )
    }
}
export default Reservation;