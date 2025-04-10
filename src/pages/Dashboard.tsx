
import { 
  Users, 
  GraduationCap, 
  BarChart3, 
  FileCheck, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { DataTable } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample data for charts
const attendanceData = [
  { month: 'Jan', CSE: 85, IT: 78, ECE: 82 },
  { month: 'Feb', CSE: 83, IT: 80, ECE: 79 },
  { month: 'Mar', CSE: 86, IT: 82, ECE: 84 },
  { month: 'Apr', CSE: 89, IT: 85, ECE: 86 },
  { month: 'May', CSE: 87, IT: 83, ECE: 88 },
  { month: 'Jun', CSE: 90, IT: 87, ECE: 89 },
];

const performanceData = [
  { subject: 'Database', above90: 15, above75: 30, above60: 40, below60: 15 },
  { subject: 'Algorithms', above90: 10, above75: 25, above60: 45, below60: 20 },
  { subject: 'Networking', above90: 18, above75: 32, above60: 35, below60: 15 },
  { subject: 'AI', above90: 20, above75: 35, above60: 30, below60: 15 },
];

const facultyWorkload = [
  { name: 'Dr. A. Kumar', workload: 18, average: 16 },
  { name: 'Prof. S. Gupta', workload: 16, average: 16 },
  { name: 'Dr. M. Singh', workload: 15, average: 16 },
  { name: 'Dr. P. Shah', workload: 20, average: 16 },
  { name: 'Prof. K. Mehta', workload: 14, average: 16 },
];

// Sample data for tables
const announcementData = [
  { id: 1, title: 'Final Exam Schedule Released', date: '2025-05-01', priority: 'High' },
  { id: 2, title: 'Faculty Meeting', date: '2025-04-15', priority: 'Medium' },
  { id: 3, title: 'Department Review', date: '2025-04-20', priority: 'Low' },
];

const materialData = [
  { id: 1, title: 'Machine Learning Notes', uploader: 'Dr. A. Kumar', date: '2025-04-02' },
  { id: 2, title: 'Database Lab Manual', uploader: 'Prof. S. Gupta', date: '2025-04-01' },
  { id: 3, title: 'Java Programming Tutorial', uploader: 'Dr. M. Singh', date: '2025-03-30' },
];

const leaveRequestData = [
  { id: 1, faculty: 'Dr. A. Kumar', type: 'Medical', from: '2025-04-15', to: '2025-04-18', status: 'Pending' },
  { id: 2, faculty: 'Prof. S. Gupta', type: 'Personal', from: '2025-04-20', to: '2025-04-21', status: 'Pending' },
  { id: 3, faculty: 'Dr. P. Shah', type: 'Conference', from: '2025-05-01', to: '2025-05-05', status: 'Pending' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm">Last 7 days</Button>
          <Button variant="outline" size="sm">Last 30 days</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-grid">
        <StatCard 
          title="Total Faculty" 
          value={42}
          icon={<Users size={20} />}
          trend={{ value: 5, isPositive: true }}
          variant="info"
        />
        <StatCard 
          title="Total Students" 
          value={1248}
          icon={<GraduationCap size={20} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Average Attendance" 
          value="86%"
          icon={<BarChart3 size={20} />}
          trend={{ value: 3, isPositive: true }}
          variant="success"
        />
        <StatCard 
          title="Leave Requests" 
          value={6}
          icon={<FileCheck size={20} />}
          trend={{ value: 2, isPositive: false }}
          variant="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Attendance Trends">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#B0B0B0" />
              <YAxis stroke="#B0B0B0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Legend />
              <Line type="monotone" dataKey="CSE" stroke="#2979FF" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="IT" stroke="#4CAF50" />
              <Line type="monotone" dataKey="ECE" stroke="#FF3D00" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Student Performance Summary">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="subject" stroke="#B0B0B0" />
              <YAxis stroke="#B0B0B0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Legend />
              <Bar dataKey="above90" stackId="a" fill="#4CAF50" />
              <Bar dataKey="above75" stackId="a" fill="#2979FF" />
              <Bar dataKey="above60" stackId="a" fill="#FFC107" />
              <Bar dataKey="below60" stackId="a" fill="#FF3D00" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Faculty Workload Analysis">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={facultyWorkload}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#B0B0B0" />
              <YAxis stroke="#B0B0B0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Legend />
              <Bar dataKey="workload" fill="#2979FF" />
              <Bar dataKey="average" fill="#B0B0B0" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-adminhub-surface border-border/30">
          <CardHeader>
            <CardTitle className="text-base font-medium">Latest Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={[
                { key: 'title', header: 'Title', cell: (row) => (
                  <div className="font-medium">{row.title}</div>
                )},
                { key: 'date', header: 'Date' },
                { key: 'priority', header: 'Priority', cell: (row) => (
                  <Badge 
                    variant={
                      row.priority === 'High' ? 'destructive' : 
                      row.priority === 'Medium' ? 'default' : 'secondary'
                    }
                  >
                    {row.priority}
                  </Badge>
                )},
              ]}
              data={announcementData}
            />
            <Button variant="link" className="mt-4 text-adminhub-accent">
              View All Announcements
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-adminhub-surface border-border/30">
          <CardHeader>
            <CardTitle className="text-base font-medium">Recently Uploaded Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={[
                { key: 'title', header: 'Title', cell: (row) => (
                  <div className="font-medium">{row.title}</div>
                )},
                { key: 'uploader', header: 'Uploaded By' },
                { key: 'date', header: 'Date' },
              ]}
              data={materialData}
            />
            <Button variant="link" className="mt-4 text-adminhub-accent">
              View All Materials
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-adminhub-surface border-border/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Pending Leave Requests</CardTitle>
            <Badge variant="outline" className="bg-adminhub-background">
              <AlertCircle className="h-3.5 w-3.5 mr-1" />
              {leaveRequestData.length} pending
            </Badge>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={[
                { key: 'faculty', header: 'Faculty' },
                { key: 'type', header: 'Leave Type' },
                { key: 'from', header: 'From Date' },
                { key: 'to', header: 'To Date' },
                { key: 'status', header: 'Status', cell: (row) => (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                    {row.status}
                  </Badge>
                )},
                { key: 'actions', header: 'Actions', cell: () => (
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" className="bg-adminhub-success hover:bg-adminhub-success/80">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </div>
                )},
              ]}
              data={leaveRequestData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
