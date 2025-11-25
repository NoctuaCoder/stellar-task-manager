const { useState } = React;

function TaskForm({ onAddTask }) {
    const [taskText, setTaskText] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            onAddTask(taskText.trim(), priority);
            setTaskText('');
            setPriority('medium');
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
                <select
                    className="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" className="add-btn">
                    <span>+</span> Add Task
                </button>
            </div>
        </form>
    );
}
