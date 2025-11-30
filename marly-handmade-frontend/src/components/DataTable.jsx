import React, { useState, useMemo, useEffect } from "react";
import Pagination from "../components/Pagination.jsx";
import "../styles/DataTable.css";

function DataTable({
  data = [],
  columns = [],
  searchable = true,
  actions = null,
  itemsPerPage = 10,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(columns[0]?.field || null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const filteredData = useMemo(() => {
    let result = data;

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter((row) =>
        columns
          .map((c) => String(row[c.field] ?? ""))
          .join(" ")
          .toLowerCase()
          .includes(term)
      );
    }
    if (sortField) {
      result = [...result].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        const numA = Number(valA);
        const numB = Number(valB);

        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === "asc" ? numA - numB : numB - numA;
        }

        return sortDirection === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [data, searchTerm, sortField, sortDirection, columns]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (!field) return;
    setSortDirection(sortField === field && sortDirection === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  return (
    <div className="datatable-wrapper">
      {searchable && (
        <div className="datatable-bar">
          <div className="datatable-search-wrapper">
            <input
              className="datatable-search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass search-icon-dt"></i>
          </div>
        </div>
      )}

      <table className="datatable">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.field}
                onClick={() => col.sortable && handleSort(col.field)}
                className={col.sortable ? "sortable" : "no-icon"}
              >
                {col.label}
              </th>
            ))}
            {actions && <th>Acción</th>}
          </tr>
        </thead>

        <tbody>
          {pageItems.length ? (
            pageItems.map((row, index) => (
              <tr key={row.id || index}>
    {columns.map((col) => (
      <td key={col.field} className={col.className || ""}>
        {col.render
          ? col.render(row, index, (currentPage - 1) * itemsPerPage + index)
          : row[col.field]}
      </td>
                ))}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                style={{ textAlign: "center" }}
              >
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default DataTable;
