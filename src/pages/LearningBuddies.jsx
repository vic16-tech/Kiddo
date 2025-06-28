import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import BackToTop from '../components/BackToTop'; // Ensure this path is correct
import { FaPaperPlane, FaMagic, FaUserCircle, FaLightbulb, FaCamera, FaImage, FaMicrophone, FaStopCircle, FaVideo } from 'react-icons/fa'; // Added FaStopCircle, FaVideo

// IMAGE CONFIGURATION for logos in the header (consistent with other pages)
const IMAGE_CONFIG = {
  companyLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO",
  mobileLogo: "https://placehold.co/100x32/1E293B/E2E8F0?text=KIDDO",
};

// Navigation links for the header (consistent with other pages)
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Our Track Record', href: '/our-track-record' },
  { name: 'Team', href: '/team' },
];

// Define demo users - USER_A is now the primary local user for sending messages
const DEMO_USERS = {
  USER_A: { id: 'userA', name: 'You' }, // Renamed for clarity: this is the local user
  USER_B: { id: 'userB', name: 'Bob (Buddy)' }, // The simulated buddy
  AI_HELPER: { id: 'aiHelper', name: 'Smart Helper' },
};

export default function LearningBuddiesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [newMessage, setNewMessage] = useState(''); // Consolidated input for the local user
  const [sharedText, setSharedText] = useState(''); // For the collaborative activity
  const [buddyStatus, setBuddyStatus] = useState('offline'); // Mock buddy status
  const [isLoadingLLM, setIsLoadingLLM] = useState(false); // State for LLM loading
  const [imageToSend, setImageToSend] = useState(''); // Consolidated image URL for the local user

  // --- Voice Note States ---
  const [isRecording, setIsRecording] = useState(false); // State for voice note recording
  const [mediaRecorder, setMediaRecorder] = useState(null); // MediaRecorder instance
  const [audioChunks, setAudioChunks] = useState([]); // Array to store audio data chunks
  const [audioBlobUrl, setAudioBlobUrl] = useState(null); // URL of the recorded audio blob

  // --- Camera States ---
  const [isCameraActive, setIsCameraActive] = useState(false); // State for camera activity (snapshot)

  // --- Modals States ---
  const [showImageURLModal, setShowImageURLModal] = useState(false); // State for image URL input modal
  const [imageURLInput, setImageURLInput] = useState(''); // Input for image URL modal

  const chatContainerRef = useRef(null); // Ref for auto-scrolling chat
  const recordingTimeoutRef = useRef(null); // Ref for recording auto-stop timer

  // Framer Motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate real-time updates for buddy status
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setBuddyStatus(prev => {
        const newStatus = prev === 'online' ? 'offline' : 'online';
        if (prev === 'offline' && newStatus === 'online') {
          setTimeout(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { id: `m${Date.now() + 100}`, senderId: DEMO_USERS.USER_B.id, senderName: DEMO_USERS.USER_B.name, text: 'Hey, I just got online! What are you working on?', timestamp: Date.now() + 100 },
            ]);
          }, 1000);
        }
        return newStatus;
      });
    }, 15000);

    return () => clearInterval(statusInterval);
  }, []);

  // Simulate initial messages and shared text
  useEffect(() => {
    setMessages([
      { id: 'm1', senderId: DEMO_USERS.USER_B.id, senderName: DEMO_USERS.USER_B.name, text: 'Hi there! Ready to learn something new?', timestamp: Date.now() - 30000 },
      { id: 'm2', senderId: DEMO_USERS.USER_A.id, senderName: DEMO_USERS.USER_A.name, text: 'Hey Bob! Always ready. What should we explore today?', timestamp: Date.now() - 20000 },
      { id: 'm3', senderId: DEMO_USERS.AI_HELPER.id, senderName: DEMO_USERS.AI_HELPER.name, text: 'Remember, imagination is your superpower! What exciting twists can we add?', timestamp: Date.now() - 10000, isAI: true },
    ]);
    setSharedText('Story Title: The Magical Forest Adventure\n\nCharacters: Lily, a brave explorer, and Sparky, her firefly friend.\n\nPlot Idea: Lily and Sparky discover a hidden map leading to a sparkling treasure deep within the Whispering Woods.');
  }, []);

  // --- AI Moderation Function ---
  const moderateMessage = async (text) => {
    if (!text.trim()) return "CLEAN";

    const prompt = `Review the following text for any inappropriate, hateful, harmful, or non-child-friendly content.
    Respond ONLY with "CLEAN" if it is appropriate for a children's learning platform, or "FLAGGED: [Reason]" if it is inappropriate.
    Examples of inappropriate content: swear words, insults, violent descriptions, mean comments, sharing personal info, off-topic spam.
    Text to moderate: "${text}"`;

    try {
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const apiKey = ""; // Canvas provides this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text.trim().toUpperCase();
      } else {
        console.warn("LLM moderation response was empty or malformed.");
        return "ERROR_EMPTY_RESPONSE";
      }
    } catch (error) {
      console.error("Error calling LLM for moderation:", error);
      return "ERROR_API_CALL_FAILED";
    }
  };

  // Function to display custom modal
  const showCustomModal = (title, message, callback = null) => {
    const modalId = `custom-modal-${Date.now()}`;
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]';
    modal.innerHTML = `
      <div class="bg-gray-800 p-8 rounded-xl shadow-2xl border border-yellow-600 text-white text-center w-11/12 md:w-1/3">
        <h3 class="text-2xl font-bold text-yellow-400 mb-4">${title}</h3>
        <p class="mb-6">${message}</p>
        <button id="closeModal-${modalId}" class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-md font-semibold">Okay</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById(`closeModal-${modalId}`).onclick = () => {
      document.body.removeChild(modal);
      if (callback) callback();
    };
  };

  const showImageInputModal = () => {
    setImageURLInput(''); // Clear previous input
    setShowImageURLModal(true);
  };

  const handleImageURLSubmit = () => {
    if (imageURLInput.trim()) {
      setImageToSend(imageURLInput.trim());
      showCustomModal("Image Added!", "The image URL has been prepared. Click 'Send Message' to share it!");
    } else {
      showCustomModal("Input Missing", "Please enter an image URL.");
    }
    setShowImageURLModal(false);
  };

  // Function to send a new message (text, image, or voice note) from the local user
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = newMessage;
    const imageContent = imageToSend;
    const voiceNoteUrl = audioBlobUrl;

    if (messageText.trim() === '' && imageContent === '' && !voiceNoteUrl) {
      showCustomModal("Empty Message", "Please type a message, attach an image, or record a voice note to send.");
      return;
    }

    // Perform AI Moderation if there's text content
    if (messageText.trim()) {
      const moderationStatus = await moderateMessage(messageText.trim());
      if (moderationStatus.startsWith("FLAGGED")) {
        showCustomModal("Message Blocked!", `${moderationStatus}. Please revise your message to keep Kiddo Skills a safe and positive space.`);
        setNewMessage('');
        setImageToSend('');
        setAudioBlobUrl(null); // Clear voice note if text is flagged
        return; // Stop message from being sent
      }
    }

    const message = {
      id: `m${Date.now()}`,
      senderId: DEMO_USERS.USER_A.id,
      senderName: DEMO_USERS.USER_A.name,
      text: messageText.trim(),
      imageUrl: imageContent,
      audioUrl: voiceNoteUrl, // Add audioUrl to message
      timestamp: Date.now(),
      isAI: false,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
    setImageToSend(''); // Clear image input after sending
    setAudioBlobUrl(null); // Clear voice note after sending

    // Simulate Bob (Buddy) replying after a short delay
    if (DEMO_USERS.USER_B.id === 'userB') {
      setTimeout(async () => {
        let bobResponseText = "Got it! That sounds interesting.";
        if (messageText.includes("story")) {
          bobResponseText = "A story about what? Tell me more!";
        } else if (imageContent) {
          bobResponseText = "Cool picture! What are we looking at?";
        } else if (voiceNoteUrl) {
            bobResponseText = "Nice voice note! What did you say?";
        }

        // Apply moderation to Bob's simulated response too
        const moderationStatusBob = await moderateMessage(bobResponseText);
        if (moderationStatusBob.startsWith("FLAGGED")) {
           bobResponseText = "I can't say that. Let's keep our chat friendly!"; // Bob self-censored
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `m${Date.now() + 500}`, senderId: DEMO_USERS.USER_B.id, senderName: DEMO_USERS.USER_B.name, text: bobResponseText, timestamp: Date.now() + 500, isAI: false },
        ]);
      }, 1500);
    }
  };

  // Function to update shared text
  const handleSharedTextChange = (e) => {
    setSharedText(e.target.value);
    // In a real app, this would update a Firestore document
  };

  // Function to simulate taking a snapshot (webcam access not guaranteed in iframe)
  const handleSimulateSnapshot = () => {
    if (isCameraActive) {
      // Stop camera / Take snapshot
      setIsCameraActive(false);
      const snapshotImage = `https://placehold.co/400x300/F0F8FF/333333?text=Snapshot_Taken_${Date.now()}`;
      setImageToSend(snapshotImage);
      showCustomModal("Snapshot Taken!", "A simulated snapshot has been prepared. Click 'Send Message' to share it!");
    } else {
      // Start camera
      // In a real app, this would initiate navigator.mediaDevices.getUserMedia({ video: true })
      setIsCameraActive(true);
      showCustomModal("Camera Active!", "Simulating camera. Click the camera icon again to take a snapshot.");
      // Simulate camera automatically turning off if not used for a few seconds
      setTimeout(() => {
        if (isCameraActive) { // Only if still active
          setIsCameraActive(false);
          showCustomModal("Camera Auto-Off", "Camera auto-turned off due to inactivity.");
        }
      }, 5000); // Auto-off after 5 seconds
    }
  };

  // --- Voice Note Functionality (Live) ---
  const handleVoiceNote = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorder.stop();
      clearTimeout(recordingTimeoutRef.current);
      setIsRecording(false);
      setMediaRecorder(null);
      showCustomModal("Recording Stopped", "Voice note recorded. Click 'Send Message' to share it!");
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        setMediaRecorder(recorder);
        setAudioChunks([]); // Clear previous chunks

        recorder.ondataavailable = (event) => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioBlobUrl(url);
          // Stop all tracks in the stream
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setIsRecording(true);
        showCustomModal("Recording Started!", "Microphone is active. Click the microphone icon again to stop recording.");

        // Simulate auto-stop after 15 seconds if recording isn't stopped manually
        recordingTimeoutRef.current = setTimeout(() => {
          if (recorder.state === "recording") {
            recorder.stop();
            setIsRecording(false);
            setMediaRecorder(null);
            showCustomModal("Recording Auto-Stopped", "Voice note automatically stopped due to time limit and prepared for sending.");
          }
        }, 15000); // Auto-stop after 15 seconds
      } catch (error) {
        console.error("Error accessing microphone:", error);
        showCustomModal("Microphone Error", `Could not access microphone: ${error.name}. Please ensure permissions are granted.`);
        setIsRecording(false);
        setMediaRecorder(null);
      }
    }
  };

  // Function to call LLM for Smart Helper
  const getSmartHelperResponse = async () => {
    setIsLoadingLLM(true);
    const chatHistory = messages.map(msg => ({
        role: msg.senderId === DEMO_USERS.USER_A.id || msg.senderId === DEMO_USERS.USER_B.id ? "user" : "model",
        parts: [{ text: msg.text }]
    }));

    const prompt = `You are a helpful and encouraging learning assistant for children aged 5-10. Based on the current conversation and shared activity, provide a fun, positive, and concise suggestion, hint, or creative idea to help them move forward with their learning task. Encourage curiosity and collaboration. If they are working on a story, suggest a next plot point or character detail. If it's a puzzle, suggest a way to look at it differently.
    
    Current Shared Activity: "${sharedText}"
    
    Please provide a short, encouraging suggestion (max 2 sentences).`;

    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    try {
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `m${Date.now()}`, senderId: DEMO_USERS.AI_HELPER.id, senderName: DEMO_USERS.AI_HELPER.name, text: text, timestamp: Date.now(), isAI: true },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: `m${Date.now()}`, senderId: DEMO_USERS.AI_HELPER.id, senderName: DEMO_USERS.AI_HELPER.name, text: 'Oops! I couldn\'t generate a suggestion right now. Please try again.', timestamp: Date.now(), isAI: true },
        ]);
      }
    } catch (error) {
      console.error("Error calling LLM:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `m${Date.now()}`, senderId: DEMO_USERS.AI_HELPER.id, senderName: DEMO_USERS.AI_HELPER.name, text: 'I\'m having trouble connecting. Check your internet or try again later!', timestamp: Date.now(), isAI: true },
      ]);
    } finally {
      setIsLoadingLLM(false);
    }
  };


  return (
    <div className="bg-gray-900 min-h-screen font-rob overflow-x-hidden">
      {/* Fixed Header */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Kiddo Skills</span>
              <img
                alt="Kiddo Skills Logo"
                src={IMAGE_CONFIG.companyLogo}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open Kiddo menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200">
              Kiddo Login <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-gray-900/70" onClick={() => setMobileMenuOpen(false)} />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Kiddo Skills</span>
                <img
                  alt="Kiddo Skills Logo"
                  src={IMAGE_CONFIG.mobileLogo}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close Kiddo menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Kiddo Login
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </motion.header>

      {/* Main Content Area */}
      <section className="relative pt-32 pb-16 sm:pb-24 lg:pb-32 font-rob text-gray-200 min-h-screen">
        <motion.div
          className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Panel: Buddy List & Smart Helper Info */}
          <motion.div
            className="lg:col-span-1 p-6 bg-gray-800/60 rounded-xl shadow-lg border border-blue-600/50 backdrop-blur-sm h-full"
            variants={textVariants}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 border-b border-gray-700 pb-3">Learning Buddies</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-x-4 p-3 bg-gray-700/50 rounded-lg">
                <FaUserCircle className="size-8 text-yellow-400" />
                <div>
                  <p className="font-semibold text-white">{DEMO_USERS.USER_A.name}</p>
                  <span className="text-sm text-lime-400">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-x-4 p-3 bg-gray-700/50 rounded-lg">
                <FaUserCircle className="size-8 text-yellow-400" />
                <div>
                  <p className="font-semibold text-white">{DEMO_USERS.USER_B.name}</p>
                  <span className={`text-sm ${buddyStatus === 'online' ? 'text-lime-400' : 'text-red-400'}`}>
                    {buddyStatus === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-4 p-3 bg-gray-700/50 rounded-lg">
                <FaLightbulb className="size-8 text-blue-400" />
                <div>
                  <p className="font-semibold text-white">{DEMO_USERS.AI_HELPER.name}</p>
                  <span className="text-sm text-gray-400">AI Assistant</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-6">
              Connect and learn together! The Smart Helper provides hints and ideas. Messages are moderated for safety.
            </p>
          </motion.div>

          {/* Center Panel: Chat and Collaborative Activity */}
          <motion.div
            className="lg:col-span-2 flex flex-col p-6 bg-gray-800/60 rounded-xl shadow-lg border border-purple-600/50 backdrop-blur-sm"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-pink-400 mb-6 border-b border-gray-700 pb-3">Buddy Chat & Activity</h2>

            {/* Chat Window */}
            <div ref={chatContainerRef} className="flex-grow bg-gray-700/50 rounded-lg p-4 mb-4 overflow-y-auto max-h-[400px] min-h-[200px] custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-3 flex ${msg.senderId === DEMO_USERS.USER_A.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${msg.senderId === DEMO_USERS.USER_A.id ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
                    <strong className="block text-sm font-semibold mb-1">{msg.isAI ? `🤖 ${msg.senderName}` : msg.senderName}</strong>
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="Shared content"
                        className="max-w-full h-auto rounded-md mb-2 object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x150/FF0000/FFFFFF?text=Image+Load+Error"; }}
                      />
                    )}
                    {msg.text && <p>{msg.text}</p>}
                    {msg.audioUrl && ( // Render audio element for voice notes
                      <div className="flex items-center text-sm mt-2">
                        <FaMicrophone className="mr-2 text-blue-300" />
                        <audio controls src={msg.audioUrl} className="w-full"></audio>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {isLoadingLLM && (
                <div className="text-center text-gray-400 py-2">
                  <span className="inline-block animate-bounce mr-2">...</span> Smart Helper is thinking...
                </div>
              )}
            </div>

            {/* Chat Input for the current user */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-white mb-2">Your Message ({DEMO_USERS.USER_A.name})</h3>
              {imageToSend && (
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <span className="mr-2">Image attached:</span>
                  <img src={imageToSend} alt="Preview" className="h-10 w-10 object-cover rounded mr-2" />
                  <button onClick={() => setImageToSend('')} className="text-red-400 hover:text-red-300">Remove</button>
                </div>
              )}
              {audioBlobUrl && ( // Show voice note ready indicator
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                      <span className="mr-2">Voice Note Ready:</span>
                      <audio controls src={audioBlobUrl} className="h-10 w-auto mr-2"></audio>
                      <button onClick={() => setAudioBlobUrl(null)} className="text-red-400 hover:text-red-300">Remove</button>
                  </div>
              )}
              {/* MODIFIED: Form layout to flex-col on mobile, flex-row on md screens and up */}
              <form onSubmit={handleSendMessage} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isRecording || isCameraActive || audioBlobUrl} // Disable input if recording, camera active, or voice note ready
                />
                {/* MODIFIED: Button group to be centered when stacked vertically */}
                <div className="flex gap-x-2 flex-wrap justify-center md:justify-end mt-3 md:mt-0"> {/* Added mt-3 for spacing when stacked */}
                  <motion.button
                    type="button"
                    onClick={handleSimulateSnapshot}
                    className={`flex-shrink-0 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 size-12 flex items-center justify-center
                      ${isCameraActive ? 'bg-red-600 hover:bg-red-500 focus:ring-red-500' : 'bg-purple-600 hover:bg-purple-500 focus:ring-purple-500'}
                      ${isRecording || audioBlobUrl ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    whileHover={{ scale: (isRecording || audioBlobUrl) ? 1 : 1.05 }}
                    whileTap={{ scale: (isRecording || audioBlobUrl) ? 1 : 0.95 }}
                    disabled={isRecording || audioBlobUrl} // Disable camera button if recording or voice note ready
                    aria-label={isCameraActive ? "Take Snapshot" : "Activate Camera"}
                  >
                    {isCameraActive ? <FaVideo className="size-5 animate-pulse" /> : <FaCamera className="size-5" />}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={showImageInputModal}
                    className={`flex-shrink-0 bg-green-600 text-white p-3 rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 size-12 flex items-center justify-center
                      ${isRecording || isCameraActive || audioBlobUrl ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    whileHover={{ scale: (isRecording || isCameraActive || audioBlobUrl) ? 1 : 1.05 }}
                    whileTap={{ scale: (isRecording || isCameraActive || audioBlobUrl) ? 1 : 0.95 }}
                    disabled={isRecording || isCameraActive || audioBlobUrl} // Disable image button if recording, camera active, or voice note ready
                    aria-label="Add Image by URL"
                  >
                    <FaImage className="size-5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleVoiceNote}
                    className={`flex-shrink-0 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 size-12 flex items-center justify-center
                      ${isRecording ? 'bg-red-600 hover:bg-red-500 focus:ring-red-500' : 'bg-orange-600 hover:bg-orange-500 focus:ring-orange-500'}
                      ${isCameraActive ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    whileHover={{ scale: isCameraActive ? 1 : 1.05 }}
                    whileTap={{ scale: isCameraActive ? 1 : 0.95 }}
                    disabled={isCameraActive} // Disable voice note button if camera active
                    aria-label={isRecording ? "Stop Recording Voice Note" : "Record Voice Note"}
                  >
                    {isRecording ? <FaStopCircle className="size-5 animate-pulse" /> : <FaMicrophone className="size-5" />}
                  </motion.button>
                  <motion.button
                    type="submit"
                    className={`flex-shrink-0 bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 size-12 flex items-center justify-center
                      ${isRecording || isCameraActive || imageToSend || audioBlobUrl ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    whileHover={{ scale: (isRecording || isCameraActive || imageToSend || audioBlobUrl) ? 1 : 1.05 }}
                    whileTap={{ scale: (isRecording || isCameraActive || imageToSend || audioBlobUrl) ? 1 : 0.95 }}
                    disabled={isRecording || isCameraActive || imageToSend || audioBlobUrl} // Disable send if any media is pending
                    aria-label="Send Message"
                  >
                    <FaPaperPlane className="size-5" />
                  </motion.button>
                </div>
              </form>
            </div>


            {/* Smart Helper Button */}
            <motion.button
              type="button"
              onClick={getSmartHelperResponse}
              disabled={isLoadingLLM}
              className={`w-full mt-6 bg-yellow-500 text-gray-900 p-3 rounded-md shadow-sm ${isLoadingLLM ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center justify-center gap-x-2`}
              whileHover={{ scale: isLoadingLLM ? 1 : 1.02 }}
              whileTap={{ scale: isLoadingLLM ? 1 : 0.98 }}
              aria-label="Get Smart Helper Hint"
            >
              {isLoadingLLM ? (
                <>
                  <span className="animate-spin inline-block">⏳</span> Smart Helper Thinking...
                </>
              ) : (
                <>
                  <FaLightbulb className="size-5" /> Get Smart Helper Idea!
                </>
              )}
            </motion.button>


            {/* Collaborative Activity - Shared Text Editor */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-lime-400 mb-3 flex items-center gap-x-2">
                <FaMagic className="size-5" /> Shared Learning Canvas
              </h3>
              <textarea
                value={sharedText}
                onChange={handleSharedTextChange}
                placeholder="Start collaborating on your project here..."
                rows="8"
                className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
              ></textarea>
              <p className="text-sm text-gray-400 mt-2">
                *In a real application, this content would be updated in real-time for all connected buddies.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Back to Top Button */}
      <BackToTop/>

      {/* Image URL Input Modal */}
      <AnimatePresence>
        {showImageURLModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-yellow-600 text-white text-center w-11/12 md:w-1/3"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Enter Image URL</h3>
              <input
                type="url"
                value={imageURLInput}
                onChange={(e) => setImageURLInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              />
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleImageURLSubmit}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-md font-semibold"
                >
                  Add Image
                </button>
                <button
                  onClick={() => setShowImageURLModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-md font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
