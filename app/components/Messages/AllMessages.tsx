"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  formatDistanceToNow,
  format,
  isToday,
  isYesterday,
} from "date-fns";
import { useUser } from "@/app/lib/UserContext";
import { AiOutlinePaperClip, AiOutlineSearch } from "react-icons/ai";
import {
  IoCheckmarkDone,
  IoCheckmarkOutline,
  IoSendSharp,
} from "react-icons/io5";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Swal from "sweetalert2";

import { Conversation, Message, Review, User } from "../type/Messages";
import { MdOutlineStarPurple500 } from "react-icons/md";

export default function AllMessages() {
  const { user } = useUser();
  const userId = user?._id;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string>("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [reviews, setReviews] = useState<Review[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const storage = getStorage();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch conversations and associated users.
  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/messages/conversations/${userId}`
        );
        setConversations(data);

        const uniqueUserIds = new Set(
          data.map((c: Conversation) =>
            c.user1 === userId ? c.user2 : c.user1
          )
        );
        const usersData = await Promise.all(
          Array.from(uniqueUserIds).map((id) =>
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`)
          )
        );
        const usersMap = Object.fromEntries(
          usersData.map((res) => [res.data.user._id, res.data.user])
        );
        setUsers(usersMap);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [userId]);
  const getDisplayName = (u: User) =>
    u?.role === "company" ? u?.companyName : u?.username;

  const getDisplayPhoto = (u: User) =>
    u?.role === "company" ? u?.logoURL : u?.photoURL;

  const getTimeAgo = (timestamp: string | Date | undefined) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
    return formatDistanceToNow(date, { addSuffix: true });
  };
  // Separate "Admins" and "Users" conversations.
  const adminConversations = conversations.filter((conversation) => {
    const otherUserId =
      conversation.user1 === userId ? conversation.user2 : conversation.user1;
    const otherUser = users[otherUserId];
    if (!otherUser) return false;
    return otherUser.role === "admin";
  });

  const userConversations = conversations.filter((conversation) => {
    const otherUserId =
      conversation.user1 === userId ? conversation.user2 : conversation.user1;
    const otherUser = users[otherUserId];
    if (!otherUser) return false;
    return otherUser.role !== "admin";
  });

  // Helper to check if user is at the bottom of the chat container.
  const isUserAtBottom = () => {
    if (!chatContainerRef.current) return true;
    const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
    return scrollTop + clientHeight >= scrollHeight - 100;
  };
  // ADDED SEARCH
  const filteredAdminConversations = adminConversations.filter((conversation) => {
    const otherUserId =
      conversation.user1 === userId ? conversation.user2 : conversation.user1;
    const otherUser = users[otherUserId];
    const displayName = getDisplayName(otherUser) || "";
    return displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredUserConversations = userConversations.filter((conversation) => {
    const otherUserId =
      conversation.user1 === userId ? conversation.user2 : conversation.user1;
    const otherUser = users[otherUserId];
    const displayName = getDisplayName(otherUser) || "";
    return displayName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectConversation = async (conversation: Conversation) => {

    const updatedConversation = {
      ...conversation,
      messages: conversation.messages.map((msg) =>
        msg.sender !== userId && !msg.isRead ? { ...msg, isRead: true } : msg
      ),
    };
    setSelectedConversation(updatedConversation);
    setFile(null);
    setFilePreview(null);

    // Fetch reviews for the other user.
    const otherUserId =
      conversation.user1 === userId ? conversation.user2 : conversation.user1;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reviews/${otherUserId}`
      );
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Mark messages as read on the server without updating the state.
  useEffect(() => {
    if (selectedConversation && isUserAtBottom()) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/markAllAsRead`, {
          conversationId: selectedConversation._id,
          userId,
        })
        .catch((err) => console.error("Error marking as read:", err));
    }
  }, [selectedConversation, userId, selectedConversation?.messages]);

  // Send a new message.
  const sendMessage = async () => {
    if (!message.trim() && !file) return;
    if (!selectedConversation) return;

    let fileURL = null;

    if (file) {
      const storageRef = ref(storage, `attachments/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => console.error("Error uploading file:", error),
        async () => {
          fileURL = await getDownloadURL(uploadTask.snapshot.ref);
          const { data: updatedConversation } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/messages/message`,
            {
              conversationId: selectedConversation._id,
              sender: userId,
              message,
              fileURL,
            }
          );
          setSelectedConversation(updatedConversation);
          setMessage("");
          setFile(null);
          setFilePreview(null);
        }
      );
    } else {
      const { data: updatedConversation } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/messages/message`,
        {
          conversationId: selectedConversation._id,
          sender: userId,
          message,
        }
      );
      setSelectedConversation(updatedConversation);
      setMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };
  useEffect(() => {
    if (!selectedConversation || !chatContainerRef.current) return;
  
    const chatContainer = chatContainerRef.current;

    const isAtBottom =
      chatContainer.scrollHeight - chatContainer.scrollTop <=
      chatContainer.clientHeight + 50;
  

    if (isAtBottom) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation?.messages, userId]);
  

  // Reporting a conversation.
  const submitReport = async () => {
    if (!reportReason.trim()) {
      alert("Please provide a reason for reporting.");
      return;
    }
    if (!selectedConversation) return;

    const otherUserId =
      selectedConversation.user1 === userId
        ? selectedConversation.user2
        : selectedConversation.user1;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/reports`, {
        conversationId: selectedConversation._id,
        reportedBy: userId,
        reportedFor: otherUserId,
        reason: reportReason,
      });

      Swal.fire({
        title: "Report Submitted",
        text: "Thank you for submitting your report.",
        icon: "success",
      });

      setIsReportModalOpen(false);
      setReportReason("");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  // Submitting a review.
  const submitReview = async () => {
    if (!selectedConversation) return;

    const otherUserId =
      selectedConversation.user1 === userId
        ? selectedConversation.user2
        : selectedConversation.user1;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reviews/${otherUserId}`,
        {
          reviewerId: userId,
          rating: review.rating,
          reviewapproved: "false",
        }
      );

      Swal.fire({
        title: "Review Submitted",
        text: "Your review has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setIsReviewModalOpen(false);
      setReview({ rating: 0, comment: "" });

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${otherUserId}/reviews`
      );
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };



  const renderLastMessageText = (lastMessage: Message) => {
    if (!lastMessage) return "No messages yet";
    const isSender = lastMessage.sender === userId;
    const isRead = !!lastMessage.isRead;
    return isSender ? (
      <span className="flex items-center">
        {isRead ? (
          <IoCheckmarkDone className="w-4 h-4 me-1 text-blue-500" />
        ) : (
          <IoCheckmarkOutline className="w-4 h-4 me-1 text-blue-500" />
        )}
        {lastMessage.message.slice(0, 30)}...
      </span>
    ) : (
      <span className={isRead ? "font-normal" : "font-bold text-black"}>
        {lastMessage.message.slice(0, 30)}...
      </span>
    );
  };

  function groupMessagesByDate(messages: Message[]) {
    const grouped: Record<string, Message[]> = {};
    for (const msg of messages) {
      const msgDate = new Date(msg.timestamp);
      const dateKey = getMessageDateLabel(msgDate);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    }
    return grouped;
  }

  function getMessageDateLabel(date: Date) {
    if (isToday(date)) {
      return `Today, ${format(date, "MMM d")}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "MMM d")}`;
    } else {
      return format(date, "MMM d, yyyy");
    }
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : null;

  return (
    <div className="flex min-h-screen pb-10 gap-5 bg-[#D0D5DD] text-gray-800">
      {/* LEFT COLUMN */}
      <div className="w-1/3 p-4 space-y-4 overflow-y-auto">
       {/*  SEARCH BAR */}
       <div className="mb-4 relative">
  <AiOutlineSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  <input
    type="text"
    placeholder="Search by name..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none"
  />
</div>
{/* Admins Box */}
<div className="bg-white p-4 mb-5 rounded-[20px] shadow-lg">
  <h2 className="text-[24px] font-bold mb-2 text-center">Admins</h2>
  {filteredAdminConversations.length > 0 ? (
    filteredAdminConversations
      .sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1]?.timestamp;
        const lastMessageB = b.messages[b.messages.length - 1]?.timestamp;
        return (
          new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime()
        );
      })
      .map((conversation) => {
        const otherUserId =
          conversation.user1 === userId ? conversation.user2 : conversation.user1;
        const otherUser = users[otherUserId];
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        return (
          <div
            key={conversation._id}
            onClick={() => selectConversation(conversation)}
            className={`p-3 mb-2 cursor-pointer rounded-lg border-b border-[#E3E8E7] transition-all hover:bg-gray-100 ${
              selectedConversation?._id === conversation._id
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={getDisplayPhoto(otherUser) || "/default-avatar.png"}
                  alt={getDisplayName(otherUser)}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="text-sm font-semibold">{getDisplayName(otherUser)}</h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    {renderLastMessageText(lastMessage)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {getTimeAgo(lastMessage?.timestamp)}
              </p>
            </div>
          </div>
        );
      })
  ) : (
    <div className="text-gray-500 text-center mt-4">
      No admin conversations
    </div>
  )}
</div>

{/* Users Box */}
<div className="bg-white p-4 rounded-[20px] shadow-lg">
  <h2 className="text-[24px] text-center font-bold mb-2">Users</h2>
  {filteredUserConversations.length > 0 ? (
    filteredUserConversations
      .sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1]?.timestamp;
        const lastMessageB = b.messages[b.messages.length - 1]?.timestamp;
        return (
          new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime()
        );
      })
      .map((conversation) => {
        const otherUserId =
          conversation.user1 === userId ? conversation.user2 : conversation.user1;
        const otherUser = users[otherUserId];
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        return (
          <div
            key={conversation._id}
            onClick={() => selectConversation(conversation)}
            className={`p-3 mb-2 border-b border-[#E3E8E7] cursor-pointer rounded-lg transition-all hover:bg-gray-100 ${
              selectedConversation?._id === conversation._id
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={getDisplayPhoto(otherUser) || "/default-avatar.png"}
                  alt={getDisplayName(otherUser)}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="text-sm font-semibold">{getDisplayName(otherUser)}</h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    {renderLastMessageText(lastMessage)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {getTimeAgo(lastMessage?.timestamp)}
              </p>
            </div>
          </div>
        );
      })
  ) : (
    <div className="text-gray-500 text-center mt-4">
      No user conversations
    </div>
  )}
</div>

      </div>

      {/* RIGHT SIDE: Selected Chat */}
      <div className="w-2/3 bg-[#D0D5DD] p-6 flex flex-col">
        {selectedConversation ? (
          <>
            {/* TOP BAR (Name, avg rating, rating, report) */}
            <div className="bg-white rounded-[15px]">
              <div className="py-3 px-8 rounded-[15px] w-full shadow-lg bg-[#0C34E4] text-white flex justify-between items-center sticky top-0">
                {/* Recipient Info with Avg Rating */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      getDisplayPhoto(
                        users[
                          selectedConversation.user1 === userId
                            ? selectedConversation.user2
                            : selectedConversation.user1
                        ]
                      ) || "/default-avatar.png"
                    }
                    alt="Receiver"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h1 className="text-lg font-semibold">
                    {getDisplayName(
                      users[
                        selectedConversation.user1 === userId
                          ? selectedConversation.user2
                          : selectedConversation.user1
                      ]
                    )}
                  </h1>
                  {averageRating !== null && (
                    <div className="flex items-center gap-1 ms-1">
                      <MdOutlineStarPurple500 color="#facc15" />
                      <p className="text-[14px] text-white">
                        {averageRating.toFixed(1)}
                      </p>
                    </div>
                  )}
                </div>
                {/* Rating + Report Section */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center justify-between py-2 px-3 gap-2 bg-white rounded-full shadow-md border">
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            getDisplayPhoto(
                              users[
                                selectedConversation.user1 === userId
                                  ? selectedConversation.user2
                                  : selectedConversation.user1
                              ]
                            ) || "/default-avatar.png"
                          }
                          alt="Receiver Image"
                          className="w-10 h-10 rounded-full object-cover overflow-hidden"
                        />
                      </div>
                      {reviews.some((r) => r.reviewerId === userId) ? (
                        reviews
                          .filter((review) => review.reviewerId === userId)
                          .map((review) => (
                            <div key={review._id} className="flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.986a1 1 0 00.95.69h4.227c.969 0 1.371 1.24.588 1.81l-3.423 2.487a1 1 0 00-.364 1.118l1.287 3.987c.3.921-.755 1.688-1.538 1.118l-3.424-2.487a1 1 0 00-1.176 0l-3.424 2.487c-.783.57-1.838-.197-1.538-1.118l1.287-3.987a1 1 0 00-.364-1.118L2.49 9.413c-.783-.57-.381-1.81.588-1.81h4.227a1 1 0 00.95-.69l1.286-3.986z" />
                                </svg>
                              ))}
                            </div>
                          ))
                      ) : (
                        <div className="flex items-center space-x-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                setReview({ ...review, rating: i + 1 })
                              }
                              className={`text-2xl ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } focus:outline-none`}
                            >
                              ★
                            </button>
                          ))}
                          <button
                            onClick={submitReview}
                            disabled={review.rating === 0}
                            className={`px-3 py-2 text-[10px] font-semibold rounded-lg transition ${
                              review.rating > 0
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      className="text-white bg-red-500 px-4 py-2 border border-red-500 rounded-lg"
                      onClick={() => setIsReportModalOpen(true)}
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
              {/* Messages Display - Grouped by date */}
              <div
                ref={chatContainerRef}
                className="bg-white h-[600px] w overflow-y-scroll mb-4 px-6 py-5 space-y-4"
              >
                {Object.entries(
                  groupMessagesByDate(selectedConversation.messages)
                ).map(([dateLabel, msgs]) => (
                  <div key={dateLabel}>
                    <div className="text-center my-2 text-sm text-gray-500 font-semibold">
                      {dateLabel}
                    </div>
                    {msgs.map((msg, index) => {
                      const isSender = msg.sender === userId;
                      const isRead = !!msg.isRead;
                      return (
                        <div
                          key={index}
                          className={`flex items-end ${
                            isSender ? "justify-end" : "justify-start"
                          } mb-2`}
                        >
                          <div className="flex flex-col">
                            <div
                              className={`max-w-xs p-4 ${
                                isSender
                                  ? "sender-msg-box text-white"
                                  : "recive-msg-box text-black"
                              }`}
                            >
                              <p>{msg.message}</p>
                              {msg.fileURL && (
                                <div className="flex items-center space-x-2 mt-1">
                                  <AiOutlinePaperClip
                                    className={
                                      isSender ? "text-white" : "text-gray-800"
                                    }
                                  />
                                  <a
                                    href={msg.fileURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                  >
                                    Attachment
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end mt-2 text-[#758A89]">
                              <div className={`flex items-center ${isSender ? "block" : "hidden"}`}>
                                {isRead ? (
                                  <IoCheckmarkDone className="w-4 h-4 me-1 text-blue-500" />
                                ) : (
                                  <IoCheckmarkOutline className="w-4 h-4 me-1 text-blue-500" />
                                )}
                              </div>
                              <small className="block text-xs">
                                {new Date(msg.timestamp).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            </div>

            {/* File Preview (if any) */}
            {filePreview && (
              <div className="mb-4">
                <p className="text-gray-600">File to be sent:</p>
                <div className="bg-gray-200 p-4 rounded-lg">
                  <a
                    href={filePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {file?.name}
                  </a>
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="flex w-full gap-3 mt-5 bg-white border-[#E3E8E7] border rounded-[20px] px-6 flex-col">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="w-full p-4 mt-3 focus:outline-none"
              />
              <div className="flex justify-between items-center px-4 py-2 border-t border-[#E3E8E7]">
                <label>
                  <AiOutlinePaperClip className="w-6 h-6 text-gray-500 cursor-pointer" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={sendMessage}
                  className={`px-4 py-2 rounded-lg ${
                    message.trim() || file
                      ? "text-[#0C34E4] cursor-pointer"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!message.trim() && !file}
                >
                  <IoSendSharp size={23} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h3 className="text-lg font-semibold">Report Conversation</h3>
            <textarea
              className="w-full border rounded p-2 mt-4"
              placeholder="Describe the issue..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={submitReport}
              >
                Submit Report
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsReportModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
