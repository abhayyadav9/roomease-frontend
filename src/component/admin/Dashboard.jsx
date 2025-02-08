import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllOwner from "../../hooks/useGetAllOwner";
import useGetAllTenant from "../../hooks/useGetAllTenant";
import useGetAllRequirements from "../../hooks/useGetAllRequirement";
import useGetAllRooms from "../../hooks/useGetAllRooms";



import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  useGetAllOwner();
  useGetAllTenant();
  useGetAllRequirements();
  useGetAllRooms();
  const rooms = useSelector((state) => state.room.room);
  const allOwners = useSelector((state) => state.allOwner?.allOwnerData);
  const allTenants = useSelector((state) => state.allTenant?.allTenantData);

  const requirements = useSelector(
    (state) => state.requirement.requirements.requirement.requirements
  ); // ✅ Corrected state access
  const navigate = useNavigate();

const numberOfOwner=allOwners?.length || 5;
const numberOfTenant=allTenants?.length ||10

  const chartData = [
    { month: "January",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "February",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "March",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "April",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "May",tenant:numberOfTenant, Owner: numberOfOwner},
    { month: "June",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "July",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "August",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "september",tenant:numberOfTenant, Owner: numberOfOwner},
    { month: "octuber",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "november",tenant:numberOfTenant, Owner: numberOfOwner },
    { month: "December",tenant:numberOfTenant, Owner: numberOfOwner },
  ];
  return (
    <div>
      <SidebarProvider>
        <SidebarInset>
          <div className="flex mt-16 flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">


              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="tenant"
                    fill="var(--color-tenant)"
                    radius={4}
                  />
                  <Bar dataKey="Owner" fill="var(--color-Owner)" radius={4} />
                </BarChart>
              </ChartContainer>


            </div>

            <div className="grid gap-4 md:grid-cols-3 auto-rows-fr">
              {/* Total Owner Card */}
              <div
                className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6"
                onClick={() => navigate("/admin/owners")}
              >
                <h1 className="text-4xl font-semibold">Total Owner</h1>
                <NumberTicker
                  value={allOwners?.length}
                  className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                />
              </div>

              {/* Total Tenant Card */}
              <div
                className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6
              "
                onClick={() => navigate("/admin/tenants")}
              >
                <h1 className="text-4xl font-semibold">Total Tenant</h1>
                <NumberTicker
                  value={allTenants?.length}
                  className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                />
              </div>

              {/* Available Rooms Card */}
              <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6"
                onClick={() => navigate("/admin/all-rooms")}
              >
                <h1 className="text-3xl font-semibold">Available Rooms</h1>
                <NumberTicker
                  value={rooms?.length}
                  className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <SidebarProvider>
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              {/* Requirement Card */}
              <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6"
               onClick={() => navigate("/admin/all-requirements")}
              
              
              >
                <h1 className="text-xl font-semibold">Total Requirements</h1>
                <NumberTicker
                  value={requirements?.length}
                  className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                />
              </div>
              {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
              <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-muted/50 p-6">
                <h1 className="text-xl font-semibold">Total Settlement</h1>
                <NumberTicker
                  value={requirements?.length}
                  className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
