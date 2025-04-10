
import { useState } from 'react';
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon,
  Download, 
  Share, 
  Calendar, 
  Calendar as CalendarIcon, 
  Filter, 
  Save, 
  RefreshCw,
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  FileText,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area,
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  PieChart, 
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample attendance trend data
const attendanceTrendData = [
  { month: 'Jan', cse: 92, it: 88, ece: 85 },
  { month: 'Feb', cse: 90, it: 86, ece: 84 },
  { month: 'Mar', cse: 88, it: 87, ece: 83 },
  { month: 'Apr', cse: 91, it: 89, ece: 86 },
  { month: 'May', cse: 94, it: 91, ece: 88 },
  { month: 'Jun', cse: 93, it: 90, ece: 87 },
];

// Sample faculty performance data
const facultyPerformanceData = [
  { name: 'Teaching Quality', value: 85 },
  { name: 'Research Output', value: 72 },
  { name: 'Student Feedback', value: 90 },
  { name: 'Administrative Tasks', value: 68 },
  { name: 'Department Contribution', value: 78 },
];

// Sample class performance data
const classPerformanceData = [
  { class: 'CSE-A', above90: 22, above80: 38, above70: 25, below70: 15 },
  { class: 'CSE-B', above90: 18, above80: 42, above70: 28, below70: 12 },
  { class: 'IT-A', above90: 15, above80: 45, above70: 30, below70: 10 },
  { class: 'ECE-A', above90: 12, above80: 35, above70: 38, below70: 15 },
];

// Sample subject performance data
const subjectPerformanceData = [
  { subject: 'Database Systems', avgMarks: 78, passRate: 92 },
  { subject: 'Data Structures', avgMarks: 72, passRate: 88 },
  { subject: 'Computer Networks', avgMarks: 75, passRate: 90 },
  { subject: 'Web Development', avgMarks: 82, passRate: 95 },
  { subject: 'Machine Learning', avgMarks: 76, passRate: 89 },
];

// Sample gender diversity data
const genderDiversityData = [
  { name: 'Male', value: 58 },
  { name: 'Female', value: 42 },
];

// Sample department comparison data
const departmentComparisonData = [
  { department: 'CSE', students: 520, faculty: 25, ratio: 20.8, research: 32 },
  { department: 'IT', students: 480, faculty: 22, ratio: 21.8, research: 28 },
  { department: 'ECE', students: 360, faculty: 18, ratio: 20, research: 24 },
  { department: 'Mech', students: 340, faculty: 20, ratio: 17, research: 18 },
  { department: 'Civil', students: 290, faculty: 15, ratio: 19.3, research: 15 },
];

// Sample colors for charts
const COLORS = ['#2979FF', '#4CAF50', '#FF9800', '#FF3D00'];

// Sample performance indicators
const performanceIndicators = [
  { name: 'Faculty Performance', value: 82, target: 85, trend: { value: 4, isPositive: true } },
  { name: 'Student Pass Rate', value: 88, target: 90, trend: { value: 2, isPositive: true } },
  { name: 'Research Publications', value: 45, target: 50, trend: { value: 12, isPositive: true } },
  { name: 'Attendance Rate', value: 91, target: 95, trend: { value: 1, isPositive: true } },
];

