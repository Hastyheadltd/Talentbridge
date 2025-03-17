import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoCheckmarkDone, IoCheckmarkOutline, IoSendSharp } from "react-icons/io5";
import { format, isToday, isYesterday } from "date-fns";
import { Conversation } from "../type/Messages";

interface ChatPopupProps {
  userId: string;
  applicantId: string;
  closePopup: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ userId, applicantId, closePopup }) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const storage = getStorage();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);


  const getMessageDateLabel = (date: Date) => {
    if (isToday(date)) {
      return `Today, ${format(date, "MMM d")}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "MMM d")}`;
    } else {
      return format(date, "MMM d, yyyy");
    }
  };

  const groupMessagesByDate = (messages: any[]) => {
    const grouped: Record<string, any[]> = {};
    messages.forEach((msg) => {
      const date = new Date(msg.timestamp);
      const dateKey = getMessageDateLabel(date);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });
    return grouped;
  };


  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/conversation`, {
          user1: userId,
          user2: applicantId
        });
        setConversation(data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [userId, applicantId]);


  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

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
          await sendChatMessage(fileURL);
          setFile(null);
        }
      );
    } else {
      await sendChatMessage();
    }
  };

  const sendChatMessage = async (fileURL?: string) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/messages/message`, {
        conversationId: conversation?._id,
        sender: userId,
        message,
        fileURL,
      });
      setConversation(data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-end p-4 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full md:w-[400px] h-[510px] rounded-lg shadow-lg relative flex flex-col">
        <div className="flex justify-between items-center p-4 bg-purple-600 text-white rounded-t-lg">
          <h2 className="text-xl">Chat Window</h2>
          <button className="text-white" onClick={closePopup}>&times;</button>
        </div>

        <div ref={chatContainerRef} className="p-4 flex-grow overflow-y-scroll">
          {loading ? (
            <p>Loading chat...</p>
          ) : (
            // Group messages by date
            Object.entries(groupMessagesByDate(conversation?.messages || [])).map(([dateLabel, msgs]) => (
              <div key={dateLabel}>
                <div className="text-center my-2 text-sm text-gray-500 font-semibold">{dateLabel}</div>
                {msgs.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === userId ? "text-right" : "text-left"}`}
                    ref={index === (conversation?.messages.length || 0) - 1 ? messageEndRef : null}
                  >
                    <div className="inline-block p-2 bg-blue-100 rounded-lg">
                      {msg.message && <p>{msg.message}</p>}
                      {msg.fileURL && (
                        <div className="mt-2">
                          <a
                            href={msg.fileURL}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 flex items-center gap-1 text-[12px]"
                          >
                            <AiOutlinePaperClip />
                            Attachment
                          </a>
                        </div>
                      )}
                      <div className="flex justify-end mt-1 items-center gap-1">
                        {msg.sender === userId && (
                          <div className="flex items-center">
                            {msg.isRead ? (
                              <IoCheckmarkDone className="w-4 h-4 text-blue-500" />
                            ) : (
                              <IoCheckmarkOutline className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                        )}
                        <small className="text-gray-500 text-xs">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {file && (
          <div className="px-4 py-1 bg-gray-200">
            <p className="text-sm text-gray-600">File to be sent: {file.name}</p>
          </div>
        )}

        <div className="p-2 flex items-center space-x-2 border-t">
          <label>
            <AiOutlinePaperClip className="w-6 h-6 text-gray-500 cursor-pointer" />
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-grow px-4 py-2 border rounded-lg"
          />

          <button
            onClick={sendMessage}
            disabled={!message.trim() && !file}
            className={`px-4 py-2 rounded-lg ${
              message.trim() || file ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
