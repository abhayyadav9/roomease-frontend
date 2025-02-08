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
  { id: "location", label: "Location", minWidth: 100 },
  { id: "tenant", label: "Tenant", minWidth: 170, align: "right" },
  { id: "category", label: "Category", minWidth: 170, align: "right" },
  { id: "priceRange", label: "Price", minWidth: 170, align: "right" },
  { id: "additionalNumber", label: "Contact", minWidth: 170, align: "right" },
  { id: "status", label: "Status", minWidth: 170, align: "right" },
];

export default function AllRequirements() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const requirements = useSelector((state) => state.requirement.requirements.requirement.requirements); // ✅ Corrected state access

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredRequirements = requirements.filter((requirement) =>
    requirement.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRequirements = [...filteredRequirements].sort((a, b) => {
    if (sortBy === "createdAt") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortBy === "priceRange") {
      return sortOrder === "asc" ? a.priceRange - b.priceRange : b.priceRange - a.priceRange;
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
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 3 }}>
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
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
            <FormControl variant="outlined" size="small" className="min-w-[150px]">
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="createdAt">Date</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="priceRange">Price</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" className="min-w-[150px]">
              <InputLabel>Order</InputLabel>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
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
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell>Date Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRequirements
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((requirement) => (
                      <TableRow hover key={requirement._id}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "tenant"
                              ? requirement.tenant?.name || "N/A"
                              : requirement[column.id] || "N/A"}
                          </TableCell>
                        ))}
                        <TableCell>{formatDateTime(requirement.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sortedRequirements.length}
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
