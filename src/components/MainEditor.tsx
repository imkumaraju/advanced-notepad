import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    AlignLeft, AlignCenter, List,
    Type, HelpCircle, CloudUpload
} from 'lucide-react';

interface MainEditorProps {
    content: string;
    onChange: (content: string) => void;
    onShowHelp: () => void;
    onShowBackup: () => void;
}

const MainEditor: React.FC<MainEditorProps> = ({ content, onChange, onShowHelp, onShowBackup }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="editor-container">
            <div className="toolbar">
                <div className="toolbar-group">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>
                        <Bold size={18} />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>
                        <Italic size={18} />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}>
                        <UnderlineIcon size={18} />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'active' : ''}>
                        <Strikethrough size={18} />
                    </button>
                </div>
                <div className="toolbar-groupDivider"></div>
                <div className="toolbar-group">
                    <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}>
                        <AlignLeft size={18} />
                    </button>
                    <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}>
                        <AlignCenter size={18} />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>
                        <List size={18} />
                    </button>
                </div>
                <div className="toolbar-groupDivider"></div>
                <div className="toolbar-group">
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>
                        <Type size={18} />
                    </button>
                </div>
                <div className="toolbar-right">
                    <span className="format-notes-text">FORMAT NOTES</span>
                </div>
            </div>

            <div className="editor-content-area">
                <EditorContent editor={editor} />
            </div>

            <div className="editor-footer">
                <div className="footer-right">
                    <button onClick={onShowBackup} title="Cloud Backup">
                        <CloudUpload size={20} />
                    </button>
                    <button onClick={onShowHelp} title="Help Center">
                        <HelpCircle size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainEditor;
