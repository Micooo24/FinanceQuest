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
import { Delete, RestoreFromTrash, ExpandMore, ExpandLess, DeleteForever } from "@mui/icons-material";

const Feedbacks = () => {
  const [comments, setComments] = useState([]);
  const [deletedComments, setDeletedComments] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/blogReview/get_comments/12345");
        const fetchedComments = response.data.comments;

        // Retrieve deleted comments from localStorage
        const savedDeletedComments = JSON.parse(localStorage.getItem("deletedComments")) || [];
        setDeletedComments(savedDeletedComments);

        // Filter out deleted comments from the main list
        const remainingComments = fetchedComments.filter(
          (comment) => !savedDeletedComments.some((deleted) => deleted._id === comment._id)
        );
        setComments(remainingComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleToggleExpand = (username) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  const handleDelete = (commentId) => {
    const commentToDelete = comments.find(comment => comment._id === commentId);
    if (!commentToDelete) return;

    const updatedDeletedComments = [...deletedComments, commentToDelete];
    setDeletedComments(updatedDeletedComments);
    localStorage.setItem("deletedComments", JSON.stringify(updatedDeletedComments));

    setComments(comments.filter(comment => comment._id !== commentId));
  };

  const handleRestore = (commentId) => {
    const commentToRestore = deletedComments.find(comment => comment._id === commentId);
    if (!commentToRestore) return;

    setComments([...comments, commentToRestore]);

    const updatedDeletedComments = deletedComments.filter(comment => comment._id !== commentId);
    setDeletedComments(updatedDeletedComments);
    localStorage.setItem("deletedComments", JSON.stringify(updatedDeletedComments));
  };

  const handlePermanentDelete = (commentId) => {
    const updatedDeletedComments = deletedComments.filter(comment => comment._id !== commentId);
    setDeletedComments(updatedDeletedComments);
    localStorage.setItem("deletedComments", JSON.stringify(updatedDeletedComments));
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
    <div style={{ padding: "20px", color: "#fff", fontFamily: "'Fraunces'", width: "1000px", margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", fontFamily: "'Fraunces'", fontWeight: "bold" }}>
        Feedbacks on Blog Post
      </Typography>

      {/* Recycle Bin Button */}
      <IconButton onClick={toggleModal} sx={{ position: "fixed", top: 20, right: 20, color: "#fff", fontSize: "2rem" }}>
        <RestoreFromTrash />
      </IconButton>

      <TableContainer component={Paper} sx={{ backgroundColor: "#B2A5FF", borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C5BAFF", color: "#000" }}>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#000" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedComments).map((username) => (
              <React.Fragment key={username}>
                <TableRow sx={{ backgroundColor: "#DAD2FF", borderRadius: "8px" }}>
                  <TableCell sx={{ fontFamily: "'Lilita One'", cursor: "pointer" }} onClick={() => handleToggleExpand(username)}>
                    {username} {expandedUsers[username] ? <ExpandLess /> : <ExpandMore />}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Collapse in={expandedUsers[username]} timeout="auto" unmountOnExit>
                      <Box sx={{ marginLeft: 4, backgroundColor: "#EDE7FF", padding: "10px", borderRadius: "8px" }}>
                        {groupedComments[username].map((comment) => (
                          <Box key={comment._id} sx={{ marginBottom: "8px", padding: "8px", backgroundColor: "#F4F0FF", borderRadius: "5px" }}>
                            <Typography variant="body1" sx={{ fontFamily: "'Lilita One'" }}>{comment.comment}</Typography>
                            <Typography variant="body2" sx={{ fontFamily: "'Lilita One'", color: "gray" }}>
                              Likes: {comment.like_count} | Anonymous: {comment.anonymous ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: "'Lilita One'", color: "gray" }}>
                              Created At: {new Date(comment.created_at).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: "'Lilita One'", color: "gray" }}>
                              Updated At: {new Date(comment.updated_at).toLocaleString()}
                            </Typography>
                            <IconButton onClick={() => handleDelete(comment._id)} color="error">
                              <Delete />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
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
          position: "absolute",
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
                <TableCell>Username</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Actions</TableCell>
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