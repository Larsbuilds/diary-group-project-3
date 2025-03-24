import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-bg-dark/90 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <a
            href="https://github.com/Larsbuilds/diary-group-project-3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-light hover:text-highlight transition-colors duration-200"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
} 