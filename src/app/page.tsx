import { Divider } from "@mui/material";
import Dashboard from "./dashboard/page";
import IntegrationsPage from "./integrations/page";

export default function Home() {
  return (
    <>
    <Dashboard />
    <Divider sx={{ my: 4 }} />
    <IntegrationsPage />
    </>
  );
}
