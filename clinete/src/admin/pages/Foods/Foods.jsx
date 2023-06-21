import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getAllFoods } from "../../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { postFood } from "../../../Redux/Actions/Actions";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { putFood } from "../../../Redux/Actions/Actions";
import { FoodForm } from "../../Components/Forms/FoodForm";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#2a9461",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const Foods = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const foods = useSelector((state) => state.foods);
  const allFoods = useSelector((state) => state.allFoods);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tableData, setTableData] = useState(allFoods);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setTableData(foods);
  }, [foods]);
  useEffect(() => {
    dispatch(getAllFoods());
  }, [dispatch]);

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);

    console.log("table data despues de agregar", tableData);
    console.log("food ", foods);

    setIsLoading(true);
    setTimeout(() => {
      dispatch(postFood(values));
      dispatch(getAllFoods());
      setIsLoading(false);
    }, 500);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "New food has been created successfully",
      showConfirmButton: true,
    });
  };

  const handleSaveRowEdits = ({ exitEditingMode, row, values }) => {
    setIsSaving(true);
    tableData[row.index] = values;
    setTableData([...tableData]);

    exitEditingMode(true);
    setIsLoading(true);
    setTimeout(() => {
      dispatch(putFood(values));
      setIsLoading(false);
    }, 500);
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = (row) => {
    if (row.original.active === "valid") {
      Swal.fire({
        title: "Are you sure?",
        text: "You will disactive this food!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, desactived it!",
      }).then((result) => {
        if (result.isConfirmed) {
          tableData[row.index].active = "invalid";
          setTableData([...tableData]);

          console.log("cambiado a invalid", tableData[row.index]);
          Swal.fire("Disactived!", "Your file has been desactived.", "success");
          setIsLoading(true);

          setTimeout(() => {
            dispatch(putFood(tableData[row.index]));
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
          tableData[row.index].active = "valid";
          setTableData([...tableData]);
          console.log("cambiado a valid", tableData[row.index]);

          Swal.fire("Actived!", "Your file has been actived.", "success");
          setIsLoading(true);
          setTimeout(() => {
            dispatch(putFood(tableData[row.index]));
            setIsLoading(false);
          }, 500);
        }
      });
    }
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = cell.column.id === "id";
          // ? validateEmail(event.target.value)
          // : cell.column.id === "name"
          // ? validateAge(+event.target.value)
          // : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: true,
        enableEditing: false, //disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "image",
        header: "Image",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* {console.log("box", row)} */}
            <img
              alt="avatar"
              height={40}
              width={60}
              src={row.original.image}
              loading="lazy"
              style={{ borderRadius: "30%" }}
            />
          </Box>
        ),
        size: 140,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
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
        accessorKey: "available",
        header: "Available",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "boolean",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === true || "true"
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
        size: 80,
        editVariant: "select",
        editSelectOptions: ["true", "false"],
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.palette.primary.dark,
              borderRadius: "0.25rem",
              fontWeight: "bold",
              maxWidth: "9ch",
              p: "0.55rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            })}
          </Box>
        ),
      },
      {
        accessorKey: "discount",
        header: "Discount(%)",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.palette.error.light,
              borderRadius: "0.25rem",
              fontWeight: "bold",
              maxWidth: "9ch",
              p: "0.55rem",
            })}
          >
            {(cell.getValue() / 100)?.toLocaleString?.("en-US", {
              style: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "fat",
        header: "Fat",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["High", "Medium", "Low"],
      },
      {
        accessorKey: "sodium",
        header: "Sodium",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["High", "Medium", "Low"],
      },
      {
        accessorKey: "sugar",
        header: "Sugar",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        editVariant: "select",
        editSelectOptions: ["High", "Medium", "Low"],
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "qualification",
        header: "Qualification",
        size: 80,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Rating
              name="read-only"
              value={
                typeof row.original.qualification !== "undefined"
                  ? row.original.qualification
                  : 0
              }
              readOnly
            />
          </Box>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  console.log("Hola foods", allFoods);
  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          enableStickyHeader
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
          state={{
            // expanded: true,
            isLoading: isLoading,
          }}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
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
          renderTopToolbarCustomActions={() => (
            <Button
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Food
            </Button>
          )}
        />
      </ThemeProvider>

      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Create New Food</DialogTitle>
      <DialogContent>
        <FoodForm open={() => onClose()} />
      </DialogContent>
    </Dialog>
  );
};

export default Foods;
