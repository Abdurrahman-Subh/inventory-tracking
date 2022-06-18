import { deleteDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Boxx from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 175px;
  border-radius: 10px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(1, 1fr);
  gap: 0px;
  border: 3px solid #eeeeee;
  overflow: hidden;
  opacity: ${(props) => (props.done ? "0.5" : "1")};
  &:hover {
    height: auto;
    transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    border: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    opacity: ${(props) => (props.done === true ? "0.5" : "1")};
    box-shadow: 1px 5px 18px 5px rgba(0, 0, 0, 0.23);
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
`;
const Image = styled.img`
  width: 180px;
  height: 200px;
  background-image: cover;
  border-bottom: 2px solid #000;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const TextWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;
const Title = styled.h2``;
const Paragraph = styled.p`
  text-align: start;
`;
const CheckedBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  align-items: center;
`;
const Check = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
  &:disabled {
    background-color: #ddd;
  }
`;
const NotCheck = styled.button`
  background-color: #990000; /* Green */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Delete = styled.button`
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const Edit = styled.button`
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #035397;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const User = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #1363df;
  padding: 10px;
`;
const Seller = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #06ff00;
  padding: 10px;
`;
const Span = styled.span`
  font-weight: 600;
`;

const Box = ({ list }) => {
  const [hoveredRow, setHoveredRow] = React.useState(null);

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };
  const notifySuccess = () => {
    toast.success("Başarıyla Tamamlandı");
  };
  const notifyFailed = () => {
    toast.error("Yanlış Bir Şey Oldu");
  };
  const deleteRecord = async (id) => {
    try {
      const bookDoc = doc(db, "books", id);
      await deleteDoc(bookDoc);
      notifySuccess();
      window.location.reload(false);
    } catch (error) {
      notifyFailed();
    }
  };

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "buyer", headerName: "Müşteri Adı", width: 150 },
    { field: "name", headerName: "Kitap Adı", width: 150 },
    {
      field: "insurance",
      headerName: "Kapora",
      type: "number",
      width: 100,
    },
    {
      field: "user",
      headerName: "Sipariş Eden",
      width: 200,
    },
    {
      field: "seller",
      headerName: "Nerden",
      width: 90,
    },
    {
      field: "sellerNumber",
      headerName: "Adet",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Silmek",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        <Delete>Sil</Delete>;
      },
    },
  ];

  const localizedTextsMap = {
    columnMenuUnsort: "Sıralamayı Sıfırla",
    columnMenuSortAsc: "Alfabetic Sırala",
    columnMenuSortDesc: "Z den Başla",
    columnMenuFilter: "Filterlemek",
    columnMenuHideColumn: "Satır Gizle",
    columnMenuShowColumns: "Satırları Göster",
    toolbarDensity: "Görönüm",
    toolbarDensityLabel: "Görönüm",
    toolbarDensityCompact: "Dar",
    toolbarDensityStandard: "Standart",
    toolbarDensityComfortable: "Geniş",
    // Filters toolbar button text
    toolbarFilters: "Filterlemek",
    toolbarFiltersLabel: "Filterleri göster",
    toolbarFiltersTooltipHide: "Filterleri gizle",
    toolbarFiltersTooltipShow: "Filterleri göster",
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} Aktif Filter` : `${count} Aktif Filter`,
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: "Ara...",
    toolbarQuickFilterLabel: "Ara",
    toolbarQuickFilterDeleteIconLabel: "Temizle",
    // Export selector toolbar button text
    toolbarExport: "Export",
    toolbarExportLabel: "Export",
    toolbarExportCSV: "CSV Olarak İndir",
    toolbarExportPrint: "Yazdır",
    // Columns panel text
    columnsPanelTextFieldLabel: "Kolon Bul",
    columnsPanelTextFieldPlaceholder: "Kolon Başlığı",
    columnsPanelDragIconLabel: "Kolonları Sırala",
    columnsPanelShowAllButton: "Hepsini göster",
    columnsPanelHideAllButton: "Hepsini gizle",

    // Filter operators text
    filterOperatorContains: "İçerir",
    filterOperatorEquals: "Eşittir",
    filterOperatorStartsWith: "İle Başlayan",
    filterOperatorEndsWith: "İle Biten",
    filterOperatorIsEmpty: "Boş Olan",
    filterOperatorIsNotEmpty: "Boş Olmayan",
    filterOperatorIsAnyOf: "Her Hangi",
    // Filter values text
    filterValueAny: "her hangi",
    filterValueTrue: "doğru",
    filterValueFalse: "yanlış",

    // Column menu text
    columnMenuLabel: "Menü",
    columnMenuShowColumns: "Kolonları göster",
    columnMenuFilter: "Filterlemek",
    columnMenuHideColumn: "Gizle",
    columnMenuUnsort: "Sırlamayı temizle",
    columnMenuSortAsc: "ASC ye göre sırala",
    columnMenuSortDesc: "DESC ye göre sırala",
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} Aktif Filter` : `${count} Aktif Filter`,
    columnHeaderFiltersLabel: "Filterleri göster",
    columnHeaderSortIconLabel: "Sırala",

    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} seçilen satırlar`
        : `${count.toLocaleString()} seçilen satırlar`,

    // Total row amount footer text
    footerTotalRows: "Toplam Satır:",
    // Checkbox selection text
    checkboxSelectionHeaderName: "Checkbox selection",
    checkboxSelectionSelectAllRows: "Select all rows",
    checkboxSelectionUnselectAllRows: "Unselect all rows",
    checkboxSelectionSelectRow: "Select row",
    checkboxSelectionUnselectRow: "Unselect row",
  };
  return (
    <>
      <Container>
        <DataGrid
          rows={list}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          components={{ Toolbar: GridToolbar, Pagination: CustomPagination }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          localeText={localizedTextsMap}
        />
      </Container>
      <ToastContainer />
    </>
  );
};
export default Box;
{
  /* <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Müşteri Adı</TableCell>
                <TableCell>Kitap Adi</TableCell>
                <TableCell>Kapora</TableCell>
                <TableCell>Sipariş Eden</TableCell>
                <TableCell>Nerden</TableCell>
                <TableCell>Adet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ ":last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.buyer}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.insurance}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.seller}</TableCell>
                  <TableCell>{item.sellerNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */
}
{
  /* <MUIDataTable
          title={"Sipariş Takip Sistemi"}
          data={list}
          columns={columns}
          options={options}
        /> */
}
