import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import contentsController from "../../../database/db/controller/contentsController";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme, Theme } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import { Avatar, Button, Flex, Group } from "@mantine/core";
import { primaryColor, secondaryColor } from "../../constants/color";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import "./index.css";
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme<Theme>();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

interface Row {
    name: string;
    calories: number;
    fat: number;
}

const ContentsView: React.FC = () => {
    const [contents, setContents] = useState<Row[]>([]);
    const [emptyRows, setEmptyRows] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [mauseOver, setMauseOver] = useState<boolean>(false);
    const getAllData = async () => {
        try {
            const data: any[] = await contentsController.index();
            setContents(data);
            const value = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
            setEmptyRows(value);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        console.log(event);

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div
            style={{
                padding: '10px',
            }}
        >
            <Flex
                mih={50}
                gap="md"
                justify="flex-end"
                align="center"
                direction="row"
            >
                <Link to="/dashboard/contents/add"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                    }}
                >
                    <Button
                        bg={mauseOver ? secondaryColor : primaryColor}
                        onMouseOver={() => {
                            setMauseOver(true);
                        }}
                        onMouseOut={() => {
                            setMauseOver(false);
                        }}


                    >

                        Ekle
                    </Button>
                </Link>

            </Flex>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Sıra
                            </TableCell>
                            <TableCell>
                                İcon
                            </TableCell>
                            <TableCell>
                                Başlık
                            </TableCell>
                            <TableCell>
                                Alt Başlık
                            </TableCell>
                            <TableCell>
                                Genişlik(X)
                            </TableCell>
                            <TableCell>
                                Yükseklik(X)
                            </TableCell>
                            <TableCell>
                                İşlemler
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? contents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : contents
                        ).map((content: any) => (
                            <TableRow key={content?.id}>
                                <TableCell>
                                    {content?.index}
                                </TableCell>
                                <TableCell>
                                    <Avatar src={content?.icon} size={50} radius={"xl"} />
                                </TableCell>
                                <TableCell>
                                    {content?.title}
                                </TableCell>
                                <TableCell >
                                    {content?.subtitle}
                                </TableCell>
                                <TableCell >
                                    {content?.width}
                                </TableCell>
                                <TableCell >
                                    {content?.height}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    <Group>
                                        <Link to={`/dashboard/contents/edit/${content?.id}`}
                                        >
                                            <FaEdit className="icon" />
                                        </Link>
                                        <Link to={`/dashboard/contents/show/${content?.id}`}>
                                            <FaEye className="icon" />
                                        </Link>
                                    </Group>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={3} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter >
                        <TableRow >
                            <TablePagination
                                labelRowsPerPage="Sayfa başına satır:"
                                rowsPerPageOptions={[5, 10, 25, { label: 'Tümü', value: -1 }]}
                                colSpan={12}
                                count={contents.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ContentsView;
