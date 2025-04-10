
import { useState } from 'react';
import { 
  ClipboardCheck, 
  Calendar, 
  Filter, 
  Check, 
  X, 
  FileText, 
  Download, 
  Clock, 
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/DataTable';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Sample leave requests data
const leaveRequestsData = [
  { 
    id: 1, 
    faculty: 'Dr. Anita Kumar', 
    type: 'Medical', 
    from: '2025-04-15', 
    to: '2025-04-18', 
    days: 4,
    reason: 'Medical treatment and recovery',
    status: 'Pending',
    appliedOn: '2025-04-10',
    documents: true
  },
  { 
    id: 2, 
    faculty: 'Prof. Sanjay Gupta', 
    type: 'Personal', 
    from: '2025-04-20', 
    to: '2025-04-21', 
    days: 2,
    reason: 'Family function',
    status: 'Pending',
    appliedOn: '2025-04-08',
    documents: false
  },
  { 
    id: 3, 
    faculty: 'Dr. Priya Shah', 
    type: 'Conference', 
    from: '2025-05-01', 
    to: '2025-05-05', 
    days: 5,
    reason: 'International Conference on Computer Science',
    status: 'Pending',
    appliedOn: '2025-04-05',
    documents: true
  },
  { 
    id: 4, 
    faculty: 'Dr. Manisha Singh', 
    type: 'Casual', 
    from: '2025-04-25', 
    to: '2025-04-25', 
    days: 1,
    reason: 'Personal work',
    status: 'Approved',
    appliedOn: '2025-04-02',
    documents: false,
    approvedOn: '2025-04-03',
    approvedBy: 'Dr. Sarah Johnson'
  },
  { 
    id: 5, 
    faculty: 'Prof. Karan Mehta', 
    type: 'Medical', 
    from: '2025-04-12', 
    to: '2025-04-14', 
    days: 3,
    reason: 'Hospitalization due to fever',
    status: 'Approved',
    appliedOn: '2025-04-01',
    documents: true,
    approvedOn: '2025-04-01',
    approvedBy: 'Dr. Sarah Johnson'
  },
  { 
    id: 6, 
    faculty: 'Dr. Anita Kumar', 
    type: 'Casual', 
    from: '2025-03-18', 
    to: '2025-03-18', 
    days: 1,
    reason: 'Personal work',
    status: 'Rejected',
    appliedOn: '2025-03-15',
    documents: false,
    rejectedOn: '2025-03-16',
    rejectedBy: 'Dr. Sarah Johnson',
    rejectionReason: 'Important faculty meeting scheduled'
  },
];

// Stats for leave types
const leaveTypeStats = [
  { name: 'Medical', value: 7 },
  { name: 'Casual', value: 12 },
  { name: 'Personal', value: 5 },
  { name: 'Conference', value: 3 },
  { name: 'Others', value: 2 },
];

// Stats for monthly leave trends
const monthlyLeaveStats = [
  { name: 'Jan', value: 8 },
  { name: 'Feb', value: 6 },
  { name: 'Mar', value: 9 },
  { name: 'Apr', value: 12 },
  { name: 'May', value: 4 },
  { name: 'Jun', value: 7 },
];

const COLORS = ['#2979FF', '#4CAF50', '#FF9800', '#9C27B0', '#F44336'];

const LeaveApprovals = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedLeave, setSelectedLeave] = useState<typeof leaveRequestsData[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  
  const filteredLeaves = leaveRequestsData.filter(leave => {
    const matchesStatus = statusFilter === 'all' || leave.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || leave.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesStatus && matchesType;
  });
  
  const handleApproveLeave = (leave: typeof leaveRequestsData[0]) => {
    // In a real app, this would update the backend
    console.log('Approving leave:', leave);
  };
  
  const handleShowRejectionDialog = (leave: typeof leaveRequestsData[0]) => {
    setSelectedLeave(leave);
    setShowRejectionDialog(true);
  };
  
  const handleRejectLeave = () => {
    if (!selectedLeave) return;
    
    // In a real app, this would update the backend
    console.log('Rejecting leave:', selectedLeave, 'Reason:', rejectionReason);
    
    setShowRejectionDialog(false);
    setRejectionReason('');
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to render leave details view
  const renderLeaveDetails = (leave: typeof leaveRequestsData[0]) => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{leave.faculty}</h2>
            <p className="text-adminhub-secondary-text">
              Leave Request #{leave.id} | Applied on {formatDate(leave.appliedOn)}
            </p>
          </div>
          <Badge 
            className={
              leave.status === 'Pending' 
                ? "bg-yellow-500 hover:bg-yellow-500"
                : leave.status === 'Approved'
                  ? "bg-adminhub-success hover:bg-adminhub-success"
                  : "bg-adminhub-error hover:bg-adminhub-error"
            }
          >
            {leave.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-adminhub-background rounded-md">
              <span className="text-adminhub-secondary-text">Leave Type</span>
              <span className="font-medium">{leave.type}</span>
            </div>
            <div className="flex justify-between p-3 bg-adminhub-background rounded-md">
              <span className="text-adminhub-secondary-text">From Date</span>
              <span className="font-medium">{formatDate(leave.from)}</span>
            </div>
            <div className="flex justify-between p-3 bg-adminhub-background rounded-md">
              <span className="text-adminhub-secondary-text">To Date</span>
              <span className="font-medium">{formatDate(leave.to)}</span>
            </div>
            <div className="flex justify-between p-3 bg-adminhub-background rounded-md">
              <span className="text-adminhub-secondary-text">Duration</span>
              <span className="font-medium">{leave.days} day(s)</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-adminhub-background rounded-md">
              <div className="text-adminhub-secondary-text mb-1">Reason</div>
              <div>{leave.reason}</div>
            </div>
            <div className="p-3 bg-adminhub-background rounded-md">
              <div className="text-adminhub-secondary-text mb-1">Supporting Documents</div>
              <div className="flex items-center">
                {leave.documents ? (
                  <Badge variant="outline" className="bg-adminhub-accent/10 text-adminhub-accent border-adminhub-accent/20">
                    <FileText className="mr-1 h-3 w-3" /> Documents Attached
                  </Badge>
                ) : (
                  <span className="text-adminhub-secondary-text">No documents attached</span>
                )}
                {leave.documents && (
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Download className="h-4 w-4 mr-1" /> View
                  </Button>
                )}
              </div>
            </div>
            
            {leave.status === 'Approved' && (
              <div className="p-3 bg-adminhub-success/10 text-adminhub-success rounded-md">
                <div className="font-medium mb-1">Approved by {leave.approvedBy}</div>
                <div className="text-sm">on {formatDate(leave.approvedOn || '')}</div>
              </div>
            )}
            
            {leave.status === 'Rejected' && (
              <div className="p-3 bg-adminhub-error/10 text-adminhub-error rounded-md">
                <div className="font-medium mb-1">Rejected by {leave.rejectedBy}</div>
                <div className="text-sm">on {formatDate(leave.rejectedOn || '')}</div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Reason: </span>
                  {leave.rejectionReason}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {leave.status === 'Pending' && (
          <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
            <Button variant="outline" onClick={() => setSelectedLeave(null)}>
              Back to List
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleShowRejectionDialog(leave)}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              variant="default" 
              className="bg-adminhub-success hover:bg-adminhub-success/90"
              onClick={() => handleApproveLeave(leave)}
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Leave Approvals</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {!selectedLeave ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-adminhub-accent mb-2">
                  {leaveRequestsData.filter(l => l.status === 'Pending').length}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Pending Requests</div>
              </div>
            </Card>
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-adminhub-success mb-2">
                  {leaveRequestsData.filter(l => l.status === 'Approved').length}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Approved</div>
              </div>
            </Card>
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-adminhub-error mb-2">
                  {leaveRequestsData.filter(l => l.status === 'Rejected').length}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Rejected</div>
              </div>
            </Card>
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-adminhub-secondary-text mb-2">
                  {leaveRequestsData.reduce((acc, curr) => acc + curr.days, 0)}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Total Leave Days</div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Leave Requests</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-adminhub-secondary-text" />
                    <Select 
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[130px] h-8 text-xs bg-adminhub-background">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select 
                      value={typeFilter}
                      onValueChange={setTypeFilter}
                    >
                      <SelectTrigger className="w-[130px] h-8 text-xs bg-adminhub-background">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { key: 'faculty', header: 'Faculty', cell: (leave) => (
                      <div className="font-medium">{leave.faculty}</div>
                    )},
                    { key: 'type', header: 'Type', cell: (leave) => (
                      <Badge variant="outline" className="bg-adminhub-background">
                        {leave.type}
                      </Badge>
                    )},
                    { key: 'from', header: 'From', cell: (leave) => formatDate(leave.from) },
                    { key: 'to', header: 'To', cell: (leave) => formatDate(leave.to) },
                    { key: 'days', header: 'Days', className: "text-center" },
                    { key: 'status', header: 'Status', cell: (leave) => (
                      <div className="flex items-center">
                        {leave.status === 'Pending' ? (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            <AlertCircle className="mr-1 h-3 w-3" /> Pending
                          </Badge>
                        ) : leave.status === 'Approved' ? (
                          <Badge variant="outline" className="bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20">
                            <CheckCircle className="mr-1 h-3 w-3" /> Approved
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20">
                            <XCircle className="mr-1 h-3 w-3" /> Rejected
                          </Badge>
                        )}
                      </div>
                    )},
                    { key: 'actions', header: 'Actions', cell: (leave) => (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLeave(leave)}
                        >
                          View
                        </Button>
                        {leave.status === 'Pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-adminhub-success hover:text-adminhub-success/90 hover:bg-adminhub-success/10"
                              onClick={() => handleApproveLeave(leave)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-adminhub-error hover:text-adminhub-error/90 hover:bg-adminhub-error/10"
                              onClick={() => handleShowRejectionDialog(leave)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    )},
                  ]}
                  data={filteredLeaves}
                  emptyMessage="No leave requests match the selected filters"
                />
              </CardContent>
            </Card>
            
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Leave Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border border-border/30 rounded-md"
                />
                
                <div className="mt-4 space-y-3">
                  <h3 className="font-medium">
                    {selectedDate && selectedDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-adminhub-background/50 rounded-md border-l-2 border-l-adminhub-accent flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-adminhub-secondary-text mr-2" />
                        <div>
                          <div className="text-sm font-medium">Prof. Sanjay Gupta</div>
                          <div className="text-xs text-adminhub-secondary-text">Personal Leave</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        Pending
                      </Badge>
                    </div>
                    
                    <div className="p-3 bg-adminhub-background/50 rounded-md border-l-2 border-l-adminhub-success flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-adminhub-secondary-text mr-2" />
                        <div>
                          <div className="text-sm font-medium">Dr. Manisha Singh</div>
                          <div className="text-xs text-adminhub-secondary-text">Casual Leave</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-adminhub-success/10 text-adminhub-success border-adminhub-success/20">
                        Approved
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Leave Types Distribution">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leaveTypeStats}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leaveTypeStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} leaves`, 'Count']}
                      contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                      labelStyle={{ color: '#FFFFFF' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {leaveTypeStats.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-1 rounded-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span className="text-xs">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
            
            <ChartCard title="Monthly Leave Trends">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyLeaveStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#B0B0B0" />
                  <YAxis stroke="#B0B0B0" />
                  <Tooltip 
                    formatter={(value) => [`${value} leaves`, 'Count']}
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                    labelStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar dataKey="value" fill="#2979FF" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>
      ) : (
        <Card className="bg-adminhub-surface border-border/30">
          <CardContent className="pt-6">
            {renderLeaveDetails(selectedLeave)}
          </CardContent>
        </Card>
      )}
      
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent className="bg-adminhub-surface text-adminhub-primary-text">
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription className="text-adminhub-secondary-text">
              Please provide a reason for rejecting this leave request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="reason" className="mb-2 block">Rejection Reason</Label>
            <Textarea 
              id="reason"
              placeholder="Enter reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="bg-adminhub-background"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectLeave}
              disabled={!rejectionReason.trim()}
            >
              Reject Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveApprovals;
