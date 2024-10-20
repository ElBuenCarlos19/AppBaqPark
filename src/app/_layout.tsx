import { Slot } from "expo-router";
import { AuthenticationProvider } from "./auth/AuthenticationContext";

export default function Layout() {
  return (
    <AuthenticationProvider>
    <Slot />
    </AuthenticationProvider>
  );
}