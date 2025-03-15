import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
  Modal
} from "@mui/material";
import { Delete, RestoreFromTrash, ExpandMore, ExpandLess, DeleteForever } from "@mui/icons-material";

const Feedbacks = () => {
  const [comments, setComments] = useState([]);
  const [deletedComments, setDeletedComments] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [isRecycleModalOpen, setIsRecycleModalOpen] = useState(false);

  const blogIds = ["123", "1234", "12345", "123456"];

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const requests = blogIds.map(id => axios.get(`http://localhost:8000/blogReview/get_comments/${id}`));
      const responses = await Promise.all(requests);
      const allComments = responses.flatMap(response => response.data.comments || []);
      const savedDeletedComments = JSON.parse(localStorage.getItem("deletedComments")) || [];
      const filteredComments = allComments.filter(comment =>
        !savedDeletedComments.some(deleted => deleted._id === comment._id)
      );

      setComments(filteredComments);
      setDeletedComments(savedDeletedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleToggleExpand = (username) => {
    setExpandedUsers(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  const handleDelete = (commentId) => {
    setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    setDeletedComments(prevDeleted => {
      const deletedComment = comments.find(comment => comment._id === commentId);
      if (!deletedComment) return prevDeleted;
      const updatedDeleted = [...prevDeleted, deletedComment];
      localStorage.setItem("deletedComments", JSON.stringify(updatedDeleted));
      return updatedDeleted;
    });
  };

  const handleRestore = (commentId) => {
    setDeletedComments(prevDeleted => {
      const restoredComment = prevDeleted.find(comment => comment._id === commentId);
      if (!restoredComment) return prevDeleted;

      setComments(prevComments => [...prevComments, restoredComment]);

      const updatedDeleted = prevDeleted.filter(comment => comment._id !== commentId);
      localStorage.setItem("deletedComments", JSON.stringify(updatedDeleted));
      return updatedDeleted;
    });
  };

  const handlePermanentDelete = (commentId) => {
    setDeletedComments(prevDeleted => {
      const updatedDeleted = prevDeleted.filter(comment => comment._id !== commentId);
      localStorage.setItem("deletedComments", JSON.stringify(updatedDeleted));
      return updatedDeleted;
    });
  };

  const toggleRecycleModal = () => {
    setIsRecycleModalOpen(!isRecycleModalOpen);
  };

  const groupedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.username]) acc[comment.username] = [];
    acc[comment.username].push(comment);
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px", color: "#fff", fontFamily: "'Fraunces'", width: "1000px", margin: "auto" }}>
      <IconButton onClick={toggleRecycleModal} sx={{ position: "absolute", top: 125, right: 80, color: "#fff" }}>
        <RestoreFromTrash />
      </IconButton>

      <TableContainer component={Paper} sx={{ backgroundColor: "#67407a", borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#8a619b" }}>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff", width: "50%" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff", textAlign: "right", width: "50%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedComments).map((username) => (
              <React.Fragment key={username}>
                <TableRow sx={{ backgroundColor: "#67407a" }}>
                  <TableCell sx={{ fontFamily: "'Lilita One'", color: "#fff", width: "50%" }}>
                    {username}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right", width: "50%" }}>
                    <IconButton onClick={() => handleToggleExpand(username)} sx={{ color: "#b590c7" }}>
                      {expandedUsers[username] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Collapse in={expandedUsers[username]} timeout="auto" unmountOnExit>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#75538a" }}>
                            <TableCell sx={{ color: "#fff", width: "50%" }}>Comment</TableCell>
                            <TableCell sx={{ color: "#fff", textAlign: "right", width: "50%" }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {groupedComments[username].map((comment) => (
                            <TableRow key={comment._id} sx={{ backgroundColor: "#9b71ad" }}>
                              <TableCell sx={{ width: "50%" }}>
                                <Typography variant="body1" sx={{ color: "#fff" }}>{comment.comment}</Typography>
                                <Typography variant="body2" sx={{ color: "#e0d4ff" }}>
                                  Likes: {comment.like_count} | Anonymous: {comment.anonymous ? "Yes" : "No"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#e0d4ff" }}>
                                  Created At: {new Date(comment.created_at).toLocaleString()}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ textAlign: "right", width: "50%" }}>
                                <IconButton onClick={() => handleDelete(comment._id)} sx={{ color: "#ff6b6b" }}>
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recycle Bin Modal */}
      <Modal open={isRecycleModalOpen} onClose={toggleRecycleModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#67407a",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
          boxShadow: 24
        }}>
          <Typography variant="h6" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold", color: "#fff" }}>
            Recycle Bin
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#8a619b" }}>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff", width: "33.33%" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff", width: "33.33%" }}>Comment</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#fff", textAlign: "right", width: "33.33%" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedComments.map((comment) => (
                <TableRow key={comment._id} sx={{ backgroundColor: "#67407a" }}>
                  <TableCell sx={{ color: "#fff", width: "33.33%" }}>{comment.username}</TableCell>
                  <TableCell sx={{ color: "#fff", width: "33.33%" }}>{comment.comment}</TableCell>
                  <TableCell sx={{ textAlign: "right", width: "33.33%" }}>
                    <IconButton onClick={() => handleRestore(comment._id)} sx={{ color: "#b590c7" }}>
                      <RestoreFromTrash />
                    </IconButton>
                    <IconButton onClick={() => handlePermanentDelete(comment._id)} sx={{ color: "#ff6b6b" }}>
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </div>
  );
};

export default Feedbacks;