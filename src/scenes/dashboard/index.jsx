import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [emailPercentage, setEmailPercentage] = useState(0);
  const [salesPercentage, setSalesPercentage] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [latestMenuItems, setLatestMenuItems] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then((response) => {
        const countEmails = response.data.filter(invoice => invoice.email).length;
        setTotalEmails(countEmails);
        const percentage = (countEmails / 100) * 100;
        setEmailPercentage(percentage);
      })
      .catch((error) => {
        console.error('Error fetching emails:', error);
      });

    axios.get('http://localhost:5000/api/invoices/totalCost')
      .then((response) => {
        setTotalSales(response.data.totalCost);
      })
      .catch((error) => {
        console.error('Error fetching total sales:', error);
      });

    axios.get('http://localhost:5000/api/orders/newUsers')
      .then((response) => {
        setNewUsers(response.data.newUsers);
      })
      .catch((error) => {
        console.error('Error fetching new users:', error);
      });

    axios.get('http://localhost:5000/api/customers/total')
      .then((response) => {
        setTotalCustomers(response.data.totalCustomers);
      })
      .catch((error) => {
        console.error('Error fetching total customers:', error);
      });

    axios.get('http://localhost:5000/api/invoices')
      .then((response) => {
        const invoices = response.data.slice(0, 100);

        const latestMenuDataArray = invoices.flatMap((invoice) => {
          if (invoice && invoice.order_data && invoice.order_data.length > 0) {
            return invoice.order_data.map(item => ({
              name: item.name,
              price: item.price
            }));
          }
          return [];
        }).reverse();

        setLatestMenuItems(latestMenuDataArray);

        const latestTransactionsArray = invoices.map((invoice) => ({
          name: invoice.user_name,
          date: invoice.invoice_date,
          price: invoice.total_price
        })).reverse();

        setLatestTransactions(latestTransactionsArray);
      })
      .catch((error) => {
        console.error('Error fetching invoices:', error);
      });
  }, []);

  useEffect(() => {
    if (totalSales) {
      const percentage = (totalSales / 10000) * 100;
      setSalesPercentage(percentage);
    }
  }, [totalSales]);

  const getColor = (percentage) => {
    if (percentage >= 75) return colors.greenAccent[600];
    if (percentage >= 50) return colors.yellow[600];
    return colors.red[600];
  };

  const downloadReport = () => {
    const data = [
      {
        title: 'Total Orders',
        value: totalEmails,
        percentage: emailPercentage,
      },
      {
        title: 'Sales Obtained',
        value: totalSales,
        percentage: salesPercentage,
      },
      {
        title: 'Unique Customers',
        value: newUsers,
        percentage: (newUsers / 10).toFixed(2),
      },
      {
        title: 'Total Customers',
        value: totalCustomers,
        percentage: (totalCustomers / 10).toFixed(2),
      },
      ...latestMenuItems.map(item => ({
        title: 'Latest Ordered Menu',
        name: item.name,
        price: item.price,
      })),
      ...latestTransactions.map(transaction => ({
        title: 'Recent Transactions',
        name: transaction.name,
        date: transaction.date,
        price: transaction.price,
      })),
    ];

    const csvContent = convertToCSV(data);
    downloadCSV(csvContent);
  };

  const convertToCSV = (data) => {
    // Fixed column width
    const columnWidth = 100;
  
    // Generate CSV content with fixed column widths and padded cell values
    const header = Object.keys(data[0]).map((key) => {
      // Pad each header cell to the fixed column width
      return `${key.padEnd(columnWidth)}`;
    }).join(',');
  
    const rows = data.map((row) => {
      // Pad each cell value to the fixed column width
      return Object.values(row).map((value) => {
        return `${value}`.padEnd(columnWidth);
      }).join(',');
    });
  
    return [header, ...rows].join('\n');
  };
  
  

  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute('download', 'dashboard_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={downloadReport}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalEmails}
            subtitle="Total Orders"
            progress={emailPercentage / 100}
            increase={`${emailPercentage.toFixed(2)}%`}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalSales}
            subtitle="Sales Obtained"
            progress={salesPercentage / 100}
            increase={`${salesPercentage.toFixed(2)}%`}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newUsers}
            subtitle="Unique Customers"
            progress={newUsers / 1000}
            increase={`${(newUsers / 10).toFixed(2)}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalCustomers}
            subtitle="Total Customers"
            progress={totalCustomers / 1000}
            increase={`${(totalCustomers / 10).toFixed(2)}%`}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box textAlign="center" mb={2}>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                textAlign="center"
              >
                Latest Ordered Menu
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <Box overflow="auto" maxHeight="100%">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[                  500]}`}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h6" fontWeight="600">
                  Item Name
                </Typography>
                <Typography color={colors.grey[100]} variant="h6" fontWeight="600">
                  Price
                </Typography>
              </Box>
              {latestMenuItems.map((itemName, i) => (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`1px solid ${colors.grey[300]}`}
                  p="15px"
                >
                  <Typography color={colors.greenAccent[500]} variant="h6">
                    {itemName.name}
                  </Typography>
                  <Typography color={colors.greenAccent[500]} variant="h6">
                    ₹{itemName.price.toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {latestTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.name}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {transaction.name}
              </Typography>
              <Typography color={colors.grey[100]}>
                {transaction.date}
              </Typography>
              <Typography color={colors.grey[100]}>
                ₹{transaction.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

