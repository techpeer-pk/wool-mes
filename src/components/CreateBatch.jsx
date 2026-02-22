import React, { useState } from 'react';
import './CreateBatch.css';

const CreateBatch = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        batchNumber: `WB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        initialWeight: '',
        sourceSupplier: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            id: Date.now().toString(),
            currentStage: 1,
            currentWeight: parseFloat(formData.initialWeight),
            status: 'In Progress',
            startDate: new Date().toISOString()
        });
        onCancel();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Batch</h2>
                    <button className="close-btn" onClick={onCancel}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Batch Number</label>
                        <input
                            type="text"
                            value={formData.batchNumber}
                            readOnly
                            className="readonly"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Initial Weight (kg)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.initialWeight}
                                onChange={(e) => setFormData({ ...formData, initialWeight: e.target.value })}
                                required
                                placeholder="0.00"
                            />
                        </div>
                        <div className="form-group">
                            <label>Source Supplier</label>
                            <input
                                type="text"
                                value={formData.sourceSupplier}
                                onChange={(e) => setFormData({ ...formData, sourceSupplier: e.target.value })}
                                placeholder="Farm/Supplier Name"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any special instructions..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="primary-btn">Create Batch</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBatch;
