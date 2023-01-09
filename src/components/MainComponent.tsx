import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, ProductsData } from "../redux/slices/dataSlice";
import { RootState } from "../redux/store";

function MainComponent() {
  const data = useSelector(
    (state: RootState) => (state.data.productsData as ProductsData).data
  );
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string | null>(null);
  const [dataFilterById, setDataFilterById] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Record<string, any>>({});

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (item: Record<string, any>) => {
    setModalContent(item);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setModalContent({});
    setOpen((prev) => !prev);
  };

  const filterData = () => {
    if (inputValue === null) return;
    if (!inputValue.length) {
      setDataFilterById(data);
      return;
    }
    setDataFilterById(data.filter((item) => item.id == inputValue));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    filterData();
  }, [inputValue]);

  useEffect(() => {
    if (data) setDataFilterById(data);
  }, [data]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        SPA application
      </Typography>
      <TextField
        type="number"
        label="ID"
        onChange={(e) => setInputValue(e.target.value)}
      />
      {!isLoading && (
        <TableContainer sx={{ maxWidth: 750, my: 5 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFilterById
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleClick(item)}
                    sx={{
                      backgroundColor: item.color,
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.year}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={dataFilterById.length}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
          }}
        >
          <div style={{ margin: 10 }}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              ID: {modalContent.id}
            </Typography>
            <Typography variant="h6">Color: {modalContent.color}</Typography>
            <Typography variant="h6">Name: {modalContent.name}</Typography>
            <Typography variant="h6">Year: {modalContent.year}</Typography>
            <Typography variant="h6">
              Pantone Balue: {modalContent.pantone_value}
            </Typography>
          </div>
        </Box>
      </Modal>
    </Paper>
  );
}

export default MainComponent;
