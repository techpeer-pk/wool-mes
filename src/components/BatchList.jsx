import React from 'react';
import './BatchList.css';

const BatchList = ({ batches, onUpdateStage }) => {
    if (batches.length === 0) {
        return (
            <div className="empty-state">
                <p>No active batches found. Start by creating a new one!</p>
            </div>
        );
    }

    return (
        <div className="batch-list-container">
            <div className="list-header">
                <h3>Active Production Batches</h3>
            </div>
            <div className="table-responsive">
                <table className="batch-table">
                    <thead>
                        <tr>
                            <th>Batch #</th>
                            <th>Current Stage</th>
                            <th>Weight (Current/Initial)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches.map(batch => (
                            <tr key={batch.id}>
                                <td className="batch-num">{batch.batchNumber}</td>
                                <td>
                                    <div className="stage-badge">
                                        Stage {batch.currentStage}
                                    </div>
                                </td>
                                <td>{batch.currentWeight}kg / {batch.initialWeight}kg</td>
                                <td>
                                    <span className={`status-tag ${batch.status.toLowerCase().replace(' ', '-')}`}>
                                        {batch.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-btn" onClick={() => onUpdateStage(batch)}>
                                        Update Stage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BatchList;
