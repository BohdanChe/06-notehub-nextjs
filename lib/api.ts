import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  },
});

// API повертає: { notes: Note[], totalPages: number }
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}


export const fetchNotes = async (searchText: string, page: number) => {
  const response = await axiosInstance.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchText !== '' && { search: searchText }),
      page,
      perPage: 12,
    },
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>('/notes', note);
  return response.data;
};

// Дозволяємо id бути number або string
export const deleteNote = async (id: number| string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};


export async function fetchNoteById(id: number | string): Promise<Note> {
  console.log('fetchNoteById called with id:', id);
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
}

export const getSingleNote = async (id: string) => {
  const { data } = await axios.get<Note>(`/notes/${id}`)
  return data
}