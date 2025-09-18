import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import type { NotesResponse } from "../../services/noteService";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from './App.module.css';


function App() {
  const queryClient = useQueryClient();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [query, setQuery] = useDebounce<string>('', 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    enabled: true,
  });

useEffect(() => {
    setCurrentPage(1);
  }, [query]);

const handleSearch = (value: string) => {
  setQuery(value);

  };
  const PostMutation = useMutation({
    mutationFn: (data: { title: string; content: string; tag: string }) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  const handlePostNotes = (values: { title: string; content: string; tag: string }) => {
    PostMutation.mutate(values);
    setIsOpenModal(false);
  }

  const handleDeleteNote = (id: string) => {
    deleteMutation.mutate(id);
  }
  const handlePageChange = (page: number) => {
  setCurrentPage(page);
  }


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox handleSearch={handleSearch} />}
          {data && <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />}
          <button
            className={css.button}
            onClick={() => setIsOpenModal(true)}
          >
            Create note +
          </button>
        </header>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading notes</p>}
        {data && <NoteList notes={data.notes} deleteNote={handleDeleteNote} />}


      </div>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm onCancel={() => setIsOpenModal(false)} PostNotes={handlePostNotes} />
        </Modal>
      )}
    </>
  );
}

export default App;
