import axios from "axios";
import type { Note } from "../types/note"; // если у тебя есть интерфейс Note

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface NotesResponse {
  results: Note[];
  totalPages: number;
  totalResults: number;
}

export async function fetchNotes(query?: string, page: number = 1): Promise<NotesResponse> {
  const response = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      ...(query ? { query } : {}),
    },
  });
  return response.data;
}
