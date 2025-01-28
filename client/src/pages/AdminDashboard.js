import { useUser } from "../providers/UserProvider";

export const AdminDashboard = () => {
    const { user } = useUser();

    return (
        user?.isAdmin ?
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Vítejte na Admin dashboardu {user.username}!</p>
        </div>
        :
        <h1>Tady nemas co delat!!!</h1>
    );
};