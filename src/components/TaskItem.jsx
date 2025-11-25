const { useState } = React;

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        if (editText.trim() && editText !== task.text) {
            onEdit(task.id, editText.trim());
        }
        setIsEditing(false);
    };

    const priorityColors = {
        low: '#00BFFF',
        medium: '#FFD700',
        high: '#FF1493'
    };

    return (
        <div className={`task-item glass-panel ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />

                {isEditing ? (
                    <input
                        type="text"
                        className="task-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEdit}
                        onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
                        autoFocus
                    />
                ) : (
                    <span
                        className="task-text"
                        onDoubleClick={() => !task.completed && setIsEditing(true)}
                    >
                        {task.text}
                    </span>
                )}

                <span
                    className="priority-badge"
                    style={{ backgroundColor: priorityColors[task.priority] }}
                >
                    {task.priority}
                </span>
            </div>

            <div className="task-actions">
                {!task.completed && (
                    <button
                        className="action-btn edit-btn"
                        onClick={() => setIsEditing(true)}
                        title="Edit task"
                    >
                        ✏️
                    </button>
                )}
                <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(task.id)}
                    title="Delete task"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}
