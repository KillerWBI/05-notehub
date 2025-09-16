// src/services/noteService.ts
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Note } from "../types/note";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

// Тип відповіді для колекції нотаток
export interface NotesResponse {
  results: Note[];
  totalPages: number;
  totalResults: number;
}

// 1. Отримати список нотаток (підтримує пагінацію та пошук)
export async function fetchNotes(
  query?: string,
  page: number = 1
): Promise<NotesResponse> {
  const response: AxiosResponse<NotesResponse> = await api.get("/notes", {
    params: {
      page,
      ...(query ? { query } : {}),
    },
  });
  return response.data;
}

// 2. Створити нову нотатку
export async function createNote(data: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", data);
  return response.data;
}

// 3. Видалити нотатку
export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
