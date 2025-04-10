
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  CalendarRange, 
  BarChart, 
  MoreHorizontal 
} from 'lucide-react';
import { DataTable } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  BarChart as BarChartComponent, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Sample faculty data
const facultyData = [
  { 
    id: 1, 
    name: 'Dr. Anita Kumar', 
    email: 'anita.kumar@example.edu', 
    phone: '+91 98765 43210', 
    department: 'Computer Science', 
    subjects: ['Database Systems', 'Data Structures'], 
    joinDate: '2018-06-15',
    attendance: 96,
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Prof. Sanjay Gupta', 
    email: 'sanjay.gupta@example.edu', 
    phone: '+91 98765 43211', 
    department: 'Computer Science', 
    subjects: ['Web Development', 'Software Engineering'], 
    joinDate: '2019-07-10',
    attendance: 92,
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Dr. Manisha Singh', 
    email: 'manisha.singh@example.edu', 
    phone: '+91 98765 43212', 
    department: 'Information Technology', 
    subjects: ['Artificial Intelligence', 'Machine Learning'], 
    joinDate: '2017-08-22',
    attendance: 89,
    status: 'On Leave'
  },
  { 
    id: 4, 
    name: 'Dr. Priya Shah', 
    email: 'priya.shah@example.edu', 
    phone: '+91 98765 43213', 
    department: 'Computer Science', 
    subjects: ['Operating Systems', 'Computer Networks'], 
    joinDate: '2016-05-18',
    attendance: 94,
    status: 'Active'
  },
  { 
    id: 5, 
    name: 'Prof. Karan Mehta', 
    email: 'karan.mehta@example.edu', 
    phone: '+91 98765 43214', 
    department: 'Information Technology', 
    subjects: ['Mobile Computing', 'Cloud Computing'], 
    joinDate: '2020-02-15',
    attendance: 91,
    status: 'Active'
  },
];

// Sample performance data
const performanceData = [
  { name: 'Lecture Delivery', value: 85 },
  { name: 'Student Feedback', value: 92 },
  { name: 'Research Output', value: 78 },
  { name: 'Administrative Tasks', value: 88 },
  { name: 'Subject Results', value: 90 },
];

// Sample faculty attendance data
const attendanceData = [
  { month: 'Jan', attendance: 95 },
  { month: 'Feb', attendance: 92 },
  { month: 'Mar', attendance: 97 },
  { month: 'Apr', attendance: 94 },
  { month: 'May', attendance: 96 },
  { month: 'Jun', attendance: 93 },
];

const FacultyManagement = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<null | typeof facultyData[0]>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  
  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faculty.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || faculty.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-adminhub-surface text-adminhub-primary-text">
              <DialogHeader>
                <DialogTitle>Add New Faculty</DialogTitle>
                <DialogDescription className="text-adminhub-secondary-text">
                  Enter the details of the new faculty member.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Name</label>
                  <Input className="col-span-3" placeholder="Dr. John Doe" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Email</label>
                  <Input className="col-span-3" placeholder="john.doe@example.edu" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Phone</label>
                  <Input className="col-span-3" placeholder="+91 98765 43210" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Department</label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Subjects</label>
                  <Input className="col-span-3" placeholder="Subject 1, Subject 2" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Faculty</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-adminhub-surface border-border/30">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center w-full sm:w-auto space-x-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adminhub-secondary-text" />
                <Input
                  type="text"
                  placeholder="Search faculty..."
                  className="pl-8 bg-adminhub-background text-adminhub-secondary-text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-adminhub-secondary-text" />
              <Select 
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[180px] bg-adminhub-background">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent className="bg-adminhub-surface border-border">
                  <SelectItem value="All">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', header: 'Name', cell: (faculty) => (
                <div className="font-medium">{faculty.name}</div>
              )},
              { key: 'email', header: 'Email' },
              { key: 'department', header: 'Department' },
              { key: 'subjects', header: 'Subjects', cell: (faculty) => (
                <div className="flex flex-wrap gap-1">
                  {faculty.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline" className="bg-adminhub-background">
                      {subject}
                    </Badge>
                  ))}
                </div>
              )},
              { key: 'attendance', header: 'Attendance', cell: (faculty) => (
                <Badge 
                  variant="outline" 
                  className={
                    faculty.attendance >= 95 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                      : faculty.attendance >= 90 
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                  }
                >
                  {faculty.attendance}%
                </Badge>
              )},
              { key: 'status', header: 'Status', cell: (faculty) => (
                <Badge 
                  variant="outline" 
                  className={
                    faculty.status === 'Active' 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                      : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  }
                >
                  {faculty.status}
                </Badge>
              )},
              { key: 'actions', header: 'Actions', cell: (faculty) => (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-adminhub-surface border-border">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem className="cursor-pointer">Edit Faculty</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Assign Subjects</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">View Performance</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem className="text-adminhub-error cursor-pointer">Remove Faculty</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )},
            ]}
            data={filteredFaculty}
          />
        </CardContent>
      </Card>

      {selectedFaculty && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-adminhub-surface border-border/30 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-medium">Faculty Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-adminhub-accent flex items-center justify-center mb-4">
                  <User className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold">{selectedFaculty.name}</h3>
                <p className="text-adminhub-secondary-text">{selectedFaculty.department}</p>
                <Badge 
                  variant="outline" 
                  className={
                    selectedFaculty.status === 'Active' 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20 mt-2" 
                      : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 mt-2"
                  }
                >
                  {selectedFaculty.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>{selectedFaculty.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>{selectedFaculty.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>{selectedFaculty.subjects.join(', ')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarRange className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>Joined: {new Date(selectedFaculty.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>Attendance: {selectedFaculty.attendance}%</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button className="w-full" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Assign Subjects
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="performance">
                <TabsList className="bg-adminhub-background mb-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="subjects">Subjects</TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChartComponent data={performanceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#B0B0B0" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={150} stroke="#B0B0B0" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Score']}
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      <Bar dataKey="value" fill="#2979FF" />
                    </BarChartComponent>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="attendance">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChartComponent data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#B0B0B0" />
                      <YAxis stroke="#B0B0B0" domain={[80, 100]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Attendance']}
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      <Bar dataKey="attendance" fill="#4CAF50" />
                    </BarChartComponent>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="subjects">
                  <div className="space-y-3">
                    {selectedFaculty.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-adminhub-background rounded-md">
                        <div className="font-medium">{subject}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                            4 Classes/Week
                          </Badge>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-3">
                      <Plus className="mr-2 h-4 w-4" />
                      Assign New Subject
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;
