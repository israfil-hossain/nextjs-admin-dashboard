import { verifyJWT } from "@/utils/jwtUtils";
import { NextRequest } from "next/server";

export async function authenticate(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  if (!token) {
    return { error: "Authentication required!", status: 401 };
  }

  const decoded = await verifyJWT(token);
  if (!decoded) {
    return { error: "Invalid or expired token!", status: 401 };
  }

  return { decoded };
}
