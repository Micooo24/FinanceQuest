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
  IconButton,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
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
import moment from "moment";

const SavingBlog = () => {
  const blogId = "1234";
  const token = localStorage.getItem("authToken");
  const currentUser = localStorage.getItem("email");

  // State Declarations
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [anonymousEdit, setAnonymousEdit] = useState(false);
  const [replies, setReplies] = useState({});
  const [comments, setComments] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});
  const [editModeReply, setEditModeReply] = useState(null);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null);
  const [editedReply, setEditedReply] = useState("");
  const [anonymousEdit_reply, setAnonymousEdit_reply] = useState(false);
  const [visibleReplyBox, setVisibleReplyBox] = useState({});
  const [replyText, setReplyText] = useState("");
  const [anonymousReply, setAnonymousReply] = useState(false);
  const [userLikes, setUserLikes] = useState({});
  const [replyCounts, setReplyCounts] = useState({});
  const [replyLikes, setReplyLikes] = useState({});
  const [isCommentAuthor, setIsCommentAuthor] = useState({});
  const [isReplyAuthor, setIsReplyAuthor] = useState({});

  // Button Styles
  const buttonStyles = {
    primary: {
      backgroundColor: "#351742",
      color: "white",
      "&:hover": { backgroundColor: "#5e3967" },
    },
    secondary: {
      backgroundColor: "#00cac9",
      color: "white",
      "&:hover": { backgroundColor: "#008f8e" },
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
      backgroundColor: (props) => (props.isLiked ? "rgba(0, 202, 201, 0.1)" : "transparent"),
      border: (props) => (props.isLiked ? "1px solid #00cac9" : "1px solid #5e3967"),
      "&:hover": {
        backgroundColor: (props) =>
          props.isLiked ? "rgba(0, 202, 201, 0.2)" : "rgba(94, 57, 103, 0.1)",
      },
    },
  };

  // API Handlers
  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/blogReview/delete/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
      if (response.status === 200) toast.success("Comment deleted successfully!");
      else throw new Error(response.data.detail || "Failed to delete comment");
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting the comment");
    }
  };

  const fetchUserEmail = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/blogReview/${userId}`);
      return response.data?.email || null;
    } catch (error) {
      console.error(`Error fetching email for user_id ${userId}:`, error);
      return null;
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/blogReview/get_comments/${blogId}`);
      const comments = response.data.comments || [];
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

  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty!");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blogReview/create",
        { blog_id: blogId, comment, anonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Comment submitted successfully!");
        setComment("");
        setAnonymous(false);
        fetchComments();
      } else throw new Error(response.data.detail || "Failed to submit comment");
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || "An error occurred");
    }
  };

  const handleEditSubmit = async (commentId) => {
    if (!commentId) return toast.error("Comment ID is missing!");
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/blogReview/update_comment/${commentId}`,
        { comment: editedComment, anonymous: anonymousEdit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Comment updated successfully!");
        setEditMode(null);
        fetchComments();
      } else throw new Error(response.data.detail || "Failed to update comment");
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || "An error occurred");
    }
  };

  const fetchReplies = async (reviewId) => {
    if (!reviewId) return console.error("Review ID is undefined.");
    setLoadingReplies((prev) => ({ ...prev, [reviewId]: true }));
    try {
      const response = await axios.get(`http://127.0.0.1:8000/blogReview/get_replies/${reviewId}`);
      setReplies((prev) => ({ ...prev, [reviewId]: response.data.replies || [] }));
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [reviewId]: false }));
    }
  };

  const handleToggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleToggleReplyBox = (commentId) => {
    setVisibleReplyBox((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handlePostReply = async (reviewId) => {
    if (!replyText.trim()) return toast.error("Reply text cannot be empty.");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/blogReview/create_reply/${reviewId}`,
        { reply_text: replyText, anonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reply added successfully!");
      setReplyText("");
      setAnonymous(false);
      fetchReplies(reviewId);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to post reply");
    }
  };

  const handleDeleteReply = async (reviewId, replyIndex) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/blogReview/delete_reply/${reviewId}/${replyIndex}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Reply deleted successfully!");
        fetchReplies(reviewId);
      } else throw new Error(response.data.detail || "Failed to delete reply");
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || "An error occurred");
    }
  };

  const handleEditReply = async (reply, index) => {
    try {
      const updatedReply = { reply_text: editedReply, anonymous: anonymousEdit_reply };
      const response = await axios.put(
        `http://127.0.0.1:8000/blogReview/update_reply/${reply}/${index}`,
        updatedReply,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReplies(reply);
      setEditModeReply(null);
      setCurrentEditingIndex(null);
      toast.success("Reply updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Error editing reply");
    }
  };

  const handleLike = async (reviewId) => {
    if (!token) return toast.error("Please login to like comments");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/blogReview/like/${reviewId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const isNowLiked = !userLikes[reviewId];
      setUserLikes((prev) => ({ ...prev, [reviewId]: isNowLiked }));
      setComments((prev) =>
        prev.map((c) =>
          c._id === reviewId
            ? { ...c, like_count: isNowLiked ? (c.like_count || 0) + 1 : (c.like_count || 1) - 1 }
            : c
        )
      );
    } catch (error) {
      setUserLikes((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
      console.error("Like error:", error);
    }
  };

  const handleReplyLike = async (reviewId, replyIndex) => {
    if (!token) return toast.error("Please login to like replies");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/blogReview/like_reply/${reviewId}/${replyIndex}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyLikes((prev) => ({
        ...prev,
        [`${reviewId}-${replyIndex}`]: response.data.hasLiked,
      }));
      setReplies((prev) => ({
        ...prev,
        [reviewId]: prev[reviewId].map((reply, idx) =>
          idx === replyIndex ? { ...reply, like_count: response.data.like_count } : reply
        ),
      }));
    } catch (error) {
      console.error("Reply like error:", error);
    }
  };

  // Effect Hooks
  useEffect(() => {
    fetchComments();
  }, [blogId]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!token || !comments.length) return;
      const likes = {};
      for (const comment of comments) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/blogReview/check-like/${comment._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          likes[comment._id] = response.data.hasLiked;
        } catch (error) {
          likes[comment._id] = false;
        }
      }
      setUserLikes(likes);
    };
    fetchLikes();
  }, [comments, token]);

  useEffect(() => {
    const fetchReplyLikes = async () => {
      if (!token) return;
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
    };
    if (Object.keys(replies).length > 0) fetchReplyLikes();
  }, [replies, token]);

  useEffect(() => {
    const checkAuthorship = async () => {
      const authorshipMap = {};
      const replyAuthorshipMap = {};
      for (const comment of comments) {
        authorshipMap[comment._id] = await checkCommentAuthor(comment.user_id);
        const commentReplies = replies[comment._id] || [];
        for (const reply of commentReplies) {
          replyAuthorshipMap[`${comment._id}-${reply._id}`] = await checkCommentAuthor(reply.user_id);
        }
      }
      setIsCommentAuthor(authorshipMap);
      setIsReplyAuthor(replyAuthorshipMap);
    };
    checkAuthorship();
  }, [comments, replies]);

  const checkCommentAuthor = async (commentUserId) => {
    try {
      const email = await fetchUserEmail(commentUserId);
      return email === currentUser;
    } catch (error) {
      return false;
    }
  };

  // Like Button Components
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
          "& .MuiSvgIcon-root": { color: userLikes[comment._id] ? "#00cac9" : "#5e3967" },
        }}
      >
        <ThumbUp sx={{ color: userLikes[comment._id] ? "#00cac9" : "#5e3967" }} />
        <Typography sx={{ ml: 1 }}>{isLoading ? "..." : comment.like_count || 0}</Typography>
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
        startIcon={<ThumbUp sx={{ color: isLiked ? "#00cac9" : "#5e3967" }} />}
        onClick={handleClick}
        disabled={!token || isLoading}
        sx={{ ...buttonStyles.like, mt: 1 }}
      >
        <Typography sx={{ color: isLiked ? "#00cac9" : "#5e3967" }}>
          {isLoading ? "..." : reply.like_count || 0}
        </Typography>
      </Button>
    );
  };

  const getTipContent = (index) => {
    const tipsContent = [
      "Set specific savings goals to stay motivated and track your progress.",
      "Create a budget to understand your income and expenses clearly.",
      "Build an emergency fund with 3-6 months' worth of living expenses.",
      "Automate your savings to ensure consistency without temptation to spend.",
      "Cut unnecessary expenses to free up more money for saving.",
      "Use high-yield savings accounts to earn more interest on your money.",
      "Save windfalls like tax refunds or bonuses instead of spending them.",
      "Track your savings regularly to stay on top of your financial goals.",
      "Start small if needed, but increase your savings rate over time.",
      "Educate yourself on saving strategies to maximize your efforts.",
    ];
    return tipsContent[index] || "";
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", color: "#351742" }}>
      <Navbar />
      <Box sx={{ maxWidth: "1200px", mx: "auto", pt: 12, pb: 6, px: 2 }}>
        {/* Top Image */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img
            src="/mediaMinigameInvestment/about/pic2.png"
            alt="Saving Tips"
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "16px" }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
          {/* Left Side - Article */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", textAlign: "center" }}>
              Top 10 Saving Tips for Beginners
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", fontFamily: "'Lilita One'", mt: 2, textAlign: "center", color: "#000000" }}>
              Saving money is the foundation of financial security. These tips will help you start saving effectively and build a strong financial future.
            </Typography>
            {[
              "Set Savings Goals",
              "Create a Budget",
              "Build an Emergency Fund",
              "Automate Savings",
              "Cut Unnecessary Spending",
              "Use High-Yield Accounts",
              "Save Windfalls",
              "Track Your Progress",
              "Increase Savings Gradually",
              "Learn Saving Strategies",
            ].map((tip, index) => (
              <Box key={index} sx={{ mt: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Fraunces'", color: "#351742" }}>
                  {index + 1}. {tip}
                </Typography>
                <Typography sx={{ fontSize: "1rem", fontFamily: "'Lilita One'", mt: 1, color: "#000000" }}>
                  {getTipContent(index)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right Side - Community Forum */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#351742" }}>
              Community Forum
            </Typography>

            {/* Comment Input */}
            <Card sx={{ p: 2, mb: 3, bgcolor: "white", borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#351742", mb: 2 }}>
                Leave a Comment
              </Typography>
              <TextField
                fullWidth
                label="Your Comment"
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FormControl>
                  <RadioGroup
                    row
                    value={anonymous ? "anonymous" : "public"}
                    onChange={(e) => setAnonymous(e.target.value === "anonymous")}
                  >
                    <FormControlLabel
                      value="anonymous"
                      control={<Radio sx={{ color: "#351742" }} />}
                      label="Post Anonymously"
                    />
                  </RadioGroup>
                </FormControl>
                <Button variant="contained" sx={buttonStyles.primary} onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Card>

            {/* Comments List */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {comments.map((comment) => (
                <Card key={comment.comment_id} sx={{ p: 2, bgcolor: "white", borderRadius: 2, boxShadow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#351742", width: 36, height: 36 }}>
                        {comment.username ? comment.username[0].toUpperCase() : "A"}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#351742" }}>
                          {comment.username || "Anonymous"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#666" }}>
                          {moment(comment.created_at).fromNow()}
                        </Typography>
                      </Box>
                    </Box>
                    {isCommentAuthor[comment._id] && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditMode(comment._id);
                            setEditedComment(comment.comment);
                            setAnonymousEdit(comment.anonymous);
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(comment._id)}>
                          <Delete fontSize="small" color="error" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  {/* Comment Content */}
                  {editMode === comment._id ? (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <FormControl>
                          <RadioGroup
                            row
                            value={anonymousEdit ? "yes" : "no"}
                            onChange={(e) => setAnonymousEdit(e.target.value === "yes")}
                          >
                            <FormControlLabel value="yes" control={<Radio />} label="Anonymous" />
                            <FormControlLabel value="no" control={<Radio />} label="Public" />
                          </RadioGroup>
                        </FormControl>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleEditSubmit(comment._id)}
                          >
                            <Check />
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => setEditMode(null)}
                          >
                            <Close />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                      {comment.comment}
                    </Typography>
                  )}

                  {/* Actions */}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <LikeButton comment={comment} />
                    <Button
                      startIcon={<Comment />}
                      size="small"
                      onClick={() => {
                        handleToggleReplies(comment._id);
                        if (!visibleReplies[comment._id]) fetchReplies(comment._id);
                      }}
                      disabled={loadingReplies[comment?._id]}
                    >
                      {loadingReplies[comment?._id]
                        ? "Loading..."
                        : `${visibleReplies[comment._id] ? "Hide" : "Show"} Replies (${
                            replyCounts[comment._id] || 0
                          })`}
                    </Button>
                    <Button size="small" onClick={() => handleToggleReplyBox(comment._id)}>
                      {visibleReplyBox[comment._id] ? "Cancel" : "Reply"}
                    </Button>
                  </Box>

                  {/* Reply Input */}
                  {visibleReplyBox[comment._id] && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <FormControlLabel
                          control={<Radio checked={anonymous} onChange={() => setAnonymous(!anonymous)} />}
                          label="Anonymous"
                        />
                        <Button
                          variant="contained"
                          sx={buttonStyles.secondary}
                          onClick={() => handlePostReply(comment._id)}
                        >
                          Post Reply
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* Replies */}
                  {visibleReplies[comment._id] && replies[comment._id] && (
                    <Box sx={{ mt: 2, pl: 4, borderLeft: "2px solid #ddd" }}>
                      {replies[comment._id].map((reply, index) => (
                        <Box key={reply._id} sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar sx={{ bgcolor: "#00cac9", width: 32, height: 32 }}>
                                {reply.username ? reply.username[0].toUpperCase() : "A"}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#351742" }}>
                                  {reply.username || "Anonymous"}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#666" }}>
                                  {moment(reply.created_at).fromNow()}
                                </Typography>
                              </Box>
                            </Box>
                            {isReplyAuthor[`${comment._id}-${reply._id}`] && (
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setEditModeReply(reply._id);
                                    setCurrentEditingIndex(index);
                                    setEditedReply(reply.reply_text);
                                    setAnonymousEdit_reply(reply.anonymous);
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteReply(comment._id, index)}
                                >
                                  <Delete fontSize="small" color="error" />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                          {editModeReply === reply._id && currentEditingIndex === index ? (
                            <Box sx={{ mt: 2 }}>
                              <TextField
                                fullWidth
                                multiline
                                rows={2}
                                value={editedReply}
                                onChange={(e) => setEditedReply(e.target.value)}
                                sx={{ mb: 2 }}
                              />
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <FormControl>
                                  <RadioGroup
                                    row
                                    value={anonymousEdit_reply ? "yes" : "no"}
                                    onChange={(e) => setAnonymousEdit_reply(e.target.value === "yes")}
                                  >
                                    <FormControlLabel value="yes" control={<Radio />} label="Anonymous" />
                                    <FormControlLabel value="no" control={<Radio />} label="Public" />
                                  </RadioGroup>
                                </FormControl>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleEditReply(comment._id, index)}
                                  >
                                    <Check />
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                      setEditModeReply(null);
                                      setCurrentEditingIndex(null);
                                    }}
                                  >
                                    <Close />
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                              {reply.reply_text}
                            </Typography>
                          )}
                          <ReplyLikeButton reviewId={comment._id} replyIndex={index} reply={reply} />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Other Articles */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", color: "#351742", fontFamily: "'Lilita One'" }}>
            Other Articles
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 3, flexWrap: "wrap" }}>
            <Card sx={{ width: "300px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#351742", fontFamily: "'Lilita One'" }}>
                  Budgeting Basics
                </Typography>
                <Button component={Link} to="/budgeting" sx={{ mt: 1, fontWeight: "bold", color: "#351742", fontFamily: "'Lilita One'" }}>
                  Read More
                </Button>
              </CardContent>
            </Card>
            <Card sx={{ width: "300px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#351742", fontFamily: "'Lilita One'" }}>
                  Investing 101
                </Typography>
                <Button component={Link} to="/investingBlog" sx={{ mt: 1, fontWeight: "bold", color: "#351742", fontFamily: "'Lilita One'" }}>
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

export default SavingBlog;