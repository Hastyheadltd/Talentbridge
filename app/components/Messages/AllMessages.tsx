"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/app/lib/UserContext";
import { AiOutlinePaperClip } from "react-icons/ai";
import { ArrowUpOnSquareIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Conversation, Message, Review, User } from "../type/Messages";
import Swal from "sweetalert2";

export default function AllMessages() {
  const { user } = useUser();
  const userId = user?._id;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string>("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [reviews, setReviews] = useState<Review[]>([]);
  const storage = getStorage();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/conversations/${userId}`);
        setConversations(data);

        // Fetch user details for each conversation
        const uniqueUserIds = new Set(data.map((c: Conversation) => c.user1 === userId ? c.user2 : c.user1));
        const usersData = await Promise.all(
          Array.from(uniqueUserIds).map((id) => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`))
        );
        const usersMap = Object.fromEntries(usersData.map((res) => [res.data.user._id, res.data.user]));
        setUsers(usersMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [userId]);

  const selectConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setFile(null);
    setFilePreview(null);

    // Fetch reviews for this user
    const otherUserId = conversation.user1 === userId ? conversation.user2 : conversation.user1;
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/reviews/${otherUserId}`);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      scrollToBottom();
    }
  }, [selectedConversation]);

  const sendMessage = async () => {
    if (!message.trim() && !file) return;

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

          const { data: updatedConversation } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/message`, {
            conversationId: selectedConversation?._id,
            sender: userId,
            message,
            fileURL,
          });

          setSelectedConversation(updatedConversation);
          setMessage("");
          setFile(null);
          setFilePreview(null);
          scrollToBottom();
        }
      );
    } else {
      const { data: updatedConversation } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/message`, {
        conversationId: selectedConversation?._id,
        sender: userId,
        message,
        
      });

      setSelectedConversation(updatedConversation);
      setMessage("");
      scrollToBottom();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const submitReport = async () => {
    if (!reportReason.trim()) {
      alert("Please provide a reason for reporting.");
      return;
    }

    const otherUserId = selectedConversation?.user1 === userId ? selectedConversation?.user2 : selectedConversation?.user1;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/reports`, {
        conversationId: selectedConversation?._id,
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

  const submitReview = async () => {
    const otherUserId = selectedConversation?.user1 === userId ? selectedConversation?.user2 : selectedConversation?.user1;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/reviews/${otherUserId}`, {
        reviewerId: userId,
        rating: review.rating,
        reviewapproved:"false"
      });

      Swal.fire({
        title: "Review Submitted",
        text: "Your review has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setIsReviewModalOpen(false);
      setReview({ rating: 0, comment: "" });

      // Refresh reviews
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${otherUserId}/reviews`);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error submitting review:", error);
   
    }
  };



  const getDisplayName = (user: User) => {
    return user?.role === "company" ? user?.companyName : user?.username;
  };

  const getDisplayPhoto = (user: User) => {
    return user?.role === "company" ? user?.logoURL : user?.photoURL;
  };
  const getTimeAgo = (timestamp: string | Date | undefined) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const isMessageSent = (lastMessage: Message) => lastMessage?.sender === userId;

  return (
    <div className="flex h-screen mb-10 bg-gray-100 text-gray-800">
      {/* Conversations List (Left) */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Chats</h2>
        {conversations.length > 0 ? (
          conversations
            .sort((a, b) => {
              const lastMessageA = a.messages[a.messages.length - 1]?.timestamp;
              const lastMessageB = b.messages[b.messages.length - 1]?.timestamp;
              return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
            })
            .map((conversation) => {
              const otherUserId = conversation.user1 === userId ? conversation.user2 : conversation.user1;
              const otherUser = users[otherUserId];
              const lastMessage = conversation.messages[conversation.messages.length - 1];

              return (
                <div
                  key={conversation._id}
                  onClick={() => selectConversation(conversation)}
                  className={`p-4 mb-2 cursor-pointer rounded-lg transition-all hover:bg-gray-100 ${
                    selectedConversation?._id === conversation._id ? "bg-gray-100" : "bg-white"
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
                        <h3 className="text-md font-semibold">{getDisplayName(otherUser)}</h3>
                        <p className="text-xs text-gray-500 flex items-center">
                          {isMessageSent(lastMessage) ? (
                            <ArrowUpOnSquareIcon className="w-4 h-4 me-1 text-blue-500" />
                          ) : (
                            <ArrowDownOnSquareIcon className="w-4 h-4 me-1 text-green-500" />
                          )}
                          {lastMessage?.message.slice(0, 30)}..
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
          <div className="text-gray-500 text-center mt-4">No conversations yet</div>
        )}
      </div>

      {/* Chat Box (Right) */}
      <div className="w-3/4 bg-gray-50 p-6 flex flex-col">
        {selectedConversation ? (
          <>
          <div className="py-3 px-8 rounded mb-5 w-full bg-white flex justify-between items-center sticky top-0">
  <>
  {selectedConversation && (
    <div className="flex items-center gap-3">
      <img
        src={getDisplayPhoto(users[selectedConversation.user1 === userId ? selectedConversation.user2 : selectedConversation.user1]) || "/default-avatar.png"}
        alt="Receiver"
        className="w-12 h-12 rounded-full object-cover"
      />
      <h1 className="text-lg font-semibold">
        {getDisplayName(users[selectedConversation.user1 === userId ? selectedConversation.user2 : selectedConversation.user1])}
      </h1>
    </div>
  )}
  </>
    <div className="flex items-center gap-5">
    <div className="flex items-center justify-between  gap-5">
        
    {/* Rating Section */}
{/* Rating Section */}
<div className="flex items-center justify-between py-2 px-3 gap-2 bg-white rounded-full shadow-md border">
  {/* Image and Name */}
  <div className="flex items-center space-x-4">
    <img
      src={getDisplayPhoto(users[selectedConversation.user1 === userId ? selectedConversation.user2 : selectedConversation.user1]) || "/default-avatar.png"}
      alt="Reciver Image "
      className="w-10 h-10 rounded-full object-cover overflow-hidden"
    />
  </div>

  {/* Display Review or Allow Rating */}
  {reviews.some((r) => r.reviewerId === userId) ? (
    // Display existing review from the logged-in user
    reviews
      .filter((review) => review.reviewerId === userId)
      .map((review) => (
        <div key={review._id} className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < review.rating ? "text-yellow-400" : "text-gray-300"
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
    // Allow the user to give a rating if they haven't reviewed yet
    <div className="flex items-center space-x-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={() => setReview({ ...review, rating: i + 1 })}
          className={`text-2xl ${
            i < review.rating ? "text-yellow-400" : "text-gray-300"
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







              {/* Report Button */}
              <button
                className="text-red-500 px-4 py-2 border border-red-500 rounded-lg"
                onClick={() => setIsReportModalOpen(true)}
              >
                Report
              </button>
            </div>

    </div>
          </div>
            <div className="flex-grow overflow-y-auto mb-4 space-y-4">
              {selectedConversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end ${msg.sender === userId ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs p-4 rounded-lg shadow-md ${msg.sender === userId ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-100"}`}>
                    <p>{msg.message}</p>
                    {msg.fileURL && (
                      <div className="flex items-center space-x-2">
                        <AiOutlinePaperClip className="text-white w-5 h-5" />
                        <a href={msg.fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-200">
                          {file?.name || "View Attachment"}
                        </a>
                      </div>
                    )}
                    <small className="block text-xs text-gray-100 mt-2">
                      {new Date(msg.timestamp).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, day: '2-digit', month: 'short', year: 'numeric' })}
                    </small>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            {/* Review Section */}
  

        
            {filePreview && (
              <div className="mb-4">
                <p className="text-gray-600">File to be sent:</p>
                <div className="bg-gray-200 p-4 rounded-lg">
                  <a href={filePreview} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {file?.name}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-lg"
              />
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
                    ? "bg-blue-500 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!message.trim() && !file}
              >
                Send
              </button>
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex  justify-center items-center">
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

