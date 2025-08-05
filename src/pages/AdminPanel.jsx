// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import {
  Search,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Hello");
      async function checkAdmin() {
        try{
          let url = "https://business.osemen.com.ng/get_users.php";

          const response = await axios.post(url, {action: user}, {
              headers: {
                  "Content-Type" : "application/json",
              },withCredentials: true
          })

          if (response.data.success){
            console.log(response.data.success);
          }else{
            //navigate('/');
          }
        }catch(err){
          console.log("Error retrieving users: ", err)
        }
      }
      checkAdmin()
    }
  }, [user, navigate]);

  useEffect(() => {
    async function getSession() {
      try {
        let url = "https://business.osemen.com.ng/user_session.php";

        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });

        if (response.data !== '') {
          setUser(response.data);
        } 
      } catch (err) {
        console.log("Error retrieving session: ", err);
      }
    }

    getSession();
  }, []);

  const [globalFilter, setGlobalFilter] = useState('');

  const data = useMemo(() => [
    { id: 1, name: 'Osemen O.', email: 'osemen@example.com', role: 'Admin' },
    { id: 2, name: 'Grace U.', email: 'grace@example.com', role: 'User' },
    { id: 3, name: 'Mark D.', email: 'mark@example.com', role: 'User' },
    { id: 4, name: 'Ada C.', email: 'ada@example.com', role: 'Editor' },
  ], []);

  const columns = useMemo(() => [
    { Header: 'Full Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <button onClick={() => alert(`Edit ${row.original.name}`)}>
            <Pencil size={16} className="text-blue-500 hover:text-blue-700" />
          </button>
          <button onClick={() => alert(`Delete ${row.original.name}`)}>
            <Trash2 size={16} className="text-red-500 hover:text-red-700" />
          </button>
          <button>
            <MoreVertical size={16} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      )
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter: setTableFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    setTableFilter(value);
  };

  return (
    <>
    <Header />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Search Input */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          value={globalFilter}
          onChange={handleFilterChange}
          placeholder="Search users..."
          className="border border-gray-300 px-3 py-1 rounded-md w-full max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table {...getTableProps()} className="min-w-full table-auto">
          <thead className="bg-gray-100">
            {headerGroups.map(headerGroup => {
              const headerGroupProps = headerGroup.getHeaderGroupProps();
              return (
                <tr key={headerGroupProps.key} {...headerGroupProps} className="text-left text-sm text-gray-700">
                  {headerGroup.headers.map(column => {
                    const colProps = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th key={colProps.key} {...colProps} className="p-3">
                        <div className="flex items-center justify-between">
                          {column.render('Header')}
                          {column.isSorted && (
                            <span>{column.isSortedDesc ? ' 🔽' : ' 🔼'}</span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()} className="text-sm text-gray-800">
            {page.map(row => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <tr key={rowProps.key} {...rowProps} className="border-t hover:bg-gray-50">
                  {row.cells.map(cell => {
                    const cellProps = cell.getCellProps();
                    return (
                      <td key={cellProps.key} {...cellProps} className="p-3">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-600">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`px-3 py-1 rounded border ${canPreviousPage ? 'bg-gray-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`px-3 py-1 rounded border ${canNextPage ? 'bg-gray-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
