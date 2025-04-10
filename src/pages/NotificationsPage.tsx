
import { useState } from 'react';
import { 
  Bell, 
  Send, 
  Calendar, 
  Users, 
  Clock, 
  Filter, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Megaphone, 
  AlertCircle, 
  Info, 
  CheckCircle,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/DataTable';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Sample announcement data
const announcementData = [
  { 
    id: 1, 
    title: 'Final Exam Schedule Released', 
    content: 'The schedule for final examinations for the current semester has been released. Please check the department notice board or website for details.',
    target: 'All',
    priority: 'High',
    status: 'Published',
    createdBy: 'Dr. Sarah Johnson',
    createdOn: '2025-04-05',
    views: 245,
    scheduled: false
  },
  { 
    id: 2, 
    title: 'Faculty Meeting - April 15', 
    content: 'All faculty members are requested to attend a department meeting on April 15, 2025 at 2:00 PM in the Conference Room.',
    target: 'Faculty',
    priority: 'Medium',
    status: 'Published',
    createdBy: 'Dr. Sarah Johnson',
    createdOn: '2025-04-04',
    views: 42,
    scheduled: false
  },
  { 
    id: 3, 
    title: 'Student Council Elections', 
    content: 'Student Council Elections for the academic year 2025-26 will be held on May 2, 2025. Interested candidates can submit their nominations by April 25.',
    target: 'Students',
    priority: 'Medium',
    status: 'Draft',
    createdBy: 'Dr. Sarah Johnson',
    createdOn: '2025-04-08',
    views: 0,
    scheduled: true,
    scheduledFor: '2025-04-15'
  },
  { 
    id: 4, 
    title: 'New Laboratory Equipment Arrival', 
    content: 'The department has received new equipment for the AI and Machine Learning laboratory. Training sessions will be organized for interested faculty members next week.',
    target: 'Faculty',
    priority: 'Low',
    status: 'Published',
    createdBy: 'Dr. Sarah Johnson',
    createdOn: '2025-04-02',
    views: 38,
    scheduled: false
  },
  { 
    id: 5, 
    title: 'Campus Recruitment Drive', 
    content: 'A major tech company will be conducting a campus recruitment drive for final year students on April 28, 2025. Register by April 20 to participate.',
    target: 'Students',
    priority: 'High',
    status: 'Published',
    createdBy: 'Dr. Sarah Johnson',
    createdOn: '2025-04-03',
    views: 186,
    scheduled: false
  },
  { 
    id: 6, 
    title: 'Department Review Meeting', 
    content: 'Annual department review meeting will be held on May 5, 2025. All faculty members are required to prepare their annual reports.',
    target: 'Faculty',
    priority: 'High',
    status: 'Draft',
    createdBy: 'Dr. Sarah Johnson',
    createdOn: '2025-04-09',
    views: 0,
    scheduled: true,
    scheduledFor: '2025-04-20'
  },
];

// Sample notification categories
const notificationCategories = [
  { id: 'exams', name: 'Examination Updates', icon: BookOpen },
  { id: 'meetings', name: 'Meetings & Events', icon: CalendarCheck },
  { id: 'academic', name: 'Academic Updates', icon: GraduationCap },
  { id: 'general', name: 'General Announcements', icon: Megaphone },
];

const NotificationsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [targetFilter, setTargetFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof announcementData[0] | null>(null);
  
  // New announcement form state
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [target, setTarget] = useState('All');
  const [category, setCategory] = useState('general');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [notifyEmail, setNotifyEmail] = useState(false);
  
  const filteredAnnouncements = announcementData.filter(announcement => {
    const matchesStatus = statusFilter === 'all' || announcement.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesTarget = targetFilter === 'all' || announcement.target === targetFilter;
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesTarget && matchesSearch;
  });
  
  const handleCreateAnnouncement = () => {
    // In a real app, this would add to the database
    console.log({
      title,
      content,
      priority,
      target,
      category,
      isScheduled,
      scheduleDate,
      notifyEmail
    });
    
    // Clear form and close dialog
    setTitle('');
    setContent('');
    setPriority('Medium');
    setTarget('All');
    setCategory('general');
    setIsScheduled(false);
    setScheduleDate(new Date());
    setNotifyEmail(false);
    setIsCreating(false);
  };
  
  const handleViewAnnouncement = (announcement: typeof announcementData[0]) => {
    setSelectedAnnouncement(announcement);
  };
  
  // Utility function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Notifications & Announcements</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Manage Categories
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      {!selectedAnnouncement ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-adminhub-accent mb-2">
                  {announcementData.filter(a => a.status === 'Published').length}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Published</div>
              </div>
            </Card>
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">
                  {announcementData.filter(a => a.status === 'Draft').length}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Drafts</div>
              </div>
            </Card>
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-green-500 mb-2">
                  {announcementData.filter(a => a.scheduled).length}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Scheduled</div>
              </div>
            </Card>
            <Card className="bg-adminhub-surface border-border/30">
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-adminhub-secondary-text mb-2">
                  {announcementData.reduce((acc, curr) => acc + curr.views, 0)}
                </div>
                <div className="text-sm text-adminhub-secondary-text">Total Views</div>
              </div>
            </Card>
          </div>

          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center w-full sm:w-auto space-x-2">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-adminhub-secondary-text" />
                    <Input
                      type="text"
                      placeholder="Search announcements..."
                      className="pl-8 bg-adminhub-background text-adminhub-secondary-text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Select 
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[130px] bg-adminhub-background">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select 
                      value={targetFilter}
                      onValueChange={setTargetFilter}
                    >
                      <SelectTrigger className="w-[130px] bg-adminhub-background">
                        <SelectValue placeholder="All Targets" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        <SelectItem value="all">All Targets</SelectItem>
                        <SelectItem value="Faculty">Faculty</SelectItem>
                        <SelectItem value="Students">Students</SelectItem>
                        <SelectItem value="All">All Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'title', header: 'Title', cell: (announcement) => (
                    <div className="font-medium">{announcement.title}</div>
                  )},
                  { key: 'target', header: 'Target', cell: (announcement) => (
                    <Badge variant="outline" className="bg-adminhub-background">
                      {announcement.target === 'Faculty' ? (
                        <Users className="mr-1 h-3 w-3" />
                      ) : announcement.target === 'Students' ? (
                        <GraduationCap className="mr-1 h-3 w-3" />
                      ) : (
                        <Bell className="mr-1 h-3 w-3" />
                      )}
                      {announcement.target}
                    </Badge>
                  )},
                  { key: 'priority', header: 'Priority', cell: (announcement) => (
                    <Badge 
                      variant="outline" 
                      className={
                        announcement.priority === 'High' 
                          ? "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20" 
                          : announcement.priority === 'Medium'
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-adminhub-secondary-text/10 text-adminhub-secondary-text border-adminhub-secondary-text/20"
                      }
                    >
                      {announcement.priority}
                    </Badge>
                  )},
                  { key: 'status', header: 'Status', cell: (announcement) => (
                    <div>
                      {announcement.status === 'Published' ? (
                        <Badge className="bg-adminhub-success hover:bg-adminhub-success">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          Draft
                        </Badge>
                      )}
                      {announcement.scheduled && (
                        <div className="mt-1 text-xs flex items-center text-adminhub-secondary-text">
                          <Clock className="mr-1 h-3 w-3" />
                          Scheduled: {formatDate(announcement.scheduledFor || '')}
                        </div>
                      )}
                    </div>
                  )},
                  { key: 'createdOn', header: 'Date', cell: (announcement) => (
                    <div className="text-sm">{formatDate(announcement.createdOn)}</div>
                  )},
                  { key: 'views', header: 'Views', cell: (announcement) => (
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1 text-adminhub-secondary-text" />
                      {announcement.views}
                    </div>
                  )},
                  { key: 'actions', header: 'Actions', cell: (announcement) => (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewAnnouncement(announcement)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4 text-adminhub-secondary-text" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-adminhub-error" />
                      </Button>
                    </div>
                  )},
                ]}
                data={filteredAnnouncements}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-adminhub-surface border-border/30 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-medium">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcementData
                    .filter(a => a.status === 'Published')
                    .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
                    .slice(0, 3)
                    .map((announcement) => (
                      <div key={announcement.id} className="p-4 bg-adminhub-background rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2 items-center">
                            {announcement.priority === 'High' ? (
                              <AlertCircle className="h-5 w-5 text-adminhub-error flex-shrink-0" />
                            ) : announcement.priority === 'Medium' ? (
                              <Info className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                            ) : (
                              <Bell className="h-5 w-5 text-adminhub-secondary-text flex-shrink-0" />
                            )}
                            <h3 className="font-medium">{announcement.title}</h3>
                          </div>
                          <Badge variant="outline" className="bg-adminhub-background">
                            {announcement.target}
                          </Badge>
                        </div>
                        <p className="text-sm text-adminhub-secondary-text mb-3">
                          {announcement.content.length > 150 
                            ? `${announcement.content.substring(0, 150)}...` 
                            : announcement.content}
                        </p>
                        <div className="flex justify-between items-center text-xs text-adminhub-secondary-text">
                          <div>
                            Posted by {announcement.createdBy} on {formatDate(announcement.createdOn)}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {announcement.views} views
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-base font-medium">Scheduled Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={new Date()}
                  className="border border-border/30 rounded-md mb-4"
                />
                
                <div className="space-y-3">
                  {announcementData
                    .filter(a => a.scheduled)
                    .map((announcement) => (
                      <div key={announcement.id} className="p-3 bg-adminhub-background/50 rounded-md border-l-2 border-l-yellow-500 flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-adminhub-secondary-text mr-2 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">{announcement.title}</div>
                            <div className="text-xs text-adminhub-secondary-text">
                              {formatDate(announcement.scheduledFor || '')}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                  {announcementData.filter(a => a.scheduled).length === 0 && (
                    <div className="text-center py-4 text-adminhub-secondary-text">
                      No scheduled announcements
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card className="bg-adminhub-surface border-border/30">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {selectedAnnouncement.priority === 'High' ? (
                      <AlertCircle className="h-5 w-5 text-adminhub-error" />
                    ) : selectedAnnouncement.priority === 'Medium' ? (
                      <Info className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Bell className="h-5 w-5 text-adminhub-secondary-text" />
                    )}
                    <h2 className="text-xl font-bold">{selectedAnnouncement.title}</h2>
                  </div>
                  <p className="text-adminhub-secondary-text">
                    Posted by {selectedAnnouncement.createdBy} on {formatDate(selectedAnnouncement.createdOn)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={
                      selectedAnnouncement.priority === 'High' 
                        ? "bg-adminhub-error/10 text-adminhub-error border-adminhub-error/20" 
                        : selectedAnnouncement.priority === 'Medium'
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-adminhub-secondary-text/10 text-adminhub-secondary-text border-adminhub-secondary-text/20"
                    }
                  >
                    {selectedAnnouncement.priority} Priority
                  </Badge>
                  {selectedAnnouncement.status === 'Published' ? (
                    <Badge className="bg-adminhub-success hover:bg-adminhub-success">
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                      Draft
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="p-6 bg-adminhub-background rounded-lg">
                <p className="leading-relaxed">{selectedAnnouncement.content}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col p-4 bg-adminhub-background rounded-md">
                  <span className="text-sm text-adminhub-secondary-text">Target Audience</span>
                  <div className="flex items-center mt-1">
                    {selectedAnnouncement.target === 'Faculty' ? (
                      <Users className="h-4 w-4 mr-2 text-adminhub-accent" />
                    ) : selectedAnnouncement.target === 'Students' ? (
                      <GraduationCap className="h-4 w-4 mr-2 text-adminhub-accent" />
                    ) : (
                      <Bell className="h-4 w-4 mr-2 text-adminhub-accent" />
                    )}
                    <span className="font-medium">{selectedAnnouncement.target}</span>
                  </div>
                </div>
                
                <div className="flex flex-col p-4 bg-adminhub-background rounded-md">
                  <span className="text-sm text-adminhub-secondary-text">Views</span>
                  <div className="flex items-center mt-1">
                    <Eye className="h-4 w-4 mr-2 text-adminhub-accent" />
                    <span className="font-medium">{selectedAnnouncement.views}</span>
                  </div>
                </div>
                
                <div className="flex flex-col p-4 bg-adminhub-background rounded-md">
                  <span className="text-sm text-adminhub-secondary-text">Status</span>
                  <div className="flex items-center mt-1">
                    {selectedAnnouncement.scheduled ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="font-medium">Scheduled for {formatDate(selectedAnnouncement.scheduledFor || '')}</span>
                      </>
                    ) : selectedAnnouncement.status === 'Published' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-adminhub-success" />
                        <span className="font-medium">Published</span>
                      </>
                    ) : (
                      <>
                        <Info className="h-4 w-4 mr-2 text-yellow-500" />
                        <span className="font-medium">Draft</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
                <Button variant="outline" onClick={() => setSelectedAnnouncement(null)}>
                  Back to List
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                {selectedAnnouncement.status === 'Draft' && (
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Publish Now
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="bg-adminhub-surface text-adminhub-primary-text max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription className="text-adminhub-secondary-text">
              Fill in the details below to create a new announcement.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="compose">
            <TabsList className="bg-adminhub-background mb-4">
              <TabsTrigger value="compose">
                <Megaphone className="h-4 w-4 mr-2" />
                Compose
              </TabsTrigger>
              <TabsTrigger value="schedule">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="audience">
                <Users className="h-4 w-4 mr-2" />
                Audience
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="compose" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-adminhub-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="bg-adminhub-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-adminhub-surface border-border">
                    {notificationCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center">
                          <cat.icon className="h-4 w-4 mr-2" />
                          {cat.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <RadioGroup 
                  value={priority}
                  onValueChange={setPriority}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="High" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter announcement content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-adminhub-background min-h-[150px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="schedule-toggle" 
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
                <Label htmlFor="schedule-toggle">Schedule this announcement</Label>
              </div>
              
              {isScheduled && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <div className="border border-border/30 rounded-md p-3 bg-adminhub-background">
                      <CalendarComponent
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select>
                      <SelectTrigger id="time" className="bg-adminhub-background">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        {Array.from({ length: 24 }).map((_, hour) => (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Audience</Label>
                <RadioGroup 
                  value={target}
                  onValueChange={setTarget}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-3 bg-adminhub-background rounded-md">
                    <RadioGroupItem value="All" id="all" />
                    <Label htmlFor="all" className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      All Users
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-adminhub-background rounded-md">
                    <RadioGroupItem value="Faculty" id="faculty" />
                    <Label htmlFor="faculty" className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Faculty Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-adminhub-background rounded-md">
                    <RadioGroupItem value="Students" id="students" />
                    <Label htmlFor="students" className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Students Only
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="email-notification" 
                  checked={notifyEmail}
                  onCheckedChange={setNotifyEmail}
                />
                <Label htmlFor="email-notification">
                  Also send as email notification
                </Label>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button onClick={handleCreateAnnouncement}>
              {isScheduled ? (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
