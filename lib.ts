const baseUrl = "https://api.bexio.com";

export async function request<T>(
  pathname: string,
  method: string,
  body?: T
): Promise<Response> {
  return await fetch(`${baseUrl}${pathname}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${Deno.env.get("BEXIO_API_TOKEN")}`,
      Accept: "application/json",
    },
  });
}
