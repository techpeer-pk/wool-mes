import React, { useState } from 'react';
import './UpdateStage.css';

const UpdateStage = ({ batch, onUpdate, onCancel }) => {
    const [weightOut, setWeightOut] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Wool stages from plan
    const stages = [
        "Raw Wool Receipt", "Sorting & Grading", "Scouring/Washing",
        "Carding", "Dyeing", "Spinning", "Weaving/Knitting",
        "Finishing", "Cutting & Sewing", "QC & Packaging"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const wOut = parseFloat(weightOut);
        const weightLoss = batch.currentWeight - wOut;
        const lossPercent = ((weightLoss / batch.currentWeight) * 100).toFixed(2);

        const updates = {
            currentStage: Math.min(batch.currentStage + 1, 10),
            currentWeight: wOut,
            status: batch.currentStage === 10 ? 'Completed' : 'In Progress',
            lastUpdateNotes: notes
        };

        // Add to history (would be a separate collection in a real app, keeping it simple for now)
        const historyEntry = {
            stageId: batch.currentStage,
            stageName: stages[batch.currentStage - 1],
            weightIn: batch.currentWeight,
            weightOut: wOut,
            lossPercent: lossPercent,
            date: new Date().toISOString(),
            notes: notes
        };

        const newHistory = batch.history ? [...batch.history, historyEntry] : [historyEntry];

        try {
            await onUpdate(batch.id, { ...updates, history: newHistory });
            onCancel();
        } catch (err) {
            console.error(err);
            alert("Failed to update stage.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Update Stage: {batch.batchNumber}</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>

                <div className="batch-context">
                    <p>Current Stage: <strong>{batch.currentStage} ({stages[batch.currentStage - 1]})</strong></p>
                    <p>Current Weight: <strong>{batch.currentWeight}kg</strong></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Weight Out (kg) - Entering next stage</label>
                        <input
                            type="number"
                            step="0.01"
                            value={weightOut}
                            onChange={(e) => setWeightOut(e.target.value)}
                            required
                            autoFocus
                            placeholder="Enter processed weight"
                        />
                    </div>

                    <div className="form-group">
                        <label>Notes / Issues</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Record any production issues or observations..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Updating...' : 'Move to Next Stage'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStage;
