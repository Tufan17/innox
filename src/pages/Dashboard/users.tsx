import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import UserController from '../../../database/db/controller/userController';
import { Avatar, Center, Loader } from '@mantine/core';

interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'avatar', label: 'Avatar', minWidth: 170 },
  { id: 'nickname', label: 'Nickname', minWidth: 170 },
  { id: 'education', label: 'Eğitim', minWidth: 170 },
  { id: 'status', label: 'Durum', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'role', label: 'Role', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
];

const UsersView: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserController.index().then((res) => {
      setUsers(res);
      setLoader(false);
    });
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return loader ? (
    <Center mt={window.innerWidth * 0.15}>
      <Loader />
    </Center>
  ) : (
    <Paper sx={{ width: '100%', height: "100%" }}>
      <TableContainer sx={{ maxHeight: '100%' }}>


        <Table aria-label="sticky table">
          <TableHead style={{
            width: "100%",
          }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                if (!row) {
                  // Skip rendering if user data is missing
                  return null;
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                    {columns.map((column) => {
                      if (column.id === 'avatar') {
                        const avatarUrl = row.avatar;
                        return (
                          <TableCell key={column.id} align={column.align || 'left'}>
                            <Avatar src={avatarUrl} alt="Avatar" />
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align || 'left'}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersView;
