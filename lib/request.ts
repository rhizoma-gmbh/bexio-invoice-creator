const baseUrl = "https://api.bexio.com";

export async function request<T, R>(
  pathname: string,
  method: string,
  // deno-lint-ignore no-explicit-any
  query: Record<string, any> = {},
  body?: T
): Promise<Response> {
  const params = new URLSearchParams(query).toString();
  const url = new URL(
    `${baseUrl}${pathname}${params ? `?${params.toString()}` : ""}`
  );
  return await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${Deno.env.get("BEXIO_API_TOKEN")}`,
      Accept: "application/json",
    },
  });
}
