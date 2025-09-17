import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  deleteNote?: (id: string) => void;
}

export default function NoteList({ notes = [], deleteNote }: NoteListProps) {
  if (notes.length === 0) {
    return null; // нічого не рендеримо, якщо масив пустий

  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button onClick={() => deleteNote?.(note.id)} className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
