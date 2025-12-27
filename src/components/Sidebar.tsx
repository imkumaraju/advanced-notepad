import React from 'react';
import { Plus, Notebook, Trash2 } from 'lucide-react';

interface SidebarProps {
    notes: any[];
    activeNoteId: string | null;
    onSelectNote: (id: string) => void;
    onAddNote: () => void;
    onDeleteNote: (id: string) => void;
    onQuickNote: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ notes, activeNoteId, onSelectNote, onAddNote, onDeleteNote, onQuickNote }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <button className="quick-note-btn" onClick={onQuickNote}>
                    QUICK NOTE
                </button>
            </div>
            <div className="note-list">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
                        onClick={() => onSelectNote(note.id)}
                    >
                        <Notebook size={16} />
                        <span className="note-title">{note.title || 'Untitled'}</span>
                        {note.id !== 'quick-note' && (
                            <button
                                className="delete-note-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteNote(note.id);
                                }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="sidebar-footer">
                <button className="add-note-btn" onClick={onAddNote}>
                    <Plus size={20} />
                    <span>Add a Note</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
