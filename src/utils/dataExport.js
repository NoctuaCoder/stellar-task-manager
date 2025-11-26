// Data Export/Import Utilities for Stellar Task Manager

window.DataExport = {
    // Export tasks to JSON
    exportToJSON: (tasks) => {
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `stellar-tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },

    // Export tasks to CSV
    exportToCSV: (tasks) => {
        const headers = ['ID', 'Task', 'Priority', 'Category', 'Due Date', 'Tags', 'Completed', 'Created At'];
        const rows = tasks.map(task => [
            task.id,
            `"${task.text.replace(/"/g, '""')}"`,
            task.priority,
            task.category || '',
            task.dueDate || '',
            task.tags ? task.tags.join(';') : '',
            task.completed ? 'Yes' : 'No',
            task.createdAt
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const dataBlob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `stellar-tasks-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    },

    // Import tasks from JSON
    importFromJSON: (file, callback) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const tasks = JSON.parse(e.target.result);
                if (Array.isArray(tasks)) {
                    callback(tasks, null);
                } else {
                    callback(null, 'Invalid JSON format');
                }
            } catch (error) {
                callback(null, 'Error parsing JSON: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
};
