function TaskList({ tasks, onToggle, onDelete, onEdit, viewMode }) {
    return (
        <div className={`task-list ${viewMode === 'grid' ? 'grid-view' : ''}`}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
