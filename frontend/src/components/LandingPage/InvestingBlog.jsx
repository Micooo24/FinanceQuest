import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import your helper functions

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  Card,
  CardContent,
  FormLabel,
} from "@mui/material";
import {
  Home,
  SportsEsports,
  Article,
  TravelExplore,
  Info,
  Login,
  ThumbUp,
  Comment,
  Edit,
  Delete,
  Check,
  Close,
} from "@mui/icons-material";
import axios from "axios";
import toast  from "react-hot-toast";
import Navbar from "./Navbar";


const InvestingBlog = () => {
  const blogId = "12345"; // Declare blogId here
  const token = localStorage.getItem("authToken");
  //create
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  //Edit comments
  const [editMode, setEditMode] = useState(null); // Track which comment is being edited
  const [editedComment, setEditedComment] = useState(""); // Track the edited comment
  const [anonymousEdit, setAnonymousEdit] = useState(false); // Track the anonymous status

  //get-replies and comments
  const [replies, setReplies] = useState({});
  const [comments, setComments] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});

  //reply-CRUD
  const [editModeReply, setEditModeReply] = useState(null); // Reply being edited (reply._id)
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null); // Index of the reply being edited
  const [editedReply, setEditedReply] = useState(""); // Text for editing
  const [anonymousEdit_reply, setAnonymousEdit_reply] = useState(false); // Tracks anonymous state
  const [visibleReplyBox, setVisibleReplyBox] = useState({});
  const [replyText, setReplyText] = useState("");
  const [anonymousReply, setAnonymousReply] = useState(false);

  //handle delete comments
  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/blogReview/delete/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );
      //window.location.reload();
      fetchComments(); // Refresh the comments list
      if (response.status === 200) {
        toast.success("Comment deleted successfully!");
        fetchComments(); // Refresh the comments list
      } else {
        throw new Error(response.data.detail || "Failed to delete comment");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while deleting the comment"
      );
    }
  };

  // Fetch comments on component mount
  const fetchUserEmail = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/blogReview/${userId}`
      ); // Replace with your API endpoint
      if (response.data?.email) {
        console.log("Fetched Email:", response.data.email);
        return response.data.email; // Return the fetched email
      } else {
        console.error("Email not found for user_id:", userId);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching email for user_id ${userId}:`, error);
      return null;
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/blogReview/get_comments/${blogId}`
      );

      console.log("Response: ", response);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleToggleReplies = (commentId) => {
    setVisibleReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId], // Toggle the visibility
    }));
  };

  // Check if the current user is the author of the comment
  const fetchReplies = async (reviewId) => {
    console.log("Review ID passed to fetchReplies:", reviewId);

    if (!reviewId) {
      console.error("Review ID is undefined. Skipping fetchReplies call.");
      return;
    }

    setLoadingReplies((prev) => ({ ...prev, [reviewId]: true }));

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/blogReview/get_replies/${reviewId}` // Backend endpoint
      );
      console.log("Fetched replies:", response.data);

      setReplies((prev) => ({
        ...prev,
        [reviewId]: response.data.replies || [], // Key replies by review ID
      }));
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [reviewId]: false }));
    }
  };

  //handle create comments
  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blogReview/create",
        {
          blog_id: blogId,
          comment: comment,
          anonymous: anonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      if (response.status === 200) {
        console.log("Triggering success toast"); // Debugging line
        toast.success("Comment submitted successfully!");
        setComment(""); // Clear the comment field
        setAnonymous(false); // Reset the anonymity option
        fetchComments(); // Refresh the comments list
      } else {
        console.log("Triggering error toast"); // Debugging line
        throw new Error(response.data.detail || "Failed to submit comment");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail || error.message || "An error occurred"
      );
    }
  };
  //handle edit comments
  const handleEditSubmit = async (commentId) => {
    if (!commentId) {
      toast.error("Comment ID is missing!");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/blogReview/update_comment/${commentId}`,
        {
          comment: editedComment, // Replace with your input state
          anonymous: anonymousEdit, // Replace with your radio button state
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Comment updated successfully!");
        fetchComments(); // Refresh the comments
      } else {
        throw new Error(response.data.detail || "Failed to update comment");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail || error.message || "An error occurred"
      );
    }
  };

  //reply CRUD
  const handleDeleteReply = async (reviewId, replyIndex) => {
    if (!reviewId || replyIndex === undefined) {
      toast.error("Invalid review ID or reply index");
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/blogReview/delete_reply/${reviewId}/${replyIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authentication
          },
        }
      );

      if (response.status === 200) {
        toast.success("Reply deleted successfully!");
        fetchReplies(reviewId); // Refresh the replies
      } else {
        throw new Error(response.data.detail || "Failed to delete reply");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail || error.message || "An error occurred"
      );
    }
  };

  //handle edit Reply to comments
  const handleEditReply = async (reply, index) => {
    try {
      // Verify the token is available

      if (!token) throw new Error("Token not found. Please log in.");

      // Prepare updated data
      const updatedReply = {
        reply_text: editedReply,
        anonymous: anonymousEdit_reply,
      };

      // Send to backend
      const response = await axios.put(
        `http://127.0.0.1:8000/blogReview/update_reply/${reply}/${index}`,
        updatedReply,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Success handling
      fetchReplies(reply);
      console.log("Reply updated:", response.data.message);
      setEditModeReply(null); // Exit edit mode
      setCurrentEditingIndex(null);
      // Optionally: Refresh data
    } catch (error) {
      if (error.response) {
        // Backend returned a response
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        // Request made but no response
        console.error("No response from server:", error.request);
      } else {
        // Other errors
        console.error("Error editing reply:", error.message);
      }
    }
  };

  const handleToggleReplyBox = (commentId) => {
    setVisibleReplyBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handlePostReply = async (reviewId) => {
    if (!replyText.trim()) {
      alert("Reply text cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/blogReview/create_reply/${reviewId}`,
        {
          reply_text: replyText,
          anonymous,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      alert("Reply added successfully!");
      setReplyText(""); // Clear the text field after submission
      setAnonymous(false); // Reset anonymous toggle
      fetchReplies(reviewId); // Refresh replies if needed
    } catch (error) {
      console.error("Failed to post reply:", error);
      alert(error.response?.data?.detail || "Failed to post reply");
    }
  };
  const getTipContent = (index) => {
    const tipsContent = [
      "Set clear and measurable financial goals to guide your investment decisions.",
      "Evaluate your risk tolerance to determine suitable investment options.",
      "Spread your investments across different asset classes to minimize risk.",
      "Invest in industries or areas you are familiar with for better understanding.",
      "Choose low-cost investment options to maximize your returns.",
      "Utilize accounts like 401(k) or IRAs for tax advantages.",
      "Make regular contributions to your investment portfolio.",
      "Avoid making impulsive decisions based on market fluctuations.",
      "Focus on long-term growth rather than short-term gains.",
      "Keep learning about market trends and investment strategies.",
    ];
    return tipsContent[index] || "";
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        color: "#351742",
      }}
    >
      
      <Navbar />
      {/* Scrollable Content */}
      <Box
        sx={{
          position: "absolute",
          top: "100px", // Adjust based on AppBar height + margin
          left: 0,
          width: "100%",
          height: "calc(100vh - 100px)", // Adjust height dynamically
          overflowY: "scroll",
          padding: "0 5%",
        }}
      >
        {/* Top Image */}
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
          <img
            src="/assets/invetsmentPage.webp"
            alt="Investment Tips"
            style={{
              width: "90%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "100px",
            }}
          />
        </Box>

        {/* Main Content Layout */}
        <Box
          sx={{ display: "flex", width: "90%", margin: "40px auto", gap: 4 }}
        >
          {/* Left Side - Article */}
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "'Gravitas One'",
                textAlign: "center",
              }}
            >
              Top 10 Investment Tips for Beginners
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontFamily: "'Lilita One'",
                mt: 2,
                textAlign: "center",
                color: "#000000",
              }}
            >
              Investing is a critical step towards building wealth and achieving
              financial freedom. Whether you're new to investing or looking to
              refine your strategy, these tips will help you make informed
              decisions and grow your portfolio over time.
            </Typography>
            {/* Investment Tips */}
            {[...Array(10)].map((_, index) => (
              <Box key={index} sx={{ mt: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "'Fraunces'",
                    color: "#351742",
                  }}
                >
                  {index + 1}. {getTipContent(index)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right Side - Community Forum */}
          <Box
            sx={{
              flex: 1,
              borderLeft: "2px solid #351742",
              paddingLeft: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#351742",
              }}
            >
              Community Forum
            </Typography>

            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: 3,
                backgroundColor: "#f9f9f9",
                mt: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#351742",
                }}
              >
                Leave a Comment
              </Typography>

              {/* TextField for Comment */}
              <TextField
                fullWidth
                label="Your Comment"
                multiline
                rows={3}
                sx={{ mt: 2 }}
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Update comment state
              />
              {/* Radio Buttons for Anonymity */}
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: "#351742",
                }}
              >
                Post as:
              </Typography>
              <FormControl sx={{ mt: 1 }}>
                <RadioGroup
                  row
                  defaultValue="public"
                  name="anonymity-options"
                  value={anonymous ? "anonymous" : "public"}
                  onChange={(e) => setAnonymous(e.target.value === "anonymous")}
                >
                  <FormControlLabel
                    value="anonymous"
                    control={<Radio />}
                    label="Anonymous"
                    sx={{ color: "#351742" }}
                  />
                </RadioGroup>
              </FormControl>

              {/* Submit Button */}
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#351742",
                }}
                onClick={handleSubmit} // Call handleSubmit on click
              >
                Submit
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#351742" }}
              >
                Comments
              </Typography>
              {comments.map((comment) => {
                const commentUserId = comment.user_id;
                const isAuthor = async (commentUserId, currentUserId) => {
                  const email = await fetchUserEmail(commentUserId);
                  return email === currentUserId;
                };

                const isAuthorReply = async (replytUserId, currentUserId) => {
                  const email = await fetchUserEmail(replytUserId);
                  return email === currentUserId;
                };

                return (
                  <Box
                    key={comment.comment_id}
                    sx={{
                      mt: 2,
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: 2,
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "end",
                      }}
                    >
                      {isAuthor && (
                        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setEditMode(comment._id);
                              setEditedComment(comment.comment); // Set initial value
                              setAnonymousEdit(comment.anonymous); // Set initial anonymous state
                            }}
                          >
                            <Edit fontSize="small" />
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDelete(comment._id)}
                          >
                            <Delete fontSize="small" />
                          </Button>
                        </Box>
                      )}
                    </div>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "#351742",
                        top: "300px",
                      }}
                    >
                      {comment.username || "Anonymous"}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                      {comment.comment}
                    </Typography>

                    {editMode === comment._id && (
                      <div
                        style={{
                          background: "white",
                          padding: "10px",
                          margin: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Edit Comment"
                            fullWidth
                            multiline
                            rows={3}
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            sx={{
                              background: "white",
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              placeContent: "space-between center", // Correct syntax for place-content
                              margin: "10px",
                              gap: "50px",
                            }}
                          >
                            <FormControl
                              component="fieldset"
                              sx={{ mt: 2, index: 2 }}
                            >
                              <FormLabel component="legend">
                                Anonymous
                              </FormLabel>
                              <RadioGroup
                                row
                                value={anonymousEdit ? "yes" : "no"}
                                onChange={(e) =>
                                  setAnonymousEdit(e.target.value === "yes")
                                }
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            <div
                              style={{
                                index: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  mt: 2,
                                  color: "green",
                                  border: "1px solid green",
                                  background: "none",
                                }}
                                onClick={() => handleEditSubmit(comment._id)}
                              >
                                <Check fontSize="small" />
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  mt: 2,
                                  ml: 2,
                                  color: "red",
                                  border: "1px solid red",
                                }}
                                onClick={() => setEditMode(null)}
                              >
                                <Close fontSize="small" />
                              </Button>
                            </div>
                          </div>
                        </Box>
                      </div>
                    )}

                    <hr />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1px",
                        margin: "5px",
                      }}
                    >
                      <Button
                        startIcon={<ThumbUp />}
                        sx={{ textTransform: "none" }}
                        size="small"
                      >
                        Like ({comment.like_count || 0})
                      </Button>
                      <Button
                        startIcon={<Comment />}
                        sx={{ textTransform: "none" }}
                        size="small"
                        onClick={() => {
                          handleToggleReplies(comment._id); // Toggle the visibility state
                          if (!visibleReplies[comment._id]) {
                            fetchReplies(comment._id); // Fetch replies only when showing
                          }
                        }}
                        disabled={loadingReplies[comment?._id]}
                      >
                        {loadingReplies[comment?._id]
                          ? "Loading..."
                          : visibleReplies[comment._id]
                          ? "Hide Replies"
                          : "Show Replies"}
                      </Button>
                      <Button
                        startIcon={<Comment />}
                        sx={{ textTransform: "none" }}
                        size="small"
                        onClick={() => handleToggleReplyBox(comment._id)} // Toggle reply box visibility
                      >
                        {visibleReplyBox[comment._id]
                          ? "Hide Reply Box"
                          : "Reply"}
                      </Button>
                    </div>
                    {visibleReplyBox[comment._id] && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label="Write your reply"
                          fullWidth
                          multiline
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          sx={{ background: "white" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "space-between",
                            margin: "10px",
                            gap: 5,
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Radio
                                checked={anonymous}
                                onChange={() => setAnonymous(!anonymous)} // Toggle state
                                sx={{ color: "#351742" }}
                              />
                            }
                            label="Anonymous"
                          />

                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => handlePostReply(comment._id)}
                          >
                            Submit Reply
                          </Button>
                        </div>
                      </Box>
                    )}

                    {visibleReplies[comment._id] && (
                      <ul>
                        {replies[comment._id] && (
                          <Box
                            sx={{
                              mt: 2,
                              pl: 3,
                              borderLeft: "2px solid #ddd",
                            }}
                          >
                            {replies[comment._id].map((reply, index) => (
                              <Box key={reply._id} sx={{ mt: 2 }}>
                                <div
                                  style={{
                                    border: "0px solid black",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    margin: "10px",
                                    background: "#ededed",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "end",
                                    }}
                                  >
                                    {isAuthorReply && (
                                      <Box
                                        sx={{
                                          mt: 1,
                                          display: "flex",
                                          gap: 1,
                                        }}
                                      >
                                        <Button
                                          size="small"
                                          variant="outlined"
                                          color="primary"
                                          sx={{ fontSize: "0.8rem" }}
                                          onClick={() => {
                                            setEditModeReply(reply._id);
                                            setCurrentEditingIndex(index);
                                            setEditedReply(reply.reply_text);
                                            setAnonymousEdit_reply(
                                              reply.anonymous
                                            );
                                          }}
                                        >
                                          <Edit fontSize="small" />
                                        </Button>
                                        <Button
                                          size="small"
                                          variant="outlined"
                                          color="secondary"
                                          sx={{ fontSize: "0.8rem" }}
                                          onClick={() =>
                                            handleDeleteReply(
                                              comment._id,
                                              index
                                            )
                                          }
                                        >
                                          <Delete fontSize="small" />
                                        </Button>
                                      </Box>
                                    )}
                                  </div>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: "bold",
                                      color: "#351742",
                                    }}
                                  >
                                    {reply.username || "Anonymous"}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ mt: 1, color: "#555" }}
                                  >
                                    {reply.reply_text}
                                  </Typography>
                                  <hr />
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      mt: 1,
                                      gap: 2,
                                    }}
                                  >
                                    <Button
                                      startIcon={<ThumbUp />}
                                      sx={{ textTransform: "none" }}
                                      size="small"
                                      fullWidth
                                    >
                                      Like ({reply.like_count || 0})
                                    </Button>
                                  </Box>
                                </div>
                                {/* Edit Form */}
                                {editModeReply === reply._id &&
                                  currentEditingIndex === index && (
                                    <div
                                      style={{
                                        background: "white",
                                        padding: "10px",
                                        margin: "5px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      <Box sx={{ mt: 2 }}>
                                        <TextField
                                          label="Edit Reply"
                                          fullWidth
                                          multiline
                                          rows={3}
                                          value={editedReply}
                                          onChange={(e) =>
                                            setEditedReply(e.target.value)
                                          }
                                          sx={{
                                            background: "white",
                                          }}
                                        />
                                        <div
                                          style={{
                                            display: "flex",
                                            placeContent:
                                              "space-between center", // Correct syntax for place-content
                                            margin: "10px",
                                            gap: "50px",
                                          }}
                                        >
                                          <FormControl
                                            component="fieldset"
                                            sx={{ mt: 2 }}
                                          >
                                            <FormLabel component="legend">
                                              Anonymous
                                            </FormLabel>
                                            <RadioGroup
                                              row
                                              value={
                                                anonymousEdit_reply
                                                  ? "yes"
                                                  : "no"
                                              }
                                              onChange={(e) =>
                                                setAnonymousEdit_reply(
                                                  e.target.value === "yes"
                                                )
                                              }
                                            >
                                              <FormControlLabel
                                                value="yes"
                                                control={<Radio />}
                                                label="Yes"
                                              />
                                              <FormControlLabel
                                                value="no"
                                                control={<Radio />}
                                                label="No"
                                              />
                                            </RadioGroup>
                                          </FormControl>
                                          <div
                                            style={{
                                              index: 3,
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              sx={{
                                                mt: 2,
                                                color: "green",
                                                border: "1px solid green",
                                                background: "none",
                                              }}
                                              onClick={() =>
                                                handleEditReply(
                                                  comment._id,
                                                  index
                                                )
                                              }
                                            >
                                              <Check fontSize="small" />
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              color="secondary"
                                              sx={{
                                                mt: 2,
                                                ml: 2,
                                                color: "red",
                                                border: "1px solid red",
                                              }}
                                              onClick={() => {
                                                setEditModeReply(null);
                                                setCurrentEditingIndex(null);
                                              }}
                                            >
                                              <Close fontSize="small" />
                                            </Button>
                                          </div>
                                        </div>
                                      </Box>
                                    </div>
                                  )}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </ul>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Other Articles Section */}
        <Box sx={{ width: "80%", margin: "40px auto" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#351742",
              fontFamily: "'Lilita One'",
            }}
          >
            Other Articles
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 3,
            }}
          >
            <Card sx={{ width: "300px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#351742",
                    fontFamily: "'Lilita One'",
                  }}
                >
                  Budgeting Basics
                </Typography>
                <Button
                  component={Link}
                  to="/budgeting"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: "#351742",
                    fontFamily: "'Lilita One'",
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
            <Card sx={{ width: "300px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#351742",
                    fontFamily: "'Lilita One'",
                  }}
                >
                  Saving Strategies
                </Typography>
                <Button
                  component={Link}
                  to="/saving"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: "#351742",
                    fontFamily: "'Lilita One'",
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvestingBlog;