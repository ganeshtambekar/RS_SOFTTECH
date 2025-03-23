import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/Button';
import { Input } from "../ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Plus, Search, Settings } from 'lucide-react';
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
        const response = await axios.get(`${config.API_URL}/staff`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStaff(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch staff data');
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
        `${config.API_URL}/staff`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setStaff([...staff, response.data]);
      setShowAddForm(false);
      setFormData({
        name: '',
        email: '',
        department: 'Computer Science',
        position: 'Lecturer'
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add staff member');
    }
  };

  const filteredStaff = staff.filter(staffMember =>
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staffMember.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Loading staff...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Staff</h2>
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

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="grid gap-4">
        {filteredStaff.map((staffMember) => (
          <Card key={staffMember._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {staffMember.name}
                <span className="block text-sm text-gray-500">{staffMember.position}</span>
              </CardTitle>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
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

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Staff Member</h3>
            <form onSubmit={handleAddStaff}>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <select
                  className="w-full p-2 border rounded"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Engineering</option>
                </select>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                >
                  <option>Lecturer</option>
                  <option>Professor</option>
                  <option>Assistant Professor</option>
                  <option>Visiting Faculty</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Staff</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffSection;