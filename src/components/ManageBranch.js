// src/components/ManageBranch.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './../ContentStyles.css';

function ManageBranch({ onAddBranch, branches, onEditBranch }) {
    const { branchId } = useParams();
    const navigate = useNavigate();
    const isEditing = branchId !== undefined;
    const initialBranch = isEditing ? branches[branchId] : {};

    const [branch, setBranch] = useState(initialBranch);

    useEffect(() => {
        if (isEditing) {
            setBranch(branches[branchId]);
        }
    }, [branchId, branches]);

    const handleChange = (e) => {
        setBranch({ ...branch, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onEditBranch(branch, parseInt(branchId, 10)); // Parse branchId to integer
        } else {
            onAddBranch(branch);
        }
        navigate('/branches');
    };

    return (
        <div className="content-container">
            <h1>{isEditing ? "Edit Branch" : "Manage Branch"}</h1>
            <form onSubmit={handleSubmit} className="manage-branch-form">
                {/* 1. Branch Details */}
                <h2>Branch Details</h2>
                <input type="text" name="branchCode" placeholder="Branch Code *" value={branch.branchCode || ''} onChange={handleChange} required />
                <input type="text" name="branchName" placeholder="Branch Name *" value={branch.branchName || ''} onChange={handleChange} required />
                <input type="text" name="branchShortName" placeholder="Branch Short Name *" value={branch.branchShortName || ''} onChange={handleChange} required />
                <input type="text" name="doorNo" placeholder="Door/Flat/House No" value={branch.doorNo || ''} onChange={handleChange} />
                <input type="text" name="street" placeholder="Street" value={branch.street || ''} onChange={handleChange} />
                <input type="text" name="pincode" placeholder="Pincode *" value={branch.pincode || ''} onChange={handleChange} required />
                <input type="text" name="locality" placeholder="Locality *" value={branch.locality || ''} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City *" value={branch.city || ''} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State *" value={branch.state || ''} onChange={handleChange} required />
                <input type="text" name="panNo" placeholder="PAN No" value={branch.panNo || ''} onChange={handleChange} />
                <input type="text" name="gstin" placeholder="GSTIN" value={branch.gstin || ''} onChange={handleChange} />
                <select name="branchType" value={branch.branchType || ''} onChange={handleChange}>
                    <option value="">Select Branch Type</option>
                    <option value="branch">Branch</option>
                    <option value="vehicleType">Vehicle Type</option>
                </select>

                {/* 2. Branch Contact Details */}
                <h2>Branch Contact Details</h2>
                <input type="tel" name="contactNo" placeholder="Contact No" value={branch.contactNo || ''} onChange={handleChange} />
                <input type="tel" name="alternateContactNo" placeholder="Alternate Contact No" value={branch.alternateContactNo || ''} onChange={handleChange} />
                <input type="tel" name="whatsappNumber" placeholder="Whatsapp Number" value={branch.whatsappNumber || ''} onChange={handleChange} />
                <input type="email" name="emailId" placeholder="Email Id" value={branch.emailId || ''} onChange={handleChange} />

                {/* 3. Branch Incharge Details */}
                <h2>Branch Incharge Details</h2>
                <input type="text" name="inchargeName" placeholder="Branch Incharge Name" value={branch.inchargeName || ''} onChange={handleChange} />
                <input type="tel" name="inchargeContactNo" placeholder="Contact No" value={branch.inchargeContactNo || ''} onChange={handleChange} />
                <input type="tel" name="inchargeAlternateContactNo" placeholder="Alternate Contact No" value={branch.inchargeAlternateContactNo || ''} onChange={handleChange} />
                <input type="tel" name="inchargeWhatsappNumber" placeholder="Whatsapp Number" value={branch.inchargeWhatsappNumber || ''} onChange={handleChange} />
                <input type="email" name="inchargeEmailId" placeholder="Email Id" value={branch.inchargeEmailId || ''} onChange={handleChange} />

                {/* 4. Contact Person Details */}
                <h2>Contact Person Details</h2>
                <input type="text" name="contactPersonName" placeholder="Contact Person Name" value={branch.contactPersonName || ''} onChange={handleChange} />
                <input type="tel" name="contactPersonContactNo" placeholder="Contact No" value={branch.contactPersonContactNo || ''} onChange={handleChange} />
                <input type="tel" name="contactPersonAlternateContactNo" placeholder="Alternate Contact No" value={branch.contactPersonAlternateContactNo || ''} onChange={handleChange} />
                <input type="tel" name="contactPersonWhatsappNumber" placeholder="Whatsapp Number" value={branch.contactPersonWhatsappNumber || ''} onChange={handleChange} />
                <input type="email" name="contactPersonEmailId" placeholder="Email Id" value={branch.contactPersonEmailId || ''} onChange={handleChange} />

                {/* 5. Opening Details */}
                <h2>Opening Details</h2>
                <input type="number" name="openingBalance" placeholder="Opening Balance" value={branch.openingBalance || ''} onChange={handleChange} />
                <input type="date" name="openingDate" placeholder="Opening Date" value={branch.openingDate || ''} onChange={handleChange} />

                {/* 6. Advance Request Details */}
                <h2>Advance Request Details</h2>
                <input type="number" name="minimumAmount" placeholder="Minimum Amount" value={branch.minimumAmount || ''} onChange={handleChange} />
                <input type="number" name="maximumAmount" placeholder="Maximum Amount" value={branch.maximumAmount || ''} onChange={handleChange} />
                <input type="number" name="monthlyMaximumAmount" placeholder="Monthly Maximum Amount" value={branch.monthlyMaximumAmount || ''} onChange={handleChange} />
                <input type="number" name="maximumUnsettledAmount" placeholder="Maximum Unsettled Amount" value={branch.maximumUnsettledAmount || ''} onChange={handleChange} />
                <input type="date" name="effectiveDate" placeholder="Effective Date" value={branch.effectiveDate || ''} onChange={handleChange} />

                {/* 7. Bank Details */}
                <h2>Bank Details</h2>
                <input type="text" name="accountNumber" placeholder="Account Number" value={branch.accountNumber || ''} onChange={handleChange} />
                <input type="text" name="accountHolderName" placeholder="Account Holder Name" value={branch.accountHolderName || ''} onChange={handleChange} />
                <input type="text" name="ifscCode" placeholder="IFSC Code" value={branch.ifscCode || ''} onChange={handleChange} />
                <input type="text" name="bankName" placeholder="Bank Name" value={branch.bankName || ''} onChange={handleChange} />
                <input type="text" name="branchNameBank" placeholder="Branch Name" value={branch.branchNameBank || ''} onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ManageBranch;