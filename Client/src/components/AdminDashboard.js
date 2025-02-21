import React from 'react';
import CourseSection from './CourseSection';
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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
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

// const CourseSection = () => {
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Courses</h2>
//         <Button className="flex items-center gap-2">
//           <Plus className="h-4 w-4" /> Add Course
//         </Button>
//       </div>

//       <div className="mb-6">
//         <Input 
//           placeholder="Search courses..." 
//           className="max-w-md"
//           icon={<Search className="h-4 w-4" />}
//         />
//       </div>

//       <div className="grid gap-4">
//         {['Web Development', 'Data Science', 'UX Design'].map((course) => (
//           <Card key={course}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-lg font-medium">{course}</CardTitle>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon">
//                   <Edit className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <Trash className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>Enrolled: 24 students</span>
//                 <span>Active Staff: 2</span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

const StudentSection = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Students</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Student
        </Button>
      </div>

      <div className="mb-6">
        <Input 
          placeholder="Search students..." 
          className="max-w-md"
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4">
        {['John Doe', 'Jane Smith', 'Mike Johnson'].map((student) => (
          <Card key={student}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{student}</CardTitle>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Enrolled Courses: 2</span>
                <span>Status: Active</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const StaffSection = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Staff</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Staff
        </Button>
      </div>

      <div className="mb-6">
        <Input 
          placeholder="Search staff..." 
          className="max-w-md"
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4">
        {['Dr. Sarah Wilson', 'Prof. Robert Brown', 'Dr. Emily Davis'].map((staff) => (
          <Card key={staff}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{staff}</CardTitle>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Courses: 2</span>
                <span>Department: Computer Science</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;




// import React, { useState } from 'react';
// import { 
//   Users, 
//   BookOpen, 
//   UserCheck, 
//   Settings, 
//   Plus,
//   Edit,
//   Trash,
//   Search,
//   LogOut 
// } from 'lucide-react';

// export default function DashboardPreview() {
//   const [activeSection, setActiveSection] = useState('courses');
  
//   const mockCourses = [
//     { id: 1, name: 'Web Development', enrolledStudents: 24, staff: 2, description: 'Learn modern web development' },
//     { id: 2, name: 'Data Science', enrolledStudents: 18, staff: 3, description: 'Master data analysis' },
//     { id: 3, name: 'UX Design', enrolledStudents: 15, staff: 1, description: 'Design user experiences' }
//   ];

//   const [courses, setCourses] = useState(mockCourses);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);

//   const filteredCourses = courses.filter(course => 
//     course.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <div className="flex items-center gap-4">
//             <span className="text-gray-600">Welcome, Admin User</span>
//             <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-md border hover:bg-gray-50">
//               <LogOut className="h-4 w-4" />
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           {[
//             { icon: BookOpen, label: 'Courses', value: 'courses' },
//             { icon: Users, label: 'Students', value: 'students' },
//             { icon: UserCheck, label: 'Staff', value: 'staff' }
//           ].map(({ icon: Icon, label, value }) => (
//             <button
//               key={value}
//               onClick={() => setActiveSection(value)}
//               className={`flex items-center justify-center gap-2 h-16 rounded-lg border ${
//                 activeSection === value 
//                   ? 'bg-black text-white' 
//                   : 'bg-white text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <Icon className="h-5 w-5" />
//               <span>{label}</span>
//             </button>
//           ))}
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold">Courses</h2>
//             <button 
//               onClick={() => setShowAddForm(!showAddForm)}
//               className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
//             >
//               <Plus className="h-4 w-4" />
//               Add Course
//             </button>
//           </div>

//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search courses..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-md"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {showAddForm && (
//             <div className="mb-6 p-4 border rounded-lg">
//               <h3 className="text-lg font-medium mb-4">Add New Course</h3>
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Course Name"
//                   className="w-full px-4 py-2 border rounded-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Course Description"
//                   className="w-full px-4 py-2 border rounded-md"
//                 />
//                 <div className="flex gap-2">
//                   <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
//                     Save Course
//                   </button>
//                   <button 
//                     onClick={() => setShowAddForm(false)}
//                     className="px-4 py-2 border rounded-md hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid gap-4">
//             {filteredCourses.map((course) => (
//               <div key={course.id} className="border rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-lg font-medium">{course.name}</h3>
//                   <div className="flex gap-2">
//                     <button className="p-2 hover:bg-gray-100 rounded">
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded">
//                       <Trash className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mb-2">{course.description}</p>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Enrolled: {course.enrolledStudents} students</span>
//                   <span>Active Staff: {course.staff}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }