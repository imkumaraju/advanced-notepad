import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainEditor from './components/MainEditor'
import type { Note } from './types'
import { HelpCenter, CloudBackup } from './components/Modals'
import { storageService } from './services/storage'
import { authService } from './services/auth'
import { backupService } from './services/backup'
import type { User } from 'firebase/auth'
import './App.css'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showBackup, setShowBackup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Auth Listener
  useEffect(() => {
    return authService.onAuthChange((user) => {
      setUser(user);
    });
  }, []);

  // Load notes on mount
  useEffect(() => {
    const loadNotes = async () => {
      const savedNotes = await storageService.getNotes();
      if (savedNotes.length > 0) {
        setNotes(savedNotes);
        setActiveNoteId(savedNotes[0].id);
      } else {
        const quickNote: Note = {
          id: 'quick-note',
          title: 'QUICK NOTE',
          content: '<p>You can write some stuff here :)</p>',
          updatedAt: Date.now(),
        };
        setNotes([quickNote]);
        setActiveNoteId('quick-note');
      }
      setIsLoading(false);
    };
    loadNotes();
  }, []);

  // Save notes whenever they change
  useEffect(() => {
    if (!isLoading) {
      storageService.saveNotes(notes);
    }
  }, [notes, isLoading]);

  const activeNote = notes.find(n => n.id === activeNoteId) || null;

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled ' + (notes.length),
      content: '',
      updatedAt: Date.now(),
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (content: string) => {
    if (!activeNoteId) return;

    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === activeNoteId) {
        // Auto-rename logic: first 10 chars of text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const text = tempDiv.textContent || '';
        const newTitle = text.slice(0, 15).trim() || note.title;

        return {
          ...note,
          content,
          title: activeNoteId === 'quick-note' ? 'QUICK NOTE' : (newTitle || 'Untitled'),
          updatedAt: Date.now(),
        };
      }
      return note;
    }));
  };

  const handleDeleteNote = (id: string) => {
    if (id === 'quick-note') return; // Cannot delete quick note
    if (window.confirm('Are you sure you want to delete this note?')) {
      const newNotes = notes.filter(n => n.id !== id);
      setNotes(newNotes);
      if (activeNoteId === id) {
        setActiveNoteId('quick-note');
      }
    }
  };

  const handleBackup = async () => {
    if (!user) return;
    try {
      const response = await backupService.backupToS3(user.uid, notes);
      alert(`Backup successful! ID: ${response.backupId}`);
    } catch (e) {
      alert('Backup failed. See console for details.');
      console.error(e);
    }
  };

  const handleRestore = async (backupId: string) => {
    if (!backupId) return;
    try {
      const restoredNotes = await backupService.restoreFromS3(backupId);
      if (restoredNotes && restoredNotes.length > 0) {
        setNotes(restoredNotes);
        alert('Restore successful!');
      } else {
        alert('No data found for this ID.');
      }
    } catch (e) {
      alert('Restore failed.');
      console.error(e);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-layout">
        <Sidebar
          notes={notes}
          activeNoteId={activeNoteId}
          onSelectNote={setActiveNoteId}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          onQuickNote={() => setActiveNoteId('quick-note')}
        />
        <div className="editor-area">
          {activeNote && (
            <MainEditor
              key={activeNote.id}
              content={activeNote.content}
              onChange={handleUpdateNote}
              onShowHelp={() => setShowHelp(true)}
              onShowBackup={() => setShowBackup(true)}
            />
          )}
        </div>
      </div>

      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Help Center</h2>
              <button onClick={() => setShowHelp(false)}>×</button>
            </div>
            <div className="modal-body">
              <HelpCenter />
            </div>
          </div>
        </div>
      )}

      {showBackup && (
        <div className="modal-overlay" onClick={() => setShowBackup(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cloud Backup</h2>
              <button onClick={() => setShowBackup(false)}>×</button>
            </div>
            <div className="modal-body">
              <CloudBackup
                user={user}
                onLoginGoogle={authService.signInWithGoogle}
                onLoginGithub={authService.signInWithGithub}
                onLoginMicrosoft={authService.signInWithMicrosoft}
                onLogout={authService.logout}
                onBackup={handleBackup}
                onRestore={handleRestore}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
