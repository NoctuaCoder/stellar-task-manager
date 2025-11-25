function Header({ onSearch, onPriorityFilter, searchTerm, priorityFilter }) {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1 className="page-title">My Tasks</h1>
            </div>

            <div className="header-center">
                <div className="filter-group">
                    <select
                        className="filter-select"
                        value={priorityFilter}
                        onChange={(e) => onPriorityFilter(e.target.value)}
                    >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div className="header-right">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <span className="search-icon">⌕</span>
                </div>
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">Noctua Coder</span>
                        <span className="user-role">DEVELOPER</span>
                    </div>
                    <div className="user-avatar">
                        <span className="avatar-text">NC</span>
                        <span className="status-dot"></span>
                    </div>
                </div>
            </div>
        </header>
    );
}
