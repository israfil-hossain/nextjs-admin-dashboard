import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/store";
import Cookies from "js-cookie";

export const useAuthEffect = () => {
  const { clearUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthToken = () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          // You might want to decode the token or check its expiry manually if needed
          const expirationDate = JSON.parse(atob(token.split(".")[1])).exp;
          if (expirationDate * 1000 < Date.now()) {
            clearUser();
            Cookies.remove("authToken");
            // Only redirect if not already on the login page
            if (pathname !== "/" && pathname !== "/auth/signin") {
              router.push("/");
            }
          }
        } catch (error) {
          // Invalid token format
          clearUser();
          Cookies.remove("authToken");
        }
      }
      // Don't redirect if already on the login page and no token
    };

    checkAuthToken();
  }, [clearUser, router, pathname]);
};
