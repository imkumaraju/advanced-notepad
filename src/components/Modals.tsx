import React from 'react';

export const HelpCenter: React.FC = () => {
    return (
        <div className="help-center">
            <div className="help-section">
                <h3>QUICK NOTE</h3>
                <p>Quick note is more of an handy notepad to jot down something real quick without creating a note. You cannot delete this as it's a special type of a note.</p>
            </div>
            <div className="help-section">
                <h3>CREATE A NOTE</h3>
                <p>In-order to create a new note, you need to click on the <strong>Add a Note</strong> button. Creating a note will automatically name it as <strong>Untitled</strong> with an incremented number.</p>
            </div>
            <div className="help-section">
                <h3>RENAMING A NOTE</h3>
                <p>Note will be renamed automatically once you start writing something in the note. It utilizes the first 15 characters of your note as your note name.</p>
            </div>
            <div className="help-section">
                <h3>FORMATTING NOTES</h3>
                <p>There are multiple formatting options provided in the toolbar. Use them to stylize your notes.</p>
            </div>
        </div>
    );
};

interface CloudBackupProps {
    onBackup: () => void;
    onRestore: (id: string) => void;
}

export const CloudBackup: React.FC<CloudBackupProps> = ({
    onBackup, onRestore
}) => {
    const [backupId, setBackupId] = React.useState('');

    return (
        <div className="cloud-backup">
            <div className="backup-row">
                <div className="backup-col">
                    <h3>BACKUP</h3>
                    <p>Last Backup: <strong>Never</strong></p>
                    <p>Backup ID: <strong>Backup the data first</strong></p>
                    <button className="backup-btn" onClick={onBackup}>BACKUP ALL DATA</button>
                </div>
                <div className="backup-col">
                    <h3>RESTORE</h3>
                    <input
                        type="text"
                        placeholder="Put your Backup ID here"
                        value={backupId}
                        onChange={(e) => setBackupId(e.target.value)}
                    />
                    <button className="recover-btn" onClick={() => onRestore(backupId)}>RECOVER</button>
                </div>
            </div>
            <div className="backup-footer">
                <span>Powered by AWS S3</span>
            </div>
        </div>
    );
};
