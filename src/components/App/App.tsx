import { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/Notelist';
import css from './App.module.css';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {/* Пагінація */}
          <button
            className={css.button}
            onClick={() => setIsOpenModal(true)}
          >
            Create note +
          </button>
        </header>

        <NoteList
          notes={[
            {
              id: '1',
              title: 'Перша нотатка',
              content: 'Це зміст першої нотатки',
              tag: 'Work',
              createdAt: '2024-10-01T10:00:00Z',
              updatedAt: '2024-10-01T10:00:00Z',
            },
          ]}
        />
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
