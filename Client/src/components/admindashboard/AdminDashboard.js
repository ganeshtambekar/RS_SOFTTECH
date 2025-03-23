import React from 'react';
import CourseSection from './CourseSection';
import StudentSection from './StudentSection';
import StaffSection from './StaffSection';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  Settings, 
  Plus,
  Edit,
  Trash,
  Search
} from 'lucide-react';
import Login from '../Login';

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 bg-black text-white",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground border-gray-200",
    icon: "h-10 w-10 p-0"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Input Component
const Input = ({ className = "", icon, ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
      <input
        className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

// Card Components
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

// Main Dashboard Component
const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };
  const [activeSection, setActiveSection] = React.useState('courses');
  
  const renderContent = () => {
    switch(activeSection) {
      case 'courses':
        return <CourseSection />;
      case 'students':
        return <StudentSection />;
      case 'staff':
        return <StaffSection />;
  
      default:
        return <CourseSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
  
        {/* Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            variant={activeSection === 'courses' ? 'default' : 'outline'}
            className="flex items-center justify-center gap-2 h-16"
            onClick={() => setActiveSection('courses')}
          >
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </Button>
  
          <Button 
            variant={activeSection === 'students' ? 'default' : 'outline'}
            className="flex items-center justify-center gap-2 h-16"
            onClick={() => setActiveSection('students')}
          >
            <Users className="h-5 w-5" />
            <span>Students</span>
          </Button>
  
          <Button 
            variant={activeSection === 'staff' ? 'default' : 'outline'}
            className="flex items-center justify-center gap-2 h-16"
            onClick={() => setActiveSection('staff')}
          >
            <UserCheck className="h-5 w-5" />
            <span>Staff</span>
          </Button>
        </div>
  
        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
  
};




export default AdminDashboard;

