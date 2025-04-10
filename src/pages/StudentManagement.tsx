
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  Bookmark, 
  BarChart2, 
  Flag, 
  MoreHorizontal,
  FileText 
} from 'lucide-react';
import { DataTable } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Sample student data
const studentData = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    roll: 'CS001', 
    email: 'rahul.s@example.edu', 
    phone: '+91 98765 54321', 
    branch: 'Computer Science', 
    semester: 6,
    section: 'A',
    attendance: 92,
    performance: 87,
    status: 'Regular',
    disciplinary: []
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    roll: 'CS002', 
    email: 'priya.p@example.edu', 
    phone: '+91 98765 54322', 
    branch: 'Computer Science', 
    semester: 6,
    section: 'A',
    attendance: 88,
    performance: 92,
    status: 'Regular',
    disciplinary: []
  },
  { 
    id: 3, 
    name: 'Amit Kumar', 
    roll: 'CS003', 
    email: 'amit.k@example.edu', 
    phone: '+91 98765 54323', 
    branch: 'Computer Science', 
    semester: 6,
    section: 'B',
    attendance: 78,
    performance: 65,
    status: 'Low Performance',
    disciplinary: []
  },
  { 
    id: 4, 
    name: 'Sneha Gupta', 
    roll: 'IT001', 
    email: 'sneha.g@example.edu', 
    phone: '+91 98765 54324', 
    branch: 'Information Technology', 
    semester: 4,
    section: 'A',
    attendance: 95,
    performance: 94,
    status: 'Regular',
    disciplinary: []
  },
  { 
    id: 5, 
    name: 'Varun Singh', 
    roll: 'IT002', 
    email: 'varun.s@example.edu', 
    phone: '+91 98765 54325', 
    branch: 'Information Technology', 
    semester: 4,
    section: 'A',
    attendance: 75,
    performance: 72,
    status: 'Low Attendance',
    disciplinary: ['Warning issued for low attendance - 2025-03-15']
  },
];

// Sample performance data for subject-wise marks
const subjectMarksData = [
  { subject: 'Database Systems', internal: 42, mid: 28, assignment: 18, total: 88, max: 100 },
  { subject: 'Data Structures', internal: 38, mid: 26, assignment: 16, total: 80, max: 100 },
  { subject: 'Web Development', internal: 35, mid: 24, assignment: 15, total: 74, max: 100 },
  { subject: 'Operating Systems', internal: 40, mid: 25, assignment: 17, total: 82, max: 100 },
];

// Sample attendance data 
const attendanceData = [
  { month: 'Jan', attendance: 90 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 92 },
  { month: 'Apr', attendance: 78 },
  { month: 'May', attendance: 86 },
  { month: 'Jun', attendance: 84 },
];

const StudentManagement = () => {
  const [selectedStudent, setSelectedStudent] = useState<null | typeof studentData[0]>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [sectionFilter, setSectionFilter] = useState('All');
  
  const filteredStudents = studentData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.roll.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === 'All' || student.branch === branchFilter;
    const matchesSemester = semesterFilter === 'All' || student.semester.toString() === semesterFilter;
    const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
    
    return matchesSearch && matchesBranch && matchesSemester && matchesSection;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-adminhub-surface text-adminhub-primary-text">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription className="text-adminhub-secondary-text">
                  Enter the details of the new student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Name</label>
                  <Input className="col-span-3" placeholder="Rahul Sharma" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Roll Number</label>
                  <Input className="col-span-3" placeholder="CS001" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Email</label>
                  <Input className="col-span-3" placeholder="rahul.s@example.edu" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Phone</label>
                  <Input className="col-span-3" placeholder="+91 98765 54321" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Branch</label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Semester</label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>{sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Section</label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Student</Button>
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
                  placeholder="Search students..."
                  className="pl-8 bg-adminhub-background text-adminhub-secondary-text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-adminhub-secondary-text" />
                <Select 
                  value={branchFilter}
                  onValueChange={setBranchFilter}
                >
                  <SelectTrigger className="w-[180px] bg-adminhub-background">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent className="bg-adminhub-surface border-border">
                    <SelectItem value="All">All Branches</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Select 
                  value={semesterFilter}
                  onValueChange={setSemesterFilter}
                >
                  <SelectTrigger className="w-[180px] bg-adminhub-background">
                    <SelectValue placeholder="All Semesters" />
                  </SelectTrigger>
                  <SelectContent className="bg-adminhub-surface border-border">
                    <SelectItem value="All">All Semesters</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Select 
                  value={sectionFilter}
                  onValueChange={setSectionFilter}
                >
                  <SelectTrigger className="w-[180px] bg-adminhub-background">
                    <SelectValue placeholder="All Sections" />
                  </SelectTrigger>
                  <SelectContent className="bg-adminhub-surface border-border">
                    <SelectItem value="All">All Sections</SelectItem>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', header: 'Name', cell: (student) => (
                <div className="font-medium">{student.name}</div>
              )},
              { key: 'roll', header: 'Roll No.' },
              { key: 'branch', header: 'Branch' },
              { key: 'semester', header: 'Semester', cell: (student) => (
                <div>Sem {student.semester}</div>
              )},
              { key: 'section', header: 'Section' },
              { key: 'attendance', header: 'Attendance', cell: (student) => (
                <Badge 
                  variant="outline" 
                  className={
                    student.attendance >= 90 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                      : student.attendance >= 80 
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                  }
                >
                  {student.attendance}%
                </Badge>
              )},
              { key: 'performance', header: 'Performance', cell: (student) => (
                <Badge 
                  variant="outline" 
                  className={
                    student.performance >= 85 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                      : student.performance >= 70 
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                  }
                >
                  {student.performance}%
                </Badge>
              )},
              { key: 'status', header: 'Status', cell: (student) => (
                <Badge 
                  variant="outline" 
                  className={
                    student.status === 'Regular' 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                      : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                  }
                >
                  {student.status}
                </Badge>
              )},
              { key: 'actions', header: 'Actions', cell: (student) => (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedStudent(student)}
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
                      <DropdownMenuItem className="cursor-pointer">Edit Student</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">View Marks</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        {student.status.includes('Low') ? 'Remove Flag' : 'Flag Student'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem className="text-adminhub-error cursor-pointer">Issue Warning</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )},
            ]}
            data={filteredStudents}
          />
        </CardContent>
      </Card>

      {selectedStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-adminhub-surface border-border/30 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-medium">Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-adminhub-accent flex items-center justify-center mb-4">
                  <User className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                <p className="text-adminhub-secondary-text">{selectedStudent.roll}</p>
                <Badge 
                  variant="outline" 
                  className={
                    selectedStudent.status === 'Regular' 
                      ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20 mt-2" 
                      : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20 mt-2"
                  }
                >
                  {selectedStudent.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bookmark className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>{selectedStudent.branch}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart2 className="h-4 w-4 text-adminhub-secondary-text" />
                  <span>Semester {selectedStudent.semester}, Section {selectedStudent.section}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Attendance</span>
                    <span className="text-sm font-medium">{selectedStudent.attendance}%</span>
                  </div>
                  <Progress 
                    value={selectedStudent.attendance} 
                    className="h-2 bg-adminhub-background" 
                    indicatorClassName={
                      selectedStudent.attendance >= 90 
                        ? "bg-adminhub-success" 
                        : selectedStudent.attendance >= 80 
                          ? "bg-yellow-500"
                          : "bg-adminhub-error"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance</span>
                    <span className="text-sm font-medium">{selectedStudent.performance}%</span>
                  </div>
                  <Progress 
                    value={selectedStudent.performance} 
                    className="h-2 bg-adminhub-background" 
                    indicatorClassName={
                      selectedStudent.performance >= 85 
                        ? "bg-adminhub-success" 
                        : selectedStudent.performance >= 70 
                          ? "bg-yellow-500"
                          : "bg-adminhub-error"
                    }
                  />
                </div>
              </div>
              
              {selectedStudent.disciplinary.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Flag className="h-4 w-4 text-adminhub-error mr-2" />
                    Disciplinary Records
                  </h4>
                  <div className="bg-adminhub-error/10 text-adminhub-error rounded p-3 text-sm">
                    {selectedStudent.disciplinary.map((record, index) => (
                      <div key={index}>{record}</div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex gap-2">
                <Button className="w-full" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  {selectedStudent.status.includes('Low') ? 'Remove Flag' : 'Flag Student'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Academic Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="marks">
                <TabsList className="bg-adminhub-background mb-4">
                  <TabsTrigger value="marks">Internal Marks</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="records">Academic Records</TabsTrigger>
                </TabsList>
                
                <TabsContent value="marks">
                  <div className="space-y-4">
                    {subjectMarksData.map((subject, index) => (
                      <div key={index} className="bg-adminhub-background p-4 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{subject.subject}</h4>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">{subject.total}/{subject.max}</span>
                            <Badge 
                              variant="outline" 
                              className={
                                (subject.total / subject.max) * 100 >= 85 
                                  ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                                  : (subject.total / subject.max) * 100 >= 70 
                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                              }
                            >
                              {Math.round((subject.total / subject.max) * 100)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-adminhub-secondary-text mb-1">Internal Tests</span>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subject.internal}/50</span>
                              <Progress 
                                value={(subject.internal / 50) * 100} 
                                className="h-2 w-24 bg-adminhub-surface" 
                                indicatorClassName="bg-adminhub-accent"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-adminhub-secondary-text mb-1">Mid Term</span>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subject.mid}/30</span>
                              <Progress 
                                value={(subject.mid / 30) * 100} 
                                className="h-2 w-24 bg-adminhub-surface" 
                                indicatorClassName="bg-adminhub-accent"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-adminhub-secondary-text mb-1">Assignments</span>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{subject.assignment}/20</span>
                              <Progress 
                                value={(subject.assignment / 20) * 100} 
                                className="h-2 w-24 bg-adminhub-surface" 
                                indicatorClassName="bg-adminhub-accent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Marks
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="attendance">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#B0B0B0" />
                      <YAxis stroke="#B0B0B0" domain={[60, 100]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Attendance']}
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                      <Bar dataKey="attendance" fill={attendanceData.some(d => d.attendance < 80) ? "#FF3D00" : "#4CAF50"} />
                      <Line type="monotone" dataKey="attendance" stroke="#2979FF" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 bg-adminhub-background p-4 rounded-md space-y-4">
                    <h4 className="font-medium">Attendance Summary</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-adminhub-surface rounded-md">
                        <div className="text-2xl font-bold mb-1">
                          {Math.round(attendanceData.reduce((acc, curr) => acc + curr.attendance, 0) / attendanceData.length)}%
                        </div>
                        <div className="text-sm text-adminhub-secondary-text">Average</div>
                      </div>
                      <div className="text-center p-3 bg-adminhub-surface rounded-md">
                        <div className="text-2xl font-bold mb-1">
                          {Math.max(...attendanceData.map(d => d.attendance))}%
                        </div>
                        <div className="text-sm text-adminhub-secondary-text">Highest</div>
                      </div>
                      <div className="text-center p-3 bg-adminhub-surface rounded-md">
                        <div className="text-2xl font-bold mb-1">
                          {Math.min(...attendanceData.map(d => d.attendance))}%
                        </div>
                        <div className="text-sm text-adminhub-secondary-text">Lowest</div>
                      </div>
                      <div className="text-center p-3 bg-adminhub-surface rounded-md">
                        <div className="text-2xl font-bold mb-1">
                          {attendanceData.filter(d => d.attendance < 80).length}
                        </div>
                        <div className="text-sm text-adminhub-secondary-text">Below 80%</div>
                      </div>
                    </div>
                    {attendanceData.some(d => d.attendance < 80) && (
                      <div className="bg-adminhub-error/10 text-adminhub-error rounded p-3 text-sm">
                        Warning: Student has attendance below 80% in {attendanceData.filter(d => d.attendance < 80).length} month(s)
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="records">
                  <div className="space-y-4">
                    <div className="bg-adminhub-background p-4 rounded-md">
                      <h4 className="font-medium mb-3">Academic History</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Semester 5</span>
                          <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                            CGPA: 8.5
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Semester 4</span>
                          <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                            CGPA: 8.2
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Semester 3</span>
                          <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                            CGPA: 7.9
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Semester 2</span>
                          <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                            CGPA: 8.1
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Semester 1</span>
                          <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                            CGPA: 8.0
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-adminhub-background p-4 rounded-md">
                      <h4 className="font-medium mb-3">Awards & Achievements</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Winner - Departmental Coding Competition (2024)</li>
                        <li>2nd Prize - Technical Paper Presentation (2023)</li>
                        <li>Merit Scholarship Recipient (2022-2023)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-adminhub-background p-4 rounded-md">
                      <h4 className="font-medium mb-3">Additional Notes</h4>
                      <p className="text-sm text-adminhub-secondary-text">
                        Student shows good potential in programming related subjects. 
                        Recommended for advanced project work in web development.
                      </p>
                    </div>
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

export default StudentManagement;
