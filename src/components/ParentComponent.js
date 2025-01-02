
// ParentComponent.js (Parent Component)
import React, { useState, useEffect } from 'react'; // Import React here
import Branches from './Branches';
import { v4 as uuidv4 } from 'uuid';

const ParentComponent = () => { // Correct syntax
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const initialData = [
            { id: uuidv4(), branchName: 'Branch 1', branchShortName: 'B1', locality: 'Locality 1', city: 'City 1', state: 'State 1', contactPersonName: 'Person 1', contactPersonContactNo: '1234567890', panNo: 'PAN123', gstin: 'GST123', status: 'Active' },
            { id: uuidv4(), branchName: 'Branch 2', branchShortName: 'B2', locality: 'Locality 2', city: 'City 2', state: 'State 2', contactPersonName: 'Person 2', contactPersonContactNo: '0987654321', panNo: 'PAN456', gstin: 'GST456', status: 'Inactive' },
        ];
        setBranches(initialData);
    }, []);

    const handleEditBranch = (updatedBranch) => {
        setBranches(branches.map(branch => branch.id === updatedBranch.id ? updatedBranch : branch));
    };

    const handleAddBranch = (newBranches) => {
        setBranches([...branches, ...newBranches]);
    };

    const handleDeleteBranch = (idsToDelete) => {
        setBranches(branches.filter(branch => !idsToDelete.includes(branch.id)));
    };

    return (
        <div>
            <Branches
                branches={branches}
                onEditBranch={handleEditBranch}
                onAddBranch={handleAddBranch}
                onDeleteBranch={handleDeleteBranch}
            />
        </div>
    );
}; // Closing parenthesis for the functional component

export default ParentComponent;