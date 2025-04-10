import { useState } from 'react';
import { 
  BarChart3, 
  Filter, 
  Download, 
  FileText, 
  Printer, 
  Save, 
  Search, 
  ArrowUpDown,
  User,
  UserCheck,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/DataTable';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const studentData = [
  { id: 1, name: 'Rahul Sharma', roll: 'CS001', attendance: 92, marks: 87, grade: 'A' },
  { id: 2, name: 'Priya Patel', roll: 'CS002', attendance: 88, marks: 92, grade: 'A' },
  { id: 3, name: 'Amit Kumar', roll: 'CS003', attendance: 78, marks: 65, grade: 'C' },
  { id: 4, name: 'Sneha Gupta', roll: 'IT001', attendance: 95, marks: 94, grade: 'A+' },
  { id: 5, name: 'Varun Singh', roll: 'IT002', attendance: 75, marks: 72, grade: 'B' },
  { id: 6, name: 'Neha Sharma', roll: 'CS004', attendance: 85, marks: 80, grade: 'B+' },
  { id: 7, name: 'Raj Patel', roll: 'CS005', attendance: 90, marks: 85, grade: 'A' },
  { id: 8, name: 'Kavita Singh', roll: 'IT003', attendance: 82, marks: 78, grade: 'B+' },
  { id: 9, name: 'Deepak Verma', roll: 'IT004', attendance: 70, marks: 62, grade: 'C' },
  { id: 10, name: 'Ananya Gupta', roll: 'CS006', attendance: 93, marks: 90, grade: 'A' },
];

const subjectData = [
  { id: 1, name: 'Operating Systems', code: 'CS501', dept: 'CSE', faculty: 'Dr. Anita Kumar', avgMarks: 78, avgAttendance: 85 },
  { id: 2, name: 'Database Management', code: 'CS502', dept: 'CSE', faculty: 'Dr. Anita Kumar', avgMarks: 80, avgAttendance: 82 },
  { id: 3, name: 'Computer Networks', code: 'CS503', dept: 'CSE', faculty: 'Prof. Sanjay Gupta', avgMarks: 75, avgAttendance: 80 },
  { id: 4, name: 'Data Structures', code: 'CS504', dept: 'CSE', faculty: 'Dr. Priya Shah', avgMarks: 72, avgAttendance: 88 },
  { id: 5, name: 'Web Technologies', code: 'CS505', dept: 'CSE', faculty: 'Prof. Sanjay Gupta', avgMarks: 82, avgAttendance: 84 },
  { id: 6, name: 'Machine Learning', code: 'CS506', dept: 'CSE', faculty: 'Dr. Manisha Singh', avgMarks: 76, avgAttendance: 81 },
  { id: 7, name: 'Cloud Computing', code: 'IT501', dept: 'IT', faculty: 'Prof. Karan Mehta', avgMarks: 79, avgAttendance: 83 },
  { id: 8, name: 'Mobile Development', code: 'IT502', dept: 'IT', faculty: 'Prof. Karan Mehta', avgMarks: 81, avgAttendance: 80 },
];

const correlationData = studentData.map(student => ({
  name: student.name,
  attendance: student.attendance,
  marks: student.marks,
}));

const classComparisonData = [
  { name: 'CSE-A', avgMarks: 82, avgAttendance: 88 },
  { name: 'CSE-B', avgMarks: 78, avgAttendance: 85 },
  { name: 'IT-A', avgMarks: 80, avgAttendance: 84 },
  { name: 'ECE-A', avgMarks: 76, avgAttendance: 82 },
];

