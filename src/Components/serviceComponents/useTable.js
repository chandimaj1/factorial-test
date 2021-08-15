import React, { useState } from 'react'
import {makeStyles, Table as MuiTable, TableCell, TableHead, TablePagination, TableRow} from '@material-ui/core';

const useStyles = makeStyles( theme=>({
    table:{
        '& thead th':{
            fontWeight:'600',
            color:theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light
        },
        '& tbody td':{
            fontWeight:'300',
        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer'
        }
    }    
}))

export function useTable(selectedRecords, headCells) {

    const classes = useStyles();

    //Pagination
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage]=useState(pages[page]);

    const handleChangePage = (event, newPage) =>{
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event =>{
        setRowsPerPage(parseInt( event.target.value,10) );
        setPage(0);
    }

    const recordsAfterPaging = () =>{
        return selectedRecords.slice(page*rowsPerPage, (page+1)*rowsPerPage);
    }
    
    //Wrapper for MuiTable
    const TblContainer = props => (
        <MuiTable className={classes.table}>
            {props.children}
        </MuiTable>
    )

    //Table head
    const TblHead = props => (
        <TableHead>
            <TableRow>
                {
                    //Map table head based on headCells object
                    headCells.map(headCell=>(
                        <TableCell key={headCell.id}>{headCell.label}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )

    const TblPagination = () =>(
        <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={selectedRecords.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
    

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    }
}
