import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, styled, Button, Tooltip } from '@mui/material';
import './../ContentStyles.css';

Modal.setAppElement('#root');

const branchesColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'branchName', headerName: 'Branch Name', width: 150, editable: true },
    { field: 'branchShortName', headerName: 'Branch Short Name', width: 130, editable: true },
    { field: 'locality', headerName: 'Locality', width: 150, editable: true },
    { field: 'city', headerName: 'City', width: 130, editable: true },
    { field: 'state', headerName: 'State', width: 130, editable: true },
    { field: 'contactPersonName', headerName: 'Contact Person', width: 180, editable: true },
    { field: 'contactPersonContactNo', headerName: 'Contact Number', width: 150, editable: true },
    { field: 'panNo', headerName: 'PAN', width: 100, editable: true },
    { field: 'gstin', headerName: 'GST', width: 100, editable: true },
    { field: 'status', headerName: 'Status', width: 100, editable: true },
];

const StyledToolbar = styled(GridToolbarContainer)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    width: '100%'
}));

function CustomToolbar({ numSelected, onDelete }) {
    return (
        <StyledToolbar>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <GridToolbarFilterButton />
            </Box>
        </StyledToolbar>
    );
}

function Branches({ branches, onEditBranch, onAddBranch }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleExportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(branches);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "branches" + fileExtension);
    };

    const handleExportToPdf = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: branchesColumns.map(col => ({ title: col.headerName, dataKey: col.field })),
            body: branches,
        });
        doc.save('branches.pdf');
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                const dataWithIds = data.map((item, index) => ({ ...item, id: branches.length + index }));
                onAddBranch(dataWithIds);
            } catch (error) {
                alert("Error importing file. Please check the file format and data.");
                console.error("Import error:", error);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleExportTemplate = () => {
        const template = branchesColumns.map(col => ({ [col.field]: '' }));
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(template);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "branches_template" + fileExtension);
    };

    const handleRowEditCommit = (params) => {
        const updatedBranch = { ...params.row };
        const indexToUpdate = branches.findIndex(branch => branch.id === params.id);
        if (indexToUpdate !== -1) {
            onEditBranch(updatedBranch, indexToUpdate);
        }
    };

    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };

    const handleDelete = () => {
        if (selectedRows.length === 0) {
            alert('Please select rows to delete');
            return;
        }
        const updatedBranches = branches.filter((branch, index) => !selectedRows.includes(index));
        onEditBranch(updatedBranches);
        setSelectedRows([]);
    };

    return (
        <div className="content-container">
            <h1>Branch</h1>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link to="/manage-branch" className="add-branch-button">
                        +
                    </Link>
                    <Tooltip title={selectedRows.length === 0 ? "Select rows to delete" : `Delete ${selectedRows.length} selected rows`}>
                        <span>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
                                disabled={selectedRows.length === 0}
                            >
                                Delete {selectedRows.length > 0 && `(${selectedRows.length})`}
                            </Button>
                        </span>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={handleExportToExcel}>
                        <CloudDownloadIcon />
                    </IconButton>
                    <IconButton onClick={handleExportToPdf}>
                        <PictureAsPdfIcon />
                    </IconButton>
                    <IconButton>
                        <FilterAltIcon />
                    </IconButton>
                    <IconButton component="label">
                        <UploadFileIcon />
                        <input type="file" accept=".xlsx, .xls" hidden onChange={handleImport} />
                    </IconButton>
                    <IconButton onClick={handleExportTemplate}>
                        <DownloadIcon />
                    </IconButton>
                </Box>
            </Box>

            {branches.length > 0 ? (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={branches.map((branch, index) => ({ ...branch, id: index }))}
                        columns={branchesColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                        onRowEditCommit={handleRowEditCommit}
                        onSelectionModelChange={handleSelectionChange}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    />
                </div>
            ) : (
                <p>No branches added yet.</p>
            )}
        </div>
    );
}

export default Branches;