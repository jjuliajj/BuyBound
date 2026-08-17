const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: string;
  details: {
    Publisher?: string;
    Pages?: string;
    Language?: string;
    Format?: string;
  };
  file_url: string;
  cover_url: string;
  created_at?: string;
}

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API response is not JSON:", contentType);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("getBooks error:", error);
    return [];
  }
}

export async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API response is not JSON:", contentType);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("getBook error:", error);
    return null;
  }
}
