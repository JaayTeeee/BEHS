import React from "react";

interface TableRowProps {
  data: {
    header1: string;
    header2: string;
    header3: string;
    header4: string;
  };
}

const TableRow: React.FC<TableRowProps> = ({ data }) => (
  <tr style={rowStyle}>
    <td style={cellStyle}>{data.header1}</td>
    <td style={cellStyle}>{data.header2}</td>
    <td style={cellStyle}>{data.header3}</td>
    <td style={cellStyle}>{data.header4}</td>
  </tr>
);

const PermissionTable: React.FC = () => {
  const tableData = [
    {
      header1: "Row 1, Cell 1",
      header2: "Row 1, Cell 2",
      header3: "Row 1, Cell 3",
      header4: "Row 1, Cell 4",
    },
    {
      header1: "Row 2, Cell 1",
      header2: "Row 2, Cell 2",
      header3: "Row 2, Cell 3",
      header4: "Row 2, Cell 4",
    },
    // Add more data as needed
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Access ID</th>
            <th style={headerCellStyle}>Date</th>
            <th style={headerCellStyle}>Time</th>
            <th style={headerCellStyle}>Hospital</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <TableRow key={index} data={rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Style for the entire table
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  marginBottom: "20px",
  backgroundColor: "#F3FFEF",
  border: "2px solid #339f6b",
  height: "100px",
  marginLeft: "140px",
};

// Style for header cells
const headerCellStyle: React.CSSProperties = {
  backgroundColor: "#339f6b",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #339f6b",
};

// Style for regular cells
const cellStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "center",
  borderBottom: "1px solid #339f6b",
  margin: "0px 0", // Added margin, adjust as needed
  marginRight: "40px",
  marginLeft: "40px",
};

// Style for table rows
const rowStyle: React.CSSProperties = {
  border: "2px solid #339f6b",
  borderRadius: "20px",
  margin: "10px 0",
};

export default PermissionTable;
