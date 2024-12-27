const Dashboard = () => {
    return (
        <div className="m-5 border border-cyan-300 p-5 rounded-xl">
            <h1 className="text-xl font-bold">User Dashboard</h1>
            <p className="text-slate-600 font-semibold">Welcome to your personal dashboard</p>
            <div className="flex justify-between items-center mt-4">
                <h1 className="font-bold">Full name :</h1>
                <p className="font-medium text-slate-600">Bhargav</p>
            </div>
            <div className="flex justify-between items-center ">
                <h1 className="font-bold">Email :</h1>
                <p className="font-medium text-slate-600">bhargav.coding@gmail.com</p>
            </div>
        </div>
    )
}

export default Dashboard;