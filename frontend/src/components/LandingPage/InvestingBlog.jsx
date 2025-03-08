import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  Avatar,
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
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import moment from "moment"; // Make sure to install moment: npm install moment

const InvestingBlog = () => {
  const blogId = "12345"; // Declare blogId here
  const token = localStorage.getItem("authToken"); // Get the token from local storage
  const currentUser = localStorage.getItem("email");
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
  const [userLikes, setUserLikes] = useState({});
  const [replyCounts, setReplyCounts] = useState({});
  const [replyLikes, setReplyLikes] = useState({}); // Add new state for reply likes
  const [isCommentAuthor, setIsCommentAuthor] = useState({});
  const [isReplyAuthor, setIsReplyAuthor] = useState({});

  const buttonStyles = {
    primary: {
      backgroundColor: "#351742",
      color: "white",
      "&:hover": {
        backgroundColor: "#5e3967",
      },
    },
    secondary: {
      backgroundColor: "#00cac9",
      color: "white",
      "&:hover": {
        backgroundColor: "#008f8e",
      },
    },
    outlined: {
      border: "1px solid #5e3967",
      color: "#5e3967",
      "&:hover": {
        backgroundColor: "rgba(94, 57, 103, 0.1)",
        border: "1px solid #351742",
        color: "#351742",
      },
    },
    action: {
      color: "#5e3967",
      "&:hover": {
        backgroundColor: "rgba(0, 202, 201, 0.1)",
        color: "#00cac9",
      },
    },
    like: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: (props) => (props.isLiked ? "#00cac9" : "#5e3967"),
      backgroundColor: (props) =>
        props.isLiked ? "rgba(0, 202, 201, 0.1)" : "transparent",
      border: (props) =>
        props.isLiked ? "1px solid #00cac9" : "1px solid #5e3967",
      "&:hover": {
        backgroundColor: (props) =>
          props.isLiked ? "rgba(0, 202, 201, 0.2)" : "rgba(94, 57, 103, 0.1)",
      },
    },
  };

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

      const comments = response.data.comments || [];

      // Fetch reply counts for each comment
      const counts = {};
      for (const comment of comments) {
        const countResponse = await axios.get(
          `http://127.0.0.1:8000/blogReview/reply-count/${comment._id}`
        );
        counts[comment._id] = countResponse.data.count;
      }

      setReplyCounts(counts);
      setComments(comments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      await fetchComments();
    };
    initializePage();
  }, [blogId]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!token || !comments.length) return;

      try {
        const likes = {};
        for (const comment of comments) {
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/blogReview/check-like/${comment._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            likes[comment._id] = response.data.hasLiked;
          } catch (error) {
            console.error(
              `Error fetching like for comment ${comment._id}:`,
              error
            );
            likes[comment._id] = false; // Default to unliked if there's an error
          }
        }
        setUserLikes(likes);
      } catch (error) {
        console.error("Error in fetchLikes:", error);
        // Don't update userLikes state if there's a top-level error
      }
    };

    fetchLikes();
  }, [comments, token]);

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
  const handleLike = async (reviewId) => {
    if (!token) {
      toast.error("Please login to like comments");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/blogReview/like/${reviewId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI immediately with optimistic update
      const isNowLiked = !userLikes[reviewId];

      setUserLikes((prev) => ({
        ...prev,
        [reviewId]: isNowLiked,
      }));

      // Update comments array
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === reviewId
            ? {
                ...comment,
                like_count: isNowLiked
                  ? (comment.like_count || 0) + 1
                  : (comment.like_count || 1) - 1,
              }
            : comment
        )
      );
    } catch (error) {
      // Revert optimistic update on error
      setUserLikes((prev) => ({
        ...prev,
        [reviewId]: !prev[reviewId],
      }));
      console.error("Like error:", error);
    }
  };

  const handleReplyLike = async (reviewId, replyIndex) => {
    if (!token) {
      toast.error("Please login to like replies");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/blogReview/like_reply/${reviewId}/${replyIndex}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI
      setReplyLikes((prev) => ({
        ...prev,
        [`${reviewId}-${replyIndex}`]: response.data.hasLiked,
      }));

      // Update replies state
      setReplies((prev) => ({
        ...prev,
        [reviewId]: prev[reviewId].map((reply, idx) =>
          idx === replyIndex
            ? { ...reply, like_count: response.data.like_count }
            : reply
        ),
      }));
    } catch (error) {
      console.error("Reply like error:", error);
    }
  };

  const LikeButton = ({ comment }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
      if (isLoading) return;
      setIsLoading(true);
      await handleLike(comment._id);
      setIsLoading(false);
    };

    return (
      <Button
        onClick={handleClick}
        disabled={!token || isLoading}
        sx={{
          ...buttonStyles.like,
          "& .MuiSvgIcon-root": {
            color: userLikes[comment._id] ? "#00cac9" : "#5e3967",
          },
          "& .MuiTypography-root": {
            color: userLikes[comment._id] ? "#00cac9" : "#5e3967",
          },
        }}
      >
        <ThumbUp
          sx={{
            transform: userLikes[comment._id] ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.2s ease",
            color: userLikes[comment._id] ? "#351742" : "inherit",
          }}
        />
        <span
          style={{
            fontWeight: userLikes[comment._id] ? "600" : "400",
            color: userLikes[comment._id] ? "#351742" : "inherit",
          }}
        >
          {isLoading ? "..." : comment.like_count || 0}
        </span>
      </Button>
    );
  };

  const ReplyLikeButton = ({ reviewId, replyIndex, reply }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
      if (isLoading) return;
      setIsLoading(true);
      await handleReplyLike(reviewId, replyIndex);
      setIsLoading(false);
    };

    const isLiked = replyLikes[`${reviewId}-${replyIndex}`];

    return (
      <Button
        startIcon={
          <ThumbUp
            sx={{
              color: isLiked ? "#00cac9" : "#5e3967",
            }}
          />
        }
        onClick={handleClick}
        disabled={!token || isLoading}
        fullWidth
        sx={{
          ...buttonStyles.like,
          color: isLiked ? "#00cac9" : "#5e3967",
          backgroundColor: isLiked ? "rgba(0, 202, 201, 0.1)" : "transparent",
          border: isLiked ? "1px solid #00cac9" : "1px solid #5e3967",
          width: "100%",
          justifyContent: "center",
          gap: 2,
          "&:hover": {
            backgroundColor: isLiked
              ? "rgba(0, 202, 201, 0.2)"
              : "rgba(94, 57, 103, 0.1)",
          },
        }}
      >
        <span
          style={{
            fontWeight: isLiked ? "600" : "400",
            color: isLiked ? "#00cac9" : "#5e3967",
          }}
        >
          {isLoading ? "..." : reply.like_count || 0}
        </span>
      </Button>
    );
  };

  useEffect(() => {
    const fetchReplyLikes = async () => {
      if (!token) return;

      try {
        for (const [reviewId, replyList] of Object.entries(replies)) {
          for (let i = 0; i < replyList.length; i++) {
            const response = await axios.get(
              `http://127.0.0.1:8000/blogReview/check_reply_like/${reviewId}/${i}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setReplyLikes((prev) => ({
              ...prev,
              [`${reviewId}-${i}`]: response.data.hasLiked,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching reply likes:", error);
      }
    };

    if (Object.keys(replies).length > 0) {
      fetchReplyLikes();
    }
  }, [replies, token]);

  const checkCommentAuthor = async (commentUserId) => {
    try {
      const email = await fetchUserEmail(commentUserId);
      return email === currentUser;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const checkAuthorship = async () => {
      const authorshipMap = {};
      const replyAuthorshipMap = {};

      for (const comment of comments) {
        authorshipMap[comment._id] = await checkCommentAuthor(comment.user_id);

        // Check replies if they exist
        const commentReplies = replies[comment._id] || [];
        for (const reply of commentReplies) {
          replyAuthorshipMap[`${comment._id}-${reply._id}`] =
            await checkCommentAuthor(reply.user_id);
        }
      }

      setIsCommentAuthor(authorshipMap);
      setIsReplyAuthor(replyAuthorshipMap);
    };

    checkAuthorship();
  }, [comments, replies]);

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

  useEffect(() => {
    const checkAuthorship = async () => {
      const authorshipMap = {};
      const replyAuthorshipMap = {};

      for (const comment of comments) {
        authorshipMap[comment._id] = await checkCommentAuthor(comment.user_id);

        // Check replies if they exist
        const commentReplies = replies[comment._id] || [];
        for (const reply of commentReplies) {
          replyAuthorshipMap[`${comment._id}-${reply._id}`] =
            await checkCommentAuthor(reply.user_id);
        }
      }

      setIsCommentAuthor(authorshipMap);
      setIsReplyAuthor(replyAuthorshipMap);
    };

    checkAuthorship();
  }, [comments, replies]);

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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1px",
                }}
              >
                <FormControl
                  sx={{
                    mt: 1,
                  }}
                >
                  <RadioGroup
                    row
                    defaultValue="public"
                    name="anonymity-options"
                    value={anonymous ? "anonymous" : "public"}
                    onChange={(e) =>
                      setAnonymous(e.target.value === "anonymous")
                    }
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
                  sx={buttonStyles.primary}
                  onClick={handleSubmit} // Call handleSubmit on click
                >
                  Submit
                </Button>
              </div>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#351742" }}
              >
                Comments
              </Typography>
              {comments.map((comment) => (
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
                    {isCommentAuthor[comment._id] && (
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#351742",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {comment.username
                        ? comment.username[0].toUpperCase()
                        : "A"}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          color: "#351742",
                        }}
                      >
                        {comment.username || "Anonymous"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#666",
                          display: "block",
                          fontSize: "10px",
                        }}
                      >
                        {moment(comment.created_at).fromNow()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                    {comment.comment}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      display: "flex",
                      mt: 1,
                      fontSize: "0.7rem",
                      justifyContent: "end",
                      marginRight: "20px",
                    }}
                  >
                    {replyCounts[comment._id] || 0} replies
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
                            <FormLabel component="legend">Anonymous</FormLabel>
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
                      gap: "0px",
                      margin: "5px",
                    }}
                  >
                    <LikeButton comment={comment} />

                    <Button
                      startIcon={<Comment />}
                      sx={buttonStyles.action}
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
                      sx={buttonStyles.action}
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
                          sx={buttonStyles.secondary}
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
                                  {isReplyAuthor[
                                    `${comment._id}-${reply._id}`
                                  ] && (
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
                                        sx={buttonStyles.outlined}
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
                                        sx={buttonStyles.outlined}
                                        onClick={() =>
                                          handleDeleteReply(comment._id, index)
                                        }
                                      >
                                        <Delete fontSize="small" />
                                      </Button>
                                    </Box>
                                  )}
                                </div>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 1,
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      bgcolor: "#00cac9",
                                      width: 32,
                                      height: 32,
                                    }}
                                  >
                                    {reply.username
                                      ? reply.username[0].toUpperCase()
                                      : "A"}
                                  </Avatar>
                                  <Box>
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
                                      variant="caption"
                                      sx={{
                                        color: "#666",
                                        display: "block",
                                        fontSize: "10px",
                                      }}
                                    >
                                      {moment(reply.created_at).fromNow()}
                                    </Typography>
                                  </Box>
                                </Box>
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
                                  <ReplyLikeButton
                                    reviewId={comment._id}
                                    replyIndex={index}
                                    reply={reply}
                                    sx={{ width: "100%" }}
                                  />
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
                                          placeContent: "space-between center", // Correct syntax for place-content
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
                                              anonymousEdit_reply ? "yes" : "no"
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
              ))}
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
                  to="/savingBlog"
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