const gradeDistributionData = [
  { grade: 'A+', count: 15 },
  { grade: 'A', count: 28 },
  { grade: 'B+', count: 22 },
  { grade: 'B', count: 18 },
  { grade: 'C+', count: 10 },
  { grade: 'C', count: 8 },
  { grade: 'D', count: 5 },
  { grade: 'F', count: 2 },
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  
  const filteredStudents = studentData.filter(student => {
    return student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           student.roll.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const filteredSubjects = subjectData.filter(subject => {
    const matchesDept = departmentFilter === 'all' || subject.dept === departmentFilter;
    return subject.name.toLowerCase().includes(searchQuery.toLowerCase()) && matchesDept;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Internal Marks & Attendance Reports</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-adminhub-surface">
          <TabsTrigger value="student" className="data-[state=active]:bg-adminhub-accent">
            <User className="h-4 w-4 mr-2" />
            Student-wise Reports
          </TabsTrigger>
          <TabsTrigger value="subject" className="data-[state=active]:bg-adminhub-accent">
            <BookOpen className="h-4 w-4 mr-2" />
            Subject-wise Reports
          </TabsTrigger>
          <TabsTrigger value="correlation" className="data-[state=active]:bg-adminhub-accent">
            <BarChart3 className="h-4 w-4 mr-2" />
            Correlation Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="student" className="mt-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center w-full sm:w-auto space-x-2">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adminhub-secondary-text" />
                    <Input
                      type="text"
                      placeholder="Search students by name or roll..."
                      className="pl-8 bg-adminhub-background text-adminhub-secondary-text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort by Performance
                  </Button>
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
                  { key: 'attendance', header: 'Attendance', cell: (student) => (
                    <div className="w-full flex items-center gap-2">
                      <Progress 
                        value={student.attendance} 
                        className="h-2 w-24 bg-adminhub-background" 
                        indicatorClassName={
                          student.attendance >= 90 
                            ? "bg-adminhub-success" 
                            : student.attendance >= 80 
                              ? "bg-yellow-500"
                              : "bg-adminhub-error"
                        }
                      />
                      <span className="text-sm">{student.attendance}%</span>
                    </div>
                  )},
                  { key: 'marks', header: 'Marks', cell: (student) => (
                    <div className="w-full flex items-center gap-2">
                      <Progress 
                        value={student.marks} 
                        max={100}
                        className="h-2 w-24 bg-adminhub-background" 
                        indicatorClassName={
                          student.marks >= 85 
                            ? "bg-adminhub-success" 
                            : student.marks >= 70 
                              ? "bg-yellow-500"
                              : "bg-adminhub-error"
                        }
                      />
                      <span className="text-sm">{student.marks}%</span>
                    </div>
                  )},
                  { key: 'grade', header: 'Grade', cell: (student) => (
                    <Badge 
                      variant="outline" 
                      className={
                        student.grade === 'A+' || student.grade === 'A'
                          ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                          : student.grade === 'B+' || student.grade === 'B'
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                      }
                    >
                      {student.grade}
                    </Badge>
                  )},
                  { key: 'actions', header: 'Actions', cell: (student) => (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )},
                ]}
                data={filteredStudents}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ChartCard title="Grade Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="grade" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar dataKey="count" fill="#2979FF" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Class Comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Bar dataKey="avgMarks" name="Avg. Marks" fill="#2979FF" />
                  <Bar dataKey="avgAttendance" name="Avg. Attendance" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>
        
        <TabsContent value="subject" className="mt-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center w-full sm:w-auto space-x-2">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adminhub-secondary-text" />
                    <Input
                      type="text"
                      placeholder="Search subjects..."
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
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="CSE">Computer Science</SelectItem>
                      <SelectItem value="IT">Information Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'name', header: 'Subject', cell: (subject) => (
                    <div>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-xs text-adminhub-secondary-text">{subject.code}</div>
                    </div>
                  )},
                  { key: 'dept', header: 'Department' },
                  { key: 'faculty', header: 'Faculty' },
                  { key: 'avgMarks', header: 'Avg. Marks', cell: (subject) => (
                    <div className="w-full flex items-center gap-2">
                      <Progress 
                        value={subject.avgMarks} 
                        max={100}
                        className="h-2 w-24 bg-adminhub-background" 
                        indicatorClassName={
                          subject.avgMarks >= 80 
                            ? "bg-adminhub-success" 
                            : subject.avgMarks >= 70 
                              ? "bg-yellow-500"
                              : "bg-adminhub-error"
                        }
                      />
                      <span className="text-sm">{subject.avgMarks}%</span>
                    </div>
                  )},
                  { key: 'avgAttendance', header: 'Avg. Attendance', cell: (subject) => (
                    <div className="w-full flex items-center gap-2">
                      <Progress 
                        value={subject.avgAttendance} 
                        max={100}
                        className="h-2 w-24 bg-adminhub-background" 
                        indicatorClassName={
                          subject.avgAttendance >= 85 
                            ? "bg-adminhub-success" 
                            : subject.avgAttendance >= 80 
                              ? "bg-yellow-500"
                              : "bg-adminhub-error"
                        }
                      />
                      <span className="text-sm">{subject.avgAttendance}%</span>
                    </div>
                  )},
                  { key: 'actions', header: 'Actions', cell: (subject) => (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Report</Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )},
                ]}
                data={filteredSubjects}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ChartCard title="Subject Performance Comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={subjectData.slice(0, 5)} 
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#B0B0B0" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={150} 
                    stroke="#B0B0B0" 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Bar dataKey="avgMarks" name="Avg. Marks" fill="#2979FF" />
                  <Bar dataKey="avgAttendance" name="Avg. Attendance" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Subject Performance Over Time">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#B0B0B0"
                  />
                  <YAxis 
                    stroke="#B0B0B0"
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    data={[
                      { name: 'Jan', value: 75 },
                      { name: 'Feb', value: 78 },
                      { name: 'Mar', value: 80 },
                      { name: 'Apr', value: 82 },
                      { name: 'May', value: 79 },
                      { name: 'Jun', value: 81 },
                    ]}
                    dataKey="value"
                    name="Operating Systems" 
                    stroke="#2979FF" 
                  />
                  <Line 
                    type="monotone" 
                    data={[
                      { name: 'Jan', value: 70 },
                      { name: 'Feb', value: 74 },
                      { name: 'Mar', value: 76 },
                      { name: 'Apr', value: 80 },
                      { name: 'May', value: 82 },
                      { name: 'Jun', value: 79 },
                    ]}
                    dataKey="value"
                    name="Database Management" 
                    stroke="#4CAF50" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>
        
        <TabsContent value="correlation" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Attendance vs. Marks Correlation">
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    type="number" 
                    dataKey="attendance" 
                    name="Attendance" 
                    stroke="#B0B0B0"
                    domain={[60, 100]}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="marks" 
                    name="Marks" 
                    stroke="#B0B0B0"
                    domain={[60, 100]}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                    formatter={(value) => [`${value}`, '']}
                    labelFormatter={(value) => `Student: ${correlationData[value].name}`}
                  />
                  <Scatter name="Students" data={correlationData} fill="#2979FF" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-sm text-adminhub-secondary-text text-center mt-4">
                Strong positive correlation between attendance and academic performance
              </p>
            </ChartCard>
            
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-adminhub-background rounded-md border-l-4 border-l-adminhub-accent">
                    <h3 className="font-medium mb-2">Key Findings</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Strong positive correlation (0.78) between attendance and marks</li>
                      <li>Students with 90%+ attendance have an average of 88% marks</li>
                      <li>Students with below 80% attendance average only 70% marks</li>
                      <li>Correlation stronger in technical subjects than theory subjects</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-adminhub-background rounded-md border-l-4 border-l-adminhub-success">
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Implement attendance monitoring system with alerts</li>
                      <li>Provide extra support for students with attendance below 80%</li>
                      <li>Recognize and reward students with consistent attendance</li>
                      <li>Regular tracking and intervention for at-risk students</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-adminhub-background rounded-md text-center">
                      <div className="text-3xl font-bold text-adminhub-accent">0.78</div>
                      <div className="text-sm text-adminhub-secondary-text">Correlation Coefficient</div>
                    </div>
                    <div className="p-4 bg-adminhub-background rounded-md text-center">
                      <div className="text-3xl font-bold text-adminhub-success">18%</div>
                      <div className="text-sm text-adminhub-secondary-text">Improvement Potential</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-adminhub-surface border-border/30 mt-6">
            <CardHeader>
              <CardTitle className="text-base font-medium">Student Performance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-border/30 bg-adminhub-background p-2 text-center"></th>
                      <th className="border border-border/30 bg-adminhub-background p-2 text-center">Low Marks<br />(Below 70%)</th>
                      <th className="border border-border/30 bg-adminhub-background p-2 text-center">Medium Marks<br />(70-85%)</th>
                      <th className="border border-border/30 bg-adminhub-background p-2 text-center">High Marks<br />(85%+)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Low Attendance<br />(Below 80%)</td>
                      <td className="border border-border/30 p-2 bg-adminhub-error/10 text-center">
                        <div className="font-bold mb-1">15%</div>
                        <div className="text-xs">High Risk Zone</div>
                      </td>
                      <td className="border border-border/30 p-2 bg-yellow-500/10 text-center">
                        <div className="font-bold mb-1">8%</div>
                        <div className="text-xs">Moderate Risk</div>
                      </td>
                      <td className="border border-border/30 p-2 bg-adminhub-background/80 text-center">
                        <div className="font-bold mb-1">2%</div>
                        <div className="text-xs">Exceptional Cases</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Medium Attendance<br />(80-90%)</td>
                      <td className="border border-border/30 p-2 bg-yellow-500/10 text-center">
                        <div className="font-bold mb-1">10%</div>
                        <div className="text-xs">Moderate Risk</div>
                      </td>
                      <td className="border border-border/30 p-2 bg-adminhub-background/80 text-center">
                        <div className="font-bold mb-1">25%</div>
                        <div className="text-xs">Average Zone</div>
                      </td>
                      <td className="border border-border/30 p-2 bg-adminhub-accent/10 text-center">
                        <div className="font-bold mb-1">15%</div>
                        <div className="text-xs">Good Performance</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border/30 bg-adminhub-background p-2 font-medium">High Attendance<br />(90%+)</td>
                      <td className="border border-border/30 p-2 bg-adminhub-background/80 text-center">
                        <div className="font-bold mb-1">3%</div>
                        <div className="text-xs">Needs Attention</div>
                      </td>
                      <td className="border border-border/30 p-2 bg-adminhub-accent/10 text-center">
                        <div className="font-bold mb-1">12%</div>
                        <div className="text-xs">Good Performance</div>
                      </td>
                      <td className="border border-border/30 p-2 bg-adminhub-success/10 text-center">
                        <div className="font-bold mb-1">10%</div>
                        <div className="text-xs">Excellent Zone</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-adminhub-secondary-text">
                <p>Percentages represent distribution of students across performance matrix.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
