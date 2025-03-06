export default function Footer() {
    return (
      <footer className="bg-white shadow-md mt-10 p-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Pet Forum. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-900">Terms of Service</a>
        </div>
      </footer>
    );
  }