// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// function BasicTable({ data, columns }) {
//   return (
//     <TableContainer
//       component={Paper}
//       elevation={0}
//       sx={{
//         boxShadow: "none", // Remove box shadow
//         border: "1px solid rgba(224, 224, 224, 1)", // Restore table border
//         borderRadius: "10px",
//       }}
//     >
//       <Table sx={{ minWidth: 650 }} aria-label="basic table">
//         <TableRow>
//           {columns.map((column) => (
//             <TableCell
//               key={column}
//               sx={{ textAlign: "left", padding: "8px", fontSize: "14px" }}
//             >
//               {column}
//             </TableCell>
//           ))}
//         </TableRow>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               {Object.values(row).map((value, index) => (
//                 <TableCell
//                   sx={{ textAlign: "left", padding: "8px", fontSize: "16px" }}
//                   key={index}
//                   align="right"
//                 >
//                   {value}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default BasicTable;
