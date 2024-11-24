import React from 'react';
import ChatBubbleOutlineRounded from '@mui/icons-material/ChatBubbleOutlineRounded';

const GITHUB_URL = 'https://github.com/earnieacts';
const FEEDBACK_URL = 'https://discord.gg/z83vAeQG';
const VERSION = '1.0.0';

const Footer: React.FC = () => {
  const handleExternalLink = (url: string) => {
    try {
      if (window.electron?.window?.openExternal) {
        window.electron.window.openExternal(url);
      } else {
        // Fallback for non-electron environments (e.g., browser)
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Failed to open link:', url, error);
    }
  };

  const handleFeedbackClick = () => {
    handleExternalLink(FEEDBACK_URL);
  };

  return (
    <footer
      role="contentinfo"
      className="fixed px-12 py-6 bottom-0 left-0 right-0 bg-gray-100 dark:bg-black p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-800"
    >
      <button
        onClick={handleFeedbackClick}
        className="flex items-center gap-2 text-gray-900 dark:text-white text-sm bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
        aria-label="Provide feedback"
      >
        <span>Feedback</span>
        <ChatBubbleOutlineRounded className="text-base" />
      </button>
      <div className="flex items-center gap-2 text-gray-900 dark:text-white text-sm">
        <span className="text-gray-500 dark:text-gray-400">v{VERSION}</span>
        <span>Made by</span>
        <a
          href={GITHUB_URL}
          onClick={(e) => {
            e.preventDefault();
            handleExternalLink(GITHUB_URL);
          }}
          className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          earnieacts
        </a>
      </div>
    </footer>
  );
};

export default Footer;
