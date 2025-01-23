import { useUser } from "../providers/UserProvider";

export const Dashboard = () => {
    const { user } = useUser();

    return (
        user?.username ?
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Vítejte na dashboardu {user.username}!</p>
        </div>
        :
        <h1>Přihlas se ty zlobidlo!!!</h1> 
    );
};