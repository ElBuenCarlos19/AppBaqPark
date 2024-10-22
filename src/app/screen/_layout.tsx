import TabsBar from "../_components/TabsBar";
import { UserModalProvider } from "../_components/userModalDisplayContext";
export default function Layout() {
  return (
    <UserModalProvider>
      <TabsBar />
    </UserModalProvider>
  );
}
