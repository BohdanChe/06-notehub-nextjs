"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import css from "./NoteDetails.module.css";
import type { Note } from '@/types/note';

export async function fetchNoteById(id: number): Promise<Note> {
  const res = await fetch(`/api/notes/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch note with id ${id}`);
  }
  return res.json();
}

export default function NoteDetailsClient() {
  const params = useParams();
  const id = Number(params.id);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
