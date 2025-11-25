const { useState } = React;

function TaskForm({ onAddTask }) {
    const [taskText, setTaskText] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('personal');
    const [tags, setTags] = useState('');

    const categories = [
        { value: 'personal', label: 'Personal', color: '#3b82f6' },
        { value: 'work', label: 'Work', color: '#8b5cf6' },
        { value: 'study', label: 'Study', color: '#06b6d4' },
        { value: 'health', label: 'Health', color: '#10b981' },
        { value: 'shopping', label: 'Shopping', color: '#f59e0b' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            const tagArray = tags.trim() ? tags.split(',').map(t => t.trim()).filter(t => t) : [];
            onAddTask(taskText.trim(), priority, dueDate || null, category, tagArray);
            setTaskText('');
            setPriority('medium');
            setDueDate('');
            setCategory('personal');
            setTags('');
        }
    };

    return (
        <form className="task-form glass-panel" onSubmit={handleSubmit}>
            <div className="form-row">
                <input
                    type="text"
                    className="task-input"
                    placeholder="What needs to be done?"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    autoFocus
                />
                <button type="submit" className="add-btn">
                    <span>+</span> Add Task
                </button>
            </div>
            <div className="form-row form-row-secondary">
                <select
                    className="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    title="Priority"
                >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                </select>
                <select
                    className="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    title="Category"
                >
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    className="date-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    title="Due Date"
                />
                <input
                    type="text"
                    className="tags-input"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    title="Tags"
                />
            </div>
        </form>
    );
}
