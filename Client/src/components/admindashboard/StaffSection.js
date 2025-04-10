import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/Button';
import { Input } from "../ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Plus, Search, Settings, Trash } from 'lucide-react';
import config from '../../config/config';

const StaffSection = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science',
    position: 'Lecturer'
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.API_URL}/admin/staff`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaff(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch staff data');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.API_URL}/admin/staff`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setStaff(prev => [...prev, response.data.data]);
      setShowAddForm(false);
      setFormData({
        name: '',
        email: '',
        department: 'Computer Science',
        position: 'Lecturer'
      });
    } catch (err) {
      if (err.response?.data?.error?.includes('already exists')) {
        setError('Staff with this email already exists');
      } else {
        setError(err.response?.data?.error || 'Failed to add staff member');
      }
    }
  };

  const handleDeleteStaff = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${config.API_URL}/admin/staff/${staffId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStaff(prev => prev.filter(member => member._id !== staffId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete staff member');
      }
    }
  };

  const filteredStaff = staff.filter(staffMember => {
    const search = searchQuery.toLowerCase();
    return (
      staffMember?.name?.toLowerCase()?.includes(search) ||
      staffMember?.department?.toLowerCase()?.includes(search)
    );
  });

  if (loading) {
    return <div className="p-6">Loading staff...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Staff Management</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4" /> Add Staff
        </Button>
      </div>

      <div className="mb-6">
        <Input 
          placeholder="Search staff..." 
          className="max-w-md"
          icon={<Search className="h-4 w-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error && <div className="mb-4 p-3 text-red-600 bg-red-50 rounded-md">{error}</div>}

      <div className="grid gap-4">
        {filteredStaff.map((staffMember) => (
          <Card key={staffMember._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {staffMember.name}
                <span className="block text-sm text-gray-500">{staffMember.position}</span>
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDeleteStaff(staffMember._id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Email: {staffMember.email}</span>
                <span>Department: {staffMember.department}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Staff</h3>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <Input
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
              <div className="flex justify-end gap-4">
                <Button type="button" onClick={() => setShowAddForm(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffSection;
