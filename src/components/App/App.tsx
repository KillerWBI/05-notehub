import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { useDebounce } from "use-debounce";
import type { NotesResponse } from "../../services/noteService";
import { fetchNotes } from "../../services/noteService";
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/Notelist';
import SearchBox from "../SearcBox/SearchBox";
import css from './App.module.css';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [query, setQuery] = useDebounce<string>('', 1000);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', query],
    queryFn: () => fetchNotes(query, 1),
    enabled: true, // Виконуємо запит одразу при монтуванні компонента
  });
const handleSearch = (value: string) => {
    setQuery(value);
  };


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox handleSearch={handleSearch} />}
          {/* Пагінація */}
          <button
            className={css.button}
            onClick={() => setIsOpenModal(true)}
          >
            Create note +
          </button>
        </header>
        {isLoading && <p>Loading...</p>}
{error && <p>Error loading notes</p>}
{data && <NoteList notes={data.notes} />}


      </div>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onCancel={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default App;
