const { useState, useEffect } = React;

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('stellar-tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('stellar-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskText, priority) => {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString()
        };
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id, newText) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="app">
            <div className="noise"></div>
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            <div className="container">
                <header className="header">
                    <h1 className="title">
                        <span className="icon">✨</span>
                        Stellar Task Manager
                    </h1>
                    <p className="subtitle">Organize your universe, one task at a time</p>
                </header>

                <Stats tasks={tasks} />

                <TaskForm onAddTask={addTask} />

                <div className="filter-tabs">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({tasks.length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Active ({tasks.filter(t => !t.completed).length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed ({tasks.filter(t => t.completed).length})
                    </button>
                </div>

                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                />

                {tasks.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">🌟</div>
                        <p>No tasks yet. Create your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
