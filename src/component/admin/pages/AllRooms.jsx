import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const columns = [
  { id: "houseName", label: "Name", minWidth: 170 },
  { id: "address", label: "Location", minWidth: 100 },
  { id: "owner", label: "Owner", minWidth: 170, align: "right" },
  { id: "roomType", label: "Type", minWidth: 170, align: "right" },
  { id: "price", label: "Price", minWidth: 170, align: "right" },
  { id: "contactNumber", label: "Contact", minWidth: 170, align: "right" },
  { id: "status", label: "Status", minWidth: 170, align: "right" },
];

export default function AllRooms() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const rooms = useSelector((state) => state.room.room);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === "createdAt") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });


  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="mt-20">
      <Paper
        className="mt-22"
        sx={{ width: "100%", overflow: "hidden", mt: 3 }}
      >
        <div className="p-4 flex mt-18 flex-col md:flex-row gap-4 items-center justify-between">
          <TextField
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="md:max-w-xs"
            variant="outlined"
            size="small"
          />

          <div className="flex gap-4">
            <FormControl
              variant="outlined"
              size="small"
              className="min-w-[150px]"
            >
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="createdAt">Date</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="outlined"
              size="small"
              className="min-w-[150px]"
            >
              <InputLabel>Order</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell>Date Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRooms
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((room) => (
                      <TableRow hover key={room._id}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "owner"
                              ? room.owner?.name || "N/A"
                              : room[column.id] || "N/A"}
                          </TableCell>
                        ))}
                        <TableCell>{
                          
                          formatDateTime(room.createdAt)
                          }</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sortedRooms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(+e.target.value);
                setPage(0);
              }}
            />
          </>
        )}
      </Paper>
    </div>
  );
}
