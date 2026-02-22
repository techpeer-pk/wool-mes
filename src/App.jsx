import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useBatches } from './hooks/useBatches'
import Login from './pages/Login'
import CreateBatch from './components/CreateBatch'
import BatchList from './components/BatchList'
import UpdateStage from './components/UpdateStage'
import './App.css'

function AppContent() {
    const { user, logout } = useAuth();
    const { batches, loading, addBatch, updateBatch } = useBatches();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedBatchForUpdate, setSelectedBatchForUpdate] = useState(null);

    if (!user) {
        return <Login />;
    }

    if (loading) {
        return <div className="loading-screen">Loading MES Dashboard...</div>;
    }

    const handleAddBatch = async (newBatch) => {
        try {
            await addBatch(newBatch);
            setShowCreateModal(false);
        } catch (err) {
            console.error("Error adding batch:", err);
            alert("Failed to create batch. Please check Firestore permissions.");
        }
    };

    const handleUpdateStage = (batch) => {
        setSelectedBatchForUpdate(batch);
    };

    const calculateTotalWeight = () => {
        return batches.reduce((sum, b) => sum + (parseFloat(b.currentWeight) || 0), 0);
    };

    const calculateAvgLoss = () => {
        if (batches.length === 0) return 0;
        const totalInitial = batches.reduce((sum, b) => sum + (parseFloat(b.initialWeight) || 0), 0);
        const totalCurrent = calculateTotalWeight();
        if (totalInitial === 0) return 0;
        return (((totalInitial - totalCurrent) / totalInitial) * 100).toFixed(1);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-top">
                    <div className="logo-section">
                        <h1>Wool Production MES</h1>
                        <span className="user-badge">{user.email}</span>
                    </div>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </header>

            <main className="dashboard">
                <div className="dashboard-grid">
                    <div className="stat-card">
                        <h3>Active Batches</h3>
                        <p className="stat-num">{batches.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Weight (kg)</h3>
                        <p className="stat-num">
                            {calculateTotalWeight().toFixed(2)}
                        </p>
                    </div>
                    <div className="stat-card">
                        <h3>Avg. Loss %</h3>
                        <p className="stat-num">~{calculateAvgLoss()}%</p>
                    </div>
                </div>

                <div className="dashboard-actions">
                    <button
                        className="primary-btn pulse"
                        onClick={() => setShowCreateModal(true)}
                    >
                        + Create New Batch
                    </button>
                </div>

                <BatchList
                    batches={batches}
                    onUpdateStage={handleUpdateStage}
                />
            </main>

            {showCreateModal && (
                <CreateBatch
                    onAdd={handleAddBatch}
                    onCancel={() => setShowCreateModal(false)}
                />
            )}

            {selectedBatchForUpdate && (
                <UpdateStage
                    batch={selectedBatchForUpdate}
                    onUpdate={updateBatch}
                    onCancel={() => setSelectedBatchForUpdate(null)}
                />
            )}
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    )
}

export default App
