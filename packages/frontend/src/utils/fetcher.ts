export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public info?: unknown
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const info = await response.json().catch(() => null);
    throw new FetchError(`An error occurred while fetching the data.`, response.status, info);
  }

  return response.json() as Promise<T>;
}