// Sample issues data
const issuesData = [
  { 
    title: 'Low Attendance in Computer Networks', 
    description: 'Average attendance is below 75% for the last 3 weeks.',
    type: 'warning',
    impact: 'Medium',
    action: 'Monitoring'
  },
  { 
    title: 'High Failure Rate in Data Structures', 
    description: '32% of students scored below passing marks in mid-term examination.',
    type: 'critical',
    impact: 'High',
    action: 'Intervention Required'
  },
  { 
    title: 'Faculty Shortage in ECE Department', 
    description: '3 faculty positions remain vacant affecting teaching load.',
    type: 'warning',
    impact: 'Medium',
    action: 'Recruitment in Progress'
  },
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('This Semester');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {timeRange}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceIndicators.map((indicator, index) => (
          <StatCard
            key={index}
            title={indicator.name}
            value={`${indicator.value}%`}
            trend={indicator.trend}
            icon={
              indicator.trend?.isPositive 
                ? <TrendingUp className="h-5 w-5" /> 
                : <TrendingDown className="h-5 w-5" />
            }
            variant={
              indicator.value >= indicator.target 
                ? "success" 
                : indicator.value >= indicator.target * 0.9 
                  ? "info" 
                  : "warning"
            }
          />
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-adminhub-surface">
          <TabsTrigger value="overview" className="data-[state=active]:bg-adminhub-accent">
            <BarChart2 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="faculty" className="data-[state=active]:bg-adminhub-accent">
            <Users className="h-4 w-4 mr-2" />
            Faculty Analytics
          </TabsTrigger>
          <TabsTrigger value="academic" className="data-[state=active]:bg-adminhub-accent">
            <GraduationCap className="h-4 w-4 mr-2" />
            Academic Performance
          </TabsTrigger>
          <TabsTrigger value="department" className="data-[state=active]:bg-adminhub-accent">
            <FileText className="h-4 w-4 mr-2" />
            Department Comparison
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Attendance Trends"
              action={
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[130px] h-8 text-xs bg-adminhub-background">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent className="bg-adminhub-surface border-border">
                    <SelectItem value="All">All Departments</SelectItem>
                    <SelectItem value="CSE">CSE Only</SelectItem>
                    <SelectItem value="IT">IT Only</SelectItem>
                    <SelectItem value="ECE">ECE Only</SelectItem>
                  </SelectContent>
                </Select>
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#B0B0B0" />
                  <YAxis domain={[75, 100]} stroke="#B0B0B0" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Attendance']}
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="cse" stackId="1" stroke="#2979FF" fill="#2979FF" fillOpacity={0.2} name="CSE" />
                  <Area type="monotone" dataKey="it" stackId="2" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.2} name="IT" />
                  <Area type="monotone" dataKey="ece" stackId="3" stroke="#FF9800" fill="#FF9800" fillOpacity={0.2} name="ECE" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard
              title="Class Performance Distribution"
              action={
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="class" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Bar dataKey="above90" name="90%+" fill="#4CAF50" stackId="a" />
                  <Bar dataKey="above80" name="80-89%" fill="#2979FF" stackId="a" />
                  <Bar dataKey="above70" name="70-79%" fill="#FF9800" stackId="a" />
                  <Bar dataKey="below70" name="Below 70%" fill="#FF3D00" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Potential Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issuesData.map((issue, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-md ${
                        issue.type === 'critical' 
                          ? 'bg-adminhub-error/10 border-l-2 border-l-adminhub-error' 
                          : 'bg-yellow-500/10 border-l-2 border-l-yellow-500'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                          issue.type === 'critical' ? 'text-adminhub-error' : 'text-yellow-500'
                        }`} />
                        <div>
                          <h4 className="font-medium text-sm">{issue.title}</h4>
                          <p className="text-xs text-adminhub-secondary-text mt-1">{issue.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs bg-adminhub-background/50">
                              {issue.impact} Impact
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-adminhub-background/50">
                              {issue.action}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <ChartCard title="Gender Distribution">
              <div className="flex flex-col items-center justify-center h-[300px]">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={genderDiversityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderDiversityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                      labelStyle={{ color: '#FFFFFF' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-8 mt-4">
                  {genderDiversityData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                      />
                      <div className="text-sm">{entry.name}: {entry.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
            
            <ChartCard title="Subject Performance">
              <div className="space-y-3">
                {subjectPerformanceData.map((subject, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <span className="text-sm">{subject.avgMarks}% avg</span>
                    </div>
                    <Progress 
                      value={subject.avgMarks} 
                      className="h-2 bg-adminhub-background" 
                      indicatorClassName={
                        subject.avgMarks >= 80 
                          ? "bg-adminhub-success" 
                          : subject.avgMarks >= 70 
                            ? "bg-adminhub-accent"
                            : "bg-yellow-500"
                      }
                    />
                    <div className="flex justify-between text-xs text-adminhub-secondary-text">
                      <span>Pass rate: {subject.passRate}%</span>
                      <span>{subject.avgMarks >= 80 ? 'Good' : subject.avgMarks >= 70 ? 'Average' : 'Needs Attention'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </TabsContent>
        
        <TabsContent value="faculty" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Faculty Performance Metrics">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={facultyPerformanceData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="name" stroke="#B0B0B0" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#B0B0B0" />
                  <Radar name="Department Average" dataKey="value" stroke="#2979FF" fill="#2979FF" fillOpacity={0.6} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Faculty Attendance Comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  layout="vertical" 
                  data={[
                    { name: 'Dr. Anita Kumar', value: 96 },
                    { name: 'Prof. Sanjay Gupta', value: 92 },
                    { name: 'Dr. Manisha Singh', value: 89 },
                    { name: 'Dr. Priya Shah', value: 94 },
                    { name: 'Prof. Karan Mehta', value: 91 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" domain={[80, 100]} stroke="#B0B0B0" />
                  <YAxis dataKey="name" type="category" width={150} stroke="#B0B0B0" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Attendance']}
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill={(entry) => entry.value >= 95 ? "#4CAF50" : entry.value >= 90 ? "#2979FF" : "#FF9800"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Faculty Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-adminhub-background rounded-md text-center">
                      <UserCheck className="h-8 w-8 mx-auto text-adminhub-accent mb-2" />
                      <div className="text-2xl font-bold">97%</div>
                      <div className="text-sm text-adminhub-secondary-text">Class Delivery Rate</div>
                    </div>
                    <div className="p-4 bg-adminhub-background rounded-md text-center">
                      <BookOpen className="h-8 w-8 mx-auto text-adminhub-success mb-2" />
                      <div className="text-2xl font-bold">32</div>
                      <div className="text-sm text-adminhub-secondary-text">Research Publications</div>
                    </div>
                    <div className="p-4 bg-adminhub-background rounded-md text-center">
                      <GraduationCap className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                      <div className="text-2xl font-bold">4.2/5</div>
                      <div className="text-sm text-adminhub-secondary-text">Student Feedback Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Top Performing Faculty</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Dr. Anita Kumar', department: 'Computer Science', score: 94 },
                        { name: 'Prof. Sanjay Gupta', department: 'Computer Science', score: 91 },
                        { name: 'Dr. Priya Shah', department: 'Computer Science', score: 88 },
                      ].map((faculty, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-adminhub-background/50 rounded-md">
                          <div>
                            <div className="font-medium">{faculty.name}</div>
                            <div className="text-xs text-adminhub-secondary-text">{faculty.department}</div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20"
                          >
                            {faculty.score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Faculty Needing Support</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Dr. Rajesh Verma', department: 'Information Technology', score: 72, issues: ['Low student feedback', 'Delayed assignment reviews'] },
                        { name: 'Prof. Neha Sharma', department: 'Electronics', score: 68, issues: ['Attendance issues', 'Incomplete syllabus coverage'] },
                      ].map((faculty, index) => (
                        <div key={index} className="p-3 bg-adminhub-background/50 rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{faculty.name}</div>
                              <div className="text-xs text-adminhub-secondary-text">{faculty.department}</div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className="bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                            >
                              {faculty.score}%
                            </Badge>
                          </div>
                          <div className="mt-2 text-xs">
                            <div className="text-adminhub-secondary-text mb-1">Areas for improvement:</div>
                            <ul className="list-disc list-inside space-y-1">
                              {faculty.issues.map((issue, i) => (
                                <li key={i}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Training & Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-adminhub-background rounded-md">
                    <div className="text-4xl font-bold text-adminhub-accent">18</div>
                    <div className="text-sm text-adminhub-secondary-text">Faculty Development Programs</div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">Recent Workshops</h3>
                    <div className="space-y-2">
                      {[
                        { title: 'AI & Machine Learning', date: '2025-03-15', attendees: 22 },
                        { title: 'Effective Teaching Methods', date: '2025-02-28', attendees: 35 },
                        { title: 'Research Methodology', date: '2025-02-10', attendees: 28 },
                      ].map((workshop, index) => (
                        <div key={index} className="p-3 bg-adminhub-background/50 rounded-md">
                          <div className="font-medium text-sm">{workshop.title}</div>
                          <div className="flex justify-between mt-1 text-xs text-adminhub-secondary-text">
                            <span>{new Date(workshop.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span>{workshop.attendees} attendees</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Skill Gap Analysis</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Advanced Technology</span>
                        <span>62% proficient</span>
                      </div>
                      <Progress value={62} className="h-1.5 bg-adminhub-background" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Research Skills</span>
                        <span>78% proficient</span>
                      </div>
                      <Progress value={78} className="h-1.5 bg-adminhub-background" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Industry Collaboration</span>
                        <span>45% proficient</span>
                      </div>
                      <Progress value={45} className="h-1.5 bg-adminhub-background" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="academic" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Subject-wise Performance">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="subject" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Bar dataKey="avgMarks" name="Average Marks" fill="#2979FF" />
                  <Bar dataKey="passRate" name="Pass Rate" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Attendance vs Performance Correlation">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    type="category"
                    dataKey="name"
                    allowDuplicatedCategory={false}
                    stroke="#B0B0B0"
                  />
                  <YAxis yAxisId="left" stroke="#2979FF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone"
                    data={[
                      { name: '<75%', value: 62 },
                      { name: '75-85%', value: 72 },
                      { name: '85-95%', value: 85 },
                      { name: '>95%', value: 92 },
                    ]}
                    dataKey="value"
                    stroke="#2979FF"
                    name="Avg. Marks"
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone"
                    data={[
                      { name: '<75%', value: 58 },
                      { name: '75-85%', value: 76 },
                      { name: '85-95%', value: 88 },
                      { name: '>95%', value: 94 },
                    ]}
                    dataKey="value"
                    stroke="#4CAF50"
                    name="Pass Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-adminhub-background rounded-md border-l-4 border-l-adminhub-accent">
                    <h3 className="font-medium mb-2">Key Observations</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Strong positive correlation (0.82) between attendance and academic performance</div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Higher performance in lab-oriented subjects compared to theory subjects</div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Morning classes show better attendance and participation than afternoon classes</div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>25% improvement in pass rate for subjects using project-based learning</div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-adminhub-background rounded-md border-l-4 border-l-adminhub-success">
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Implement small group tutorials for subjects with low pass rates</div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Integrate more project-based learning across curriculum</div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Early intervention system for students with attendance below 75%</div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-1 flex-shrink-0">•</div>
                        <div>Schedule challenging subjects in morning slots when possible</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Academic Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-border/30 bg-adminhub-background p-2 text-center"></th>
                        <th className="border border-border/30 bg-adminhub-background p-2 text-center">CSE</th>
                        <th className="border border-border/30 bg-adminhub-background p-2 text-center">IT</th>
                        <th className="border border-border/30 bg-adminhub-background p-2 text-center">ECE</th>
                        <th className="border border-border/30 bg-adminhub-background p-2 text-center">Overall</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Average Marks</td>
                        <td className="border border-border/30 p-2 text-center">82%</td>
                        <td className="border border-border/30 p-2 text-center">78%</td>
                        <td className="border border-border/30 p-2 text-center">76%</td>
                        <td className="border border-border/30 p-2 text-center font-medium">79%</td>
                      </tr>
                      <tr>
                        <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Pass Rate</td>
                        <td className="border border-border/30 p-2 text-center">94%</td>
                        <td className="border border-border/30 p-2 text-center">92%</td>
                        <td className="border border-border/30 p-2 text-center">90%</td>
                        <td className="border border-border/30 p-2 text-center font-medium">92%</td>
                      </tr>
                      <tr>
                        <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Distinction Rate</td>
                        <td className="border border-border/30 p-2 text-center">32%</td>
                        <td className="border border-border/30 p-2 text-center">26%</td>
                        <td className="border border-border/30 p-2 text-center">24%</td>
                        <td className="border border-border/30 p-2 text-center font-medium">28%</td>
                      </tr>
                      <tr>
                        <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Attendance Rate</td>
                        <td className="border border-border/30 p-2 text-center">89%</td>
                        <td className="border border-border/30 p-2 text-center">85%</td>
                        <td className="border border-border/30 p-2 text-center">84%</td>
                        <td className="border border-border/30 p-2 text-center font-medium">86%</td>
                      </tr>
                      <tr>
                        <td className="border border-border/30 bg-adminhub-background p-2 font-medium">Project Completion</td>
                        <td className="border border-border/30 p-2 text-center">96%</td>
                        <td className="border border-border/30 p-2 text-center">94%</td>
                        <td className="border border-border/30 p-2 text-center">92%</td>
                        <td className="border border-border/30 p-2 text-center font-medium">94%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="department" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Department Comparison">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="department" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Legend />
                  <Bar dataKey="students" name="Students (×10)" fill="#2979FF" />
                  <Bar dataKey="faculty" name="Faculty" fill="#4CAF50" />
                  <Bar dataKey="research" name="Research Papers" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Student-Faculty Ratio by Department">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={departmentComparisonData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" domain={[0, 25]} stroke="#B0B0B0" />
                  <YAxis dataKey="department" type="category" stroke="#B0B0B0" />
                  <Tooltip 
                    formatter={(value) => [`${value}:1`, 'Student-Faculty Ratio']}
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar 
                    dataKey="ratio" 
                    fill={entry => {
                      if (entry.ratio < 18) return "#4CAF50";
                      if (entry.ratio < 20) return "#FF9800";
                      return "#FF3D00";
                    }} 
                    name="Student-Faculty Ratio"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Department Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Infrastructure', value: 35 },
                          { name: 'Research', value: 25 },
                          { name: 'Faculty Dev', value: 15 },
                          { name: 'Student Activities', value: 15 },
                          { name: 'Misc', value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {[0, 1, 2, 3, 4].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Allocation']}
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                        labelStyle={{ color: '#FFFFFF' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Budget</span>
                    <span className="font-medium">₹2.5 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Utilization</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Research Grants</span>
                    <span className="font-medium">₹65L</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Department Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-adminhub-background rounded-md text-center">
                    <div className="text-xl font-bold text-adminhub-accent">+15%</div>
                    <div className="text-sm text-adminhub-secondary-text">Student Intake</div>
                  </div>
                  <div className="p-4 bg-adminhub-background rounded-md text-center">
                    <div className="text-xl font-bold text-adminhub-accent">+8%</div>
                    <div className="text-sm text-adminhub-secondary-text">Faculty Growth</div>
                  </div>
                  <div className="p-4 bg-adminhub-background rounded-md text-center">
                    <div className="text-xl font-bold text-adminhub-accent">+22%</div>
                    <div className="text-sm text-adminhub-secondary-text">Research Output</div>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">Department Rankings</h3>
                <div className="space-y-3">
                  {[
                    { department: 'Computer Science', ranking: 1, score: 92, change: '+2' },
                    { department: 'Information Technology', ranking: 2, score: 88, change: '0' },
                    { department: 'Electronics & Comm.', ranking: 3, score: 82, change: '+1' },
                    { department: 'Mechanical', ranking: 4, score: 78, change: '-3' },
                    { department: 'Civil', ranking: 5, score: 74, change: '0' },
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-adminhub-background/50 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-adminhub-secondary-text">
                          #{dept.ranking}
                        </div>
                        <div>
                          <div className="font-medium">{dept.department}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-xs">Score: {dept.score}</div>
                            <Badge 
                              variant="outline" 
                              className={
                                dept.change.startsWith('+') 
                                  ? "bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20" 
                                  : dept.change.startsWith('-')
                                    ? "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20"
                                    : "bg-adminhub-secondary-text/10 text-adminhub-secondary-text border-adminhub-secondary-text/20"
                              }
                            >
                              {dept.change}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="w-24">
                        <Progress 
                          value={dept.score} 
                          max={100}
                          className="h-1.5 bg-adminhub-background" 
                          indicatorClassName={
                            dept.ranking === 1 
                              ? "bg-adminhub-success" 
                              : dept.ranking <= 3 
                                ? "bg-adminhub-accent"
                                : "bg-adminhub-secondary-text"
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
