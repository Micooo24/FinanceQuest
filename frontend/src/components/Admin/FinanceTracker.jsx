import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, AreaChart, Area, Cell } from 'recharts';

const FinanceTracker = () => {
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUsers, setExpandedUsers] = useState({});

  useEffect(() => {
    const fetchTrackers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/monthly_tracker/get-all-tracker');
        const groupedTrackers = groupByUser(response.data);
        setTrackers(groupedTrackers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trackers:', error);
        setLoading(false);
      }
    };

    fetchTrackers();
  }, []);

  const groupByUser = (data) => {
    const userMap = {};
    data.forEach((tracker) => {
      const userId = tracker.user_id || 'Unknown';
      if (!userMap[userId]) {
        userMap[userId] = {
          user_id: userId,
          username: tracker.username || 'Unknown',
          records: [],
          categorizedRecords: { bills: [], expenses: [], income: [], savings: [] },
        };
      }
      ['bills', 'expenses', 'income', 'savings'].forEach((type) => {
        if (Array.isArray(tracker[type])) {
          tracker[type].forEach((item) => {
            userMap[userId].records.push({ ...item, type });
            userMap[userId].categorizedRecords[type].push(item);
          });
        }
      });
    });
    return Object.values(userMap);
  };

  const toggleExpand = (userId) => {
    setExpandedUsers((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
  <TableContainer component={Paper}>
    <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#C5BAFF' }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', fontFamily: "'Fraunces'", color: '#000' }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontFamily: "'Fraunces'", color: '#000' }}>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trackers.map((tracker) => (
            <React.Fragment key={tracker.user_id}>
              <TableRow sx={{ backgroundColor: '#DAD2FF' }}>
                <TableCell>
                  <IconButton onClick={() => toggleExpand(tracker.user_id)}>
                    {expandedUsers[tracker.user_id] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{tracker.user_id}</TableCell>
                <TableCell sx={{ fontFamily: "'Lilita One'" }}>{tracker.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Collapse in={expandedUsers[tracker.user_id]} timeout="auto" unmountOnExit>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Expected</TableCell>
                          <TableCell>Actual</TableCell>
                          <TableCell>Done</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tracker.records.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.expected}</TableCell>
                            <TableCell>{item.actual}</TableCell>
                            <TableCell>{item.done ? 'Yes' : 'No'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Charts Section */}
                    <div style={{ marginTop: 20 }}>
                      <h3>Financial Overview</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={tracker.categorizedRecords.bills}>
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="actual" stroke="#FF5733" name="Bills" />
                        </LineChart>
                      </ResponsiveContainer>

                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tracker.categorizedRecords.expenses}>
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="expected" fill="#8884d8" name="Expected" />
                          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                        </BarChart>
                      </ResponsiveContainer>

                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie data={tracker.categorizedRecords.income} dataKey="actual" nameKey="category" outerRadius={100}>
                            {tracker.categorizedRecords.income.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>

                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={tracker.categorizedRecords.savings}>
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="actual" stroke="#82ca9d" fill="#82ca9d" name="Savings" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default FinanceTracker;