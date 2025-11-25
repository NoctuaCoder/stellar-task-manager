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

    const getCategoryColor = () => {
        const colors = {
            personal: '#3b82f6',
            work: '#8b5cf6',
            study: '#06b6d4',
            health: '#10b981',
            shopping: '#f59e0b'
        };
        return colors[task.category] || '#3b82f6';
    };

    const formatDueDate = () => {
        if (!task.dueDate) return '';
        const date = new Date(task.dueDate);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const getDueDateClass = () => {
        if (!task.dueDate) return '';
        const date = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date < today) return 'overdue';
        if (date.toDateString() === today.toDateString()) return 'due-today';
        return '';
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
                    <div className="task-meta">
                        {task.dueDate && (
                            <span className={`due-date ${getDueDateClass()}`} title="Due Date">
                                📅 {formatDueDate()}
                            </span>
                        )}
                        <span className="task-creator">
                            Created by <strong>{task.creator || 'You'}</strong>
                        </span>
                    </div>
                    <div className="task-badges">
                        <span
                            className="category-badge"
                            style={{ backgroundColor: getCategoryColor() }}
                            title="Category"
                        >
                            {task.category || 'personal'}
                        </span>
                        <span
                            className="priority-badge"
                            style={{ backgroundColor: priorityColors[task.priority] }}
                        >
                            {task.priority}
                        </span>
                        {task.tags && task.tags.length > 0 && (
                            <div className="task-tags">
                                {task.tags.map((tag, index) => (
                                    <span key={index} className="tag-badge" title="Tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
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
