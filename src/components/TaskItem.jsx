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
        low: 'rgb(16, 185, 129)',
        medium: 'rgb(245, 158, 11)',
        high: 'rgb(239, 68, 68)'
    };

    const getTaskDescription = () => {
        const descriptions = {
            high: 'High priority task requiring immediate attention and focus.',
            medium: 'Standard priority task to be completed in due course.',
            low: 'Low priority task that can be scheduled flexibly.'
        };
        return descriptions[task.priority] || 'Task to be completed.';
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-icon-wrapper">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
            </div>

            <div className="task-content">
                <div className="task-header">
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
                        <h3
                            className="task-text"
                            onDoubleClick={() => !task.completed && setIsEditing(true)}
                        >
                            {task.text}
                        </h3>
                    )}
                </div>

                <p className="task-description">
                    {getTaskDescription()}
                </p>

                <div className="task-footer">
                    <span className="task-creator">
                        Created by <strong>{task.creator || 'You'}</strong>
                    </span>
                    <span
                        className="priority-badge"
                        style={{ backgroundColor: priorityColors[task.priority] }}
                    >
                        {task.priority}
                    </span>
                </div>
            </div>

            <div className="task-actions">
                {!task.completed && (
                    <button
                        className="action-btn edit-btn"
                        onClick={() => setIsEditing(true)}
                        title="Edit task"
                    >
                        ✎
                    </button>
                )}
                <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(task.id)}
                    title="Delete task"
                >
                    ×
                </button>
            </div>

            <button className="task-arrow" onClick={() => onToggle(task.id)}>
                {task.completed ? '✓' : '→'}
            </button>
        </div>
    );
}
