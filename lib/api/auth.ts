import type { LoginInput } from "@/lib/auth";

// TODO: Replace this with your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Login API response type
 * TODO: Update this to match your actual API response structure
 */
export interface LoginResponse {
  code: string;
  data: {
    userDetails: {
      id: string;
      username: string;
      firstName?: string;
      [key: string]: unknown;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    merchant?: {
      [key: string]: unknown;
    };
  };
}

/**
 * Login API call
 * TODO: Update this function to call your actual login endpoint
 * 
 * Example API call:
 * ```typescript
 * const response = await fetch(`${API_BASE_URL}/auth/login`, {
 *   method: "POST",
 *   headers: {
 *     "Content-Type": "application/json",
 *   },
 *   body: JSON.stringify(credentials),
 * });
 * 
 * if (!response.ok) {
 *   const error = await response.json();
 *   throw new Error(error.message || "Login failed");
 * }
 * 
 * return await response.json() as LoginResponse;
 * ```
 */
export async function login(
  credentials: LoginInput
): Promise<LoginResponse> {
  // TODO: Replace this with your actual API call
  // See example above

  // Temporary mock implementation for UI testing
  return new Promise<LoginResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        code: "Continue",
        data: {
          userDetails: {
            id: "1",
            username: credentials.username,
            firstName: "User",
          },
          accessToken: "mock-token",
          refreshToken: "mock-refresh-token",
          expiresIn: 3600,
        },
      });
    }, 500);
  });
}
