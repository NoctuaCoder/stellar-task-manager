const { useState, useEffect, useRef } = React;

function CommandBar({ tasks, onBulkAction, onViewChange, onExport, onImport }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activePanel, setActivePanel] = useState('actions'); // actions, filters, settings
    const panelRef = useRef(null);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd/Ctrl + K to toggle
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            // Esc to close
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
            // Number shortcuts when open
            if (isOpen && !isNaN(e.key) && activePanel === 'actions') {
                const num = parseInt(e.key);
                if (num === 1) handleAction('markAllComplete');
                if (num === 2) handleAction('deleteCompleted');
                if (num === 3) handleAction('markAllImportant');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activePanel]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest('.command-bar-trigger')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleAction = (action) => {
        onBulkAction(action);
        // Optional: close after action or keep open? Let's keep open for bulk flows, or close for single actions.
        // For now, keep open to allow multiple actions.
    };

    const togglePanel = () => setIsOpen(!isOpen);

    return (
        <div className="command-bar-container">
            {/* Backdrop */}
            <div className={`command-bar-backdrop ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>

            {/* Floating Trigger Button */}
            <button
                className={`command-bar-trigger ${isOpen ? 'active' : ''}`}
                onClick={togglePanel}
                title="Command Bar (Cmd/Ctrl + K)"
            >
                <div className="trigger-icon">
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    )}
                </div>
            </button>

            {/* Expandable Panel */}
            <div className={`command-bar-panel ${isOpen ? 'open' : ''}`} ref={panelRef}>
                <div className="panel-header">
                    <div className="panel-tabs">
                        <button
                            className={`panel-tab ${activePanel === 'actions' ? 'active' : ''}`}
                            onClick={() => setActivePanel('actions')}
                        >
                            Actions
                        </button>
                        <button
                            className={`panel-tab ${activePanel === 'filters' ? 'active' : ''}`}
                            onClick={() => setActivePanel('filters')}
                        >
                            Filters
                        </button>
                        <button
                            className={`panel-tab ${activePanel === 'settings' ? 'active' : ''}`}
                            onClick={() => setActivePanel('settings')}
                        >
                            Settings
                        </button>
                    </div>
                    <div className="panel-shortcut-hint">
                        <span className="key">⌘</span> <span className="key">K</span>
                    </div>
                </div>

                <div className="panel-content">
                    {activePanel === 'actions' && (
                        <div className="actions-grid">
                            <button className="action-card" onClick={() => handleAction('markAllComplete')}>
                                <div className="action-icon success">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div className="action-info">
                                    <span className="action-title">Complete All</span>
                                    <span className="action-desc">Mark all visible tasks done</span>
                                </div>
                                <span className="action-key">1</span>
                            </button>

                            <button className="action-card" onClick={() => handleAction('deleteCompleted')}>
                                <div className="action-icon danger">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </div>
                                <div className="action-info">
                                    <span className="action-title">Clear Done</span>
                                    <span className="action-desc">Delete completed tasks</span>
                                </div>
                                <span className="action-key">2</span>
                            </button>

                            <button className="action-card" onClick={() => handleAction('markAllImportant')}>
                                <div className="action-icon warning">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                                <div className="action-info">
                                    <span className="action-title">Mark Important</span>
                                    <span className="action-desc">Flag all visible tasks</span>
                                </div>
                                <span className="action-key">3</span>
                            </button>

                            <button className="action-card" onClick={() => window.location.reload()}>
                                <div className="action-icon neutral">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M23 4v6h-6"></path>
                                        <path d="M1 20v-6h6"></path>
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                                    </svg>
                                </div>
                                <div className="action-info">
                                    <span className="action-title">Reload App</span>
                                    <span className="action-desc">Refresh the application</span>
                                </div>
                            </button>
                        </div>
                    )}

                    {activePanel === 'filters' && (
                        <div className="filters-list">
                            <div className="filter-section">
                                <h3>Sort By</h3>
                                <div className="filter-options">
                                    <button className="filter-chip active">Date Created</button>
                                    <button className="filter-chip">Priority</button>
                                    <button className="filter-chip">Alphabetical</button>
                                </div>
                            </div>
                            <div className="filter-section">
                                <h3>Status</h3>
                                <div className="filter-options">
                                    <button className="filter-chip">All</button>
                                    <button className="filter-chip">Active</button>
                                    <button className="filter-chip">Completed</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePanel === 'settings' && (
                        <div className="settings-list">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-title">View Mode</span>
                                    <span className="setting-desc">Change task list layout</span>
                                </div>
                                <div className="view-toggles">
                                    <button className="view-btn active" onClick={() => onViewChange('list')} title="List View">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                        </svg>
                                    </button>
                                    <button className="view-btn" onClick={() => onViewChange('grid')} title="Grid View">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="14" width="7" height="7"></rect>
                                            <rect x="3" y="14" width="7" height="7"></rect>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-title">Data Management</span>
                                    <span className="setting-desc">Export or import your tasks</span>
                                </div>
                                <div className="data-actions">
                                    <button className="btn-small" onClick={onExport}>
                                        Export JSON
                                    </button>
                                    <label className="btn-small btn-outline">
                                        Import
                                        <input type="file" hidden onChange={onImport} accept=".json" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
