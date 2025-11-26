const { useState, useEffect } = React;

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [currentView, setCurrentView] = useState('dashboard');

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

    // Handle export/import actions
    useEffect(() => {
        if (currentView === 'export-json') {
            DataExport.exportToJSON(tasks);
            setCurrentView('dashboard');
        } else if (currentView === 'export-csv') {
            DataExport.exportToCSV(tasks);
            setCurrentView('dashboard');
        } else if (currentView === 'import-json') {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    DataExport.importFromJSON(file, (importedTasks, error) => {
                        if (error) {
                            alert('Import Error: ' + error);
                        } else {
                            const confirmed = confirm(
                                `Import ${importedTasks.length} tasks?\n\n` +
                                'This will replace your current tasks. Continue?'
                            );
                            if (confirmed) {
                                setTasks(importedTasks);
                                alert(`Successfully imported ${importedTasks.length} tasks!`);
                            }
                        }
                    });
                }
            };
            input.click();
            setCurrentView('dashboard');
        }
    }, [currentView, tasks]);

    const addTask = (taskText, priority, dueDate, category, tags) => {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString(),
            dueDate: dueDate,
            category: category,
            tags: tags || [],
            creator: 'You'
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

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    const filteredTasks = tasks.filter(task => {
        // Status filter
        if (filter === 'active' && task.completed) return false;
        if (filter === 'completed' && !task.completed) return false;

        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

        // Search filter
        if (searchTerm && !task.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;

        return true;
    });

    const handleBulkAction = (action) => {
        if (action === 'markAllComplete') {
            setTasks(tasks.map(t => ({ ...t, completed: true })));
        } else if (action === 'deleteCompleted') {
            if (confirm('Delete all completed tasks?')) {
                setTasks(tasks.filter(t => !t.completed));
            }
        } else if (action === 'markAllImportant') {
            setTasks(tasks.map(t => ({ ...t, priority: 'high' })));
        }
    };

    const handleExport = () => setCurrentView('export-json');
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            DataExport.importFromJSON(file, (importedTasks, error) => {
                if (error) {
                    alert('Import Error: ' + error);
                } else {
                    if (confirm(`Import ${importedTasks.length} tasks? This will replace current tasks.`)) {
                        setTasks(importedTasks);
                    }
                }
            });
        }
    };

    return (
        <div className={`dashboard ${currentView === 'grid' ? 'view-grid' : ''}`}>
            {/* Particle Stars */}
            <div className="stars">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* 3D Gradient Blobs */}
            <div className="gradient-blob blob-1"></div>
            <div className="gradient-blob blob-2"></div>
            <div className="gradient-blob blob-3"></div>

            <Sidebar currentView={currentView} onViewChange={setCurrentView} />

            <div className="main-wrapper">
                <Header
                    onSearch={setSearchTerm}
                    onPriorityFilter={setPriorityFilter}
                    searchTerm={searchTerm}
                    priorityFilter={priorityFilter}
                />

                <div className="content">
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
                        {tasks.some(t => t.completed) && (
                            <button
                                className="filter-btn clear-btn"
                                onClick={clearCompleted}
                                style={{ marginLeft: 'auto', background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)' }}
                            >
                                Clear Completed
                            </button>
                        )}
                    </div>

                    <TaskList
                        tasks={filteredTasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={editTask}
                        viewMode={currentView}
                    />

                    {tasks.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">★</div>
                            <p>No tasks yet. Create your first one!</p>
                        </div>
                    )}

                    {tasks.length > 0 && filteredTasks.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">⌕</div>
                            <p>No tasks match your filters</p>
                        </div>
                    )}
                </div>
            </div>

            <CommandBar
                tasks={tasks}
                onBulkAction={handleBulkAction}
                onViewChange={setCurrentView}
                onExport={handleExport}
                onImport={handleImport}
            />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
