function Stats({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                    <div className="stat-value">{total}</div>
                    <div className="stat-label">Total Tasks</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                    <div className="stat-value">{active}</div>
                    <div className="stat-label">Active</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                    <div className="stat-value">{completed}</div>
                    <div className="stat-label">Completed</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                    <div className="stat-value">{completionRate}%</div>
                    <div className="stat-label">Progress</div>
                </div>
            </div>
        </div>
    );
}
