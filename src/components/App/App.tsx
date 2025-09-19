import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import type { NotesResponse } from "../../services/noteService";
import { fetchNotes } from "../../services/noteService";
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from './App.module.css';


function App() {


  const [isOpenModal, setIsOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    enabled: true,
    placeholderData: (prev) => prev,
  });

useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

const handleSearch = (value: string) => {
  setQuery(value);

  };


  const handlePageChange = (page: number) => {
  setCurrentPage(page);
  }


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox handleSearch={handleSearch} />}
          {data && data.totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />)}
          <button
            className={css.button}
            onClick={() => setIsOpenModal(true)}
          >
            Create note +
          </button>
        </header>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading notes</p>}
        {data && <NoteList notes={data.notes}/>}


      </div>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onCancel={() => setIsOpenModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default App;
