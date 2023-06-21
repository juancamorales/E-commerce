import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getAllUsers, putUser } from "../../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Users = () => {
  const users = useSelector((state) => state.allUsers);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setTableData(users);
  }, [users]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  console.log("a", users);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (true) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setIsLoading(true);
      setTimeout(() => {
        dispatch(putUser(values))
        setIsLoading(false);
      }, 500);
      setTableData([...tableData]);
    }
    exitEditingMode(true); //required to exit editing mode and close modal
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = (row) => {
    if (row.original.active === "valid") {
      Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to disactive ${row.getValue("name")}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, desactived it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // dispatch(
          //   putFood({
          //     id: Number(row.original.id),
          //     active: "invalid",
          //   })
          // );
          //send api delete request here, then refetch or update local table data for re-render
          tableData[row.index].active = "invalid"
          setTableData([...tableData]);

          console.log("disactiving", row);
          Swal.fire("Disactived!", "Your file has been desactived.", "success");
          setIsLoading(true);
          setTimeout(() => {
            dispatch(
              putUser(tableData[row.index])
            );
            setIsLoading(false);
          }, 500);
        }
      });
    } else if (row.original.active === "invalid") {
      Swal.fire({
        title: "Are you sure?",
        text: "You will active this food!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, active it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // dispatch(
          //   putFood({
          //     id: row.original.id,
          //     name: row.original.name,
          //     active: "valid",
          //   })
          // );
          tableData[row.index].active = "valid";
          setTableData([...tableData]);
          console.log("activating", row);
          Swal.fire("Actived!", "Your file has been actived.", "success");
          setIsLoading(true);
          setTimeout(() => {
            dispatch(putUser(tableData[row.index]))
            setIsLoading(false);
          }, 1500);
        }
      });
    }
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        // onBlur: (event) => {
        //   const isValid =
        //     cell.column.id === validateRequired(event.target.value);
        //   if (!isValid) {
        //     //set validation error for cell if invalid
        //     setValidationErrors({
        //       ...validationErrors,
        //       [cell.id]: `${cell.column.columnDef.header} is required`,
        //     });
        //   } else {
        //     //remove validation error for cell if valid
        //     delete validationErrors[cell.id];
        //     setValidationErrors({
        //       ...validationErrors,
        //     });
        //   }
        // },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "active", //simple recommended way to define a column
        header: "Active",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        enableEditing: false,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              display: "inherit",
              maxWidth: "15px",
              height: "15px",
              backgroundColor:
                cell.getValue() === "invalid"
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              borderRadius: "50%",
              color: "#fff",
              padding: "1rem",
            })}
          ></Box>
        ),
      },
      {
        accessorKey: "roll",
        header: "Roll",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["client", "admin"],
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === "client"
                  ? theme.palette.success.light
                  : theme.palette.error.dark,
              borderRadius: "1rem",
              color: "#fff",
              width: "auto",
              padding: ".35rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "button",
            })}
          </Box>
        ),
      },
      {
        accessorKey: "mail",
        header: "Mail",
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "direction", //simple recommended way to define a column
        header: "Direction",
        size: 140,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "telephone", //simple recommended way to define a column
        header: "Telephone",
        size: 140,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        state={{
          // expanded: true,
          isLoading: isLoading,
        }}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};


export default Users;
