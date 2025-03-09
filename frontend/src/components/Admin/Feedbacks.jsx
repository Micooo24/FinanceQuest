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
  Modal,
  Button
} from "@mui/material";
import { Delete, RestoreFromTrash, ExpandMore, ExpandLess, DeleteForever , Warning } from "@mui/icons-material";

const Feedbacks = () => {
  const [comments, setComments] = useState([]);
  const [deletedComments, setDeletedComments] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const blogIds = ["123", "1234", "12345", "123456"];

  useEffect(() => {
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

    fetchComments();
  }, []);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const groupedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.username]) acc[comment.username] = [];
    acc[comment.username].push(comment);
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px", color: "#451d6b", fontFamily: "'Fraunces'", width: "1000px", margin: "auto" }}>
      <IconButton onClick={toggleModal} sx={{ position: "absolute", top: 125, right: 80, color: "#451d6b" }}>
        <RestoreFromTrash />
      </IconButton>

      <TableContainer component={Paper} sx={{ backgroundColor: "#B2A5FF", borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C5BAFF" }}>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", textAlign: "right" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedComments).map((username) => (
              <React.Fragment key={username}>
                <TableRow sx={{ backgroundColor: "#DAD2FF", borderRadius: "8px" }}>
                  <TableCell sx={{ fontFamily: "'Lilita One'" }}>
                    {username}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <IconButton onClick={() => handleToggleExpand(username)}>
                      {expandedUsers[username] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Collapse in={expandedUsers[username]} timeout="auto" unmountOnExit>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#EDE7FF" }}>
                            <TableCell>Comment</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {groupedComments[username].map((comment) => (
                            <TableRow key={comment._id} sx={{ backgroundColor: "#F4F0FF" }}>
                              <TableCell>
                                <Typography variant="body1">{comment.comment}</Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                  Likes: {comment.like_count} | Anonymous: {comment.anonymous ? "Yes" : "No"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "gray" }}>
                                  Created At: {new Date(comment.created_at).toLocaleString()}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ textAlign: "right" }}>
                                <IconButton onClick={() => handleDelete(comment._id)} color="error">
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
        <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{
          position: "absolute" ,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#C5BAFF",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
          
          boxShadow: 24
        }}>
          <Typography variant="h6" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold" }}>
            Recycle Bin
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Comment</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedComments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell>{comment.username}</TableCell>
                  <TableCell>{comment.comment}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRestore(comment._id)} color="primary">
                      <RestoreFromTrash />
                    </IconButton>
                    <IconButton onClick={() => handlePermanentDelete(comment._id)} color="error">
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
