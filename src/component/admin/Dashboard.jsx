import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllOwner from "../../hooks/useGetAllOwner";
import useGetAllTenant from "../../hooks/useGetAllTenant";
import useGetAllRequirements from "../../hooks/useGetAllRequirement";
import useGetAllRooms from "../../hooks/useGetAllRooms";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

const chartConfig = {
  tenant: {
    label: "Tenant",
    color: "#2563eb",
  },
  Owner: {
    label: "Owner",
    color: "#60a5fa",
  },
};

export default function Dashboard() {
  // Fetch fresh data
  useGetAllOwner();
  useGetAllTenant();
  useGetAllRequirements();
  useGetAllRooms();

  // Redux state
  const rooms = useSelector((state) => state.room.room);
  const allOwners = useSelector((state) => state.allOwner?.allOwnerData);
  const allTenants = useSelector((state) => state.allTenant?.allTenantData);
  const requirements = useSelector(
    (state) => state.requirement.requirements.requirement?.requirements
  );

  // Fallback numbers if data is missing
  const numberOfOwner = allOwners?.length || 5;
  const numberOfTenant = allTenants?.length || 10;
  const activeRooms = rooms?.filter(room => room.status === 'active').filter((room) =>room.availability != "booked")  || [];
  const bookedRooms = rooms?.filter(room => room.status === 'active').filter((room) =>room.availability === "booked")  || [];  
  
  // Chart data
  const chartData = [
    { month: "January", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "February", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "March", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "April", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "May", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "June", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "July", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "August", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "September", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "October", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "November", tenant: numberOfTenant, Owner: numberOfOwner },
    { month: "December", tenant: numberOfTenant, Owner: numberOfOwner },
  ];

  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <SidebarInset>
        {/* Outer Container */}
        <div className="p-4 md:p-6 space-y-8">
          {/* Page Heading */}
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
              Overview of platform metrics, growth trends, and key statistics.
            </p>
          </div>

          {/* Chart Section */}
          <div className="rounded-xl bg-muted/50 p-4 shadow-sm">
            <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-gray-100">
              User Growth (Owners & Tenants)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              The chart below displays month-by-month growth in the number of
              Owners and Tenants registered on the platform.
            </p>
            <div className="w-full h-72 md:h-96">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="tenant"
                      fill="var(--color-tenant)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Owner"
                      fill="var(--color-Owner)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* First Row of Stats */}
          <div className="grid gap-4 md:grid-cols-3 auto-rows-fr">
            {/* Total Owners */}
            <div
              className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6 shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => navigate("/admin/owners")}
            >
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Total Owners
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Number of property owners on the platform
              </p>
              <NumberTicker
                value={allOwners?.length}
                className="whitespace-pre-wrap text-6xl font-bold tracking-tighter text-black dark:text-white"
              />
            </div>

            {/* Total Tenants */}
            <div
              className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6 shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => navigate("/admin/tenants")}
            >
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Total Tenants
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Number of tenants currently using the platform
              </p>
              <NumberTicker
                value={allTenants?.length}
                className="whitespace-pre-wrap text-6xl font-bold tracking-tighter text-black dark:text-white"
              />
            </div>

            {/* Available Rooms */}
            <div
              className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6 shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => navigate("/admin/all-rooms")}
            >
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Available Rooms
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Rooms currently open for rent or booking
              </p>
              <NumberTicker
                value={activeRooms?.length}
                className="whitespace-pre-wrap text-6xl font-bold tracking-tighter text-black dark:text-white"
              />
            </div>
          </div>

          {/* Second Row of Stats */}
          <div className="grid gap-4 md:grid-cols-4 auto-rows-fr">
            {/* Total Requirements */}
            <div
              className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-4 shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => navigate("/admin/all-requirements")}
            >
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Total Requirements
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Current property requests from tenants
              </p>
              <NumberTicker
                value={requirements?.length}
                className="whitespace-pre-wrap text-6xl font-bold tracking-tighter text-black dark:text-white"
              />
            </div>

            {/* Total Settlements (Placeholder) */}
            <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-4 shadow-sm">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Total Settlements
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Successfully closed deals or rentals
              </p>
              <NumberTicker
                value={bookedRooms?.length} // Replace with real settlement data
                className="whitespace-pre-wrap text-6xl font-bold tracking-tighter text-black dark:text-white"
              />
            </div>
          </div>

          {/* Footer Note / Additional Info */}
          <div className="text-center pt-4 border-t border-gray-300 dark:border-gray-700">
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Data is updated daily at 00:00 UTC. For real-time insights, refresh
              the dashboard or check the detailed reports in each section.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
