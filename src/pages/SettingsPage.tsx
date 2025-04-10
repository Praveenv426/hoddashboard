
import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Key, 
  Smartphone, 
  Mail, 
  Save, 
  UserCog, 
  Building, 
  UsersRound,
  Lock,
  FileEdit,
  EyeOff,
  Palette,
  Moon,
  Sun
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SettingsPage = () => {
  // Profile settings state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState('Dr. Sarah Johnson');
  const [email, setEmail] = useState('sarah.johnson@example.edu');
  const [phone, setPhone] = useState('+91 98765 12345');
  const [department, setDepartment] = useState('Computer Science');
  const [bio, setBio] = useState('Professor and Head of Department for Computer Science with over 15 years of teaching and research experience. Specializes in Data Science and Artificial Intelligence.');
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [leaveAlerts, setLeaveAlerts] = useState(true);
  const [performanceReports, setPerformanceReports] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);
  
  // Department settings state
  const [departmentName, setDepartmentName] = useState('Computer Science');
  const [departmentCode, setDepartmentCode] = useState('CSE');
  const [departmentEmail, setDepartmentEmail] = useState('cse.hod@example.edu');
  const [officeRoom, setOfficeRoom] = useState('A-301');
  const [officeHours, setOfficeHours] = useState('Mon-Fri: 2:00 PM - 4:00 PM');
  
  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  
  // Appearance settings state
  const [themeMode, setThemeMode] = useState('dark');
  const [accentColor, setAccentColor] = useState('blue');
  const [compactMode, setCompactMode] = useState(false);
  
  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle saving profile changes
  const handleSaveProfile = () => {
    // This would typically call an API to save changes
    console.log('Saving profile changes:', {
      fullName,
      email,
      phone,
      department,
      bio
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Settings & Profile Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserCog className="mr-2 h-4 w-4" />
            Admin Panel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-adminhub-surface w-full justify-start overflow-auto">
          <TabsTrigger value="profile" className="data-[state=active]:bg-adminhub-accent">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="department" className="data-[state=active]:bg-adminhub-accent">
            <Building className="h-4 w-4 mr-2" />
            Department Info
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-adminhub-accent">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-adminhub-accent">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-adminhub-accent">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-adminhub-accent">
            <UsersRound className="h-4 w-4 mr-2" />
            Role Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Update your personal details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-auto flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-adminhub-accent flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-16 w-16" />
                      )}
                    </div>
                    <label htmlFor="profileImage" className="absolute -bottom-2 -right-2 p-2 rounded-full bg-adminhub-background border border-border cursor-pointer">
                      <FileEdit className="h-4 w-4" />
                      <span className="sr-only">Change profile image</span>
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-adminhub-secondary-text">
                      Upload a profile picture (JPG, PNG)
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-adminhub-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger className="bg-adminhub-background">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-adminhub-surface border-border">
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Electronics">Electronics & Communication</SelectItem>
                          <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                          <SelectItem value="Civil">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-adminhub-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-adminhub-background"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio / Professional Summary</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="resize-none bg-adminhub-background"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-lg">Academic Information</CardTitle>
                <CardDescription className="text-adminhub-secondary-text">
                  Your academic qualifications and professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification</Label>
                  <Select defaultValue="PhD">
                    <SelectTrigger id="qualification" className="bg-adminhub-background">
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="Masters">Masters</SelectItem>
                      <SelectItem value="Bachelors">Bachelors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    defaultValue="Artificial Intelligence & Data Science"
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    defaultValue="15"
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faculty-id">Faculty ID</Label>
                  <Input
                    id="faculty-id"
                    defaultValue="FAC-CS-001"
                    className="bg-adminhub-background"
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="join-date">Joining Date</Label>
                  <Input
                    id="join-date"
                    type="date"
                    defaultValue="2010-07-15"
                    className="bg-adminhub-background"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-adminhub-surface border-border/30">
              <CardHeader>
                <CardTitle className="text-lg">Additional Information</CardTitle>
                <CardDescription className="text-adminhub-secondary-text">
                  Other relevant details and professional links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="research-interests">Research Interests</Label>
                  <Textarea
                    id="research-interests"
                    defaultValue="Machine Learning, Data Mining, Computer Vision, Natural Language Processing"
                    className="resize-none bg-adminhub-background"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://sarahjohnson.example.com"
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scholar">Google Scholar Profile</Label>
                  <Input
                    id="scholar"
                    type="url"
                    defaultValue="https://scholar.google.com/example"
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    defaultValue="https://linkedin.com/in/sarahjohnson"
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publications">Recent Publications</Label>
                  <Input
                    id="publications"
                    defaultValue="32"
                    className="bg-adminhub-background"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="department" className="space-y-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Department Information</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Update department details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departmentName">Department Name</Label>
                  <Input
                    id="departmentName"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="departmentCode">Department Code</Label>
                  <Input
                    id="departmentCode"
                    value={departmentCode}
                    onChange={(e) => setDepartmentCode(e.target.value)}
                    className="bg-adminhub-background"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departmentEmail">Department Email</Label>
                  <Input
                    id="departmentEmail"
                    type="email"
                    value={departmentEmail}
                    onChange={(e) => setDepartmentEmail(e.target.value)}
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    defaultValue="+91 22 5555 9999"
                    className="bg-adminhub-background"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="officeRoom">Office Room Number</Label>
                  <Input
                    id="officeRoom"
                    value={officeRoom}
                    onChange={(e) => setOfficeRoom(e.target.value)}
                    className="bg-adminhub-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="officeHours">Office Hours</Label>
                  <Input
                    id="officeHours"
                    value={officeHours}
                    onChange={(e) => setOfficeHours(e.target.value)}
                    className="bg-adminhub-background"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departmentDescription">Department Description</Label>
                <Textarea
                  id="departmentDescription"
                  defaultValue="The Department of Computer Science offers undergraduate and graduate programs focused on software development, artificial intelligence, data science, cybersecurity, and computer networks. Our faculty members are engaged in cutting-edge research and provide students with practical, industry-relevant education."
                  rows={4}
                  className="resize-none bg-adminhub-background"
                />
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Department Statistics</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-adminhub-background rounded-md">
                    <div className="text-sm text-adminhub-secondary-text mb-1">Faculty Members</div>
                    <div className="text-2xl font-bold">42</div>
                  </div>
                  
                  <div className="p-4 bg-adminhub-background rounded-md">
                    <div className="text-sm text-adminhub-secondary-text mb-1">Students</div>
                    <div className="text-2xl font-bold">1,248</div>
                  </div>
                  
                  <div className="p-4 bg-adminhub-background rounded-md">
                    <div className="text-sm text-adminhub-secondary-text mb-1">Courses Offered</div>
                    <div className="text-2xl font-bold">38</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Department Info
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Department Faculty</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Manage faculty roles and permissions within the department
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">Current Faculty Members</h3>
                  <p className="text-sm text-adminhub-secondary-text">Total: 42 members</p>
                </div>
                <Button variant="outline" size="sm">
                  <UsersRound className="mr-2 h-4 w-4" />
                  Manage Faculty
                </Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'Dr. Anita Kumar', role: 'Professor', subjects: ['Database Systems', 'Data Structures'] },
                  { name: 'Prof. Sanjay Gupta', role: 'Associate Professor', subjects: ['Web Development', 'Computer Networks'] },
                  { name: 'Dr. Manisha Singh', role: 'Professor', subjects: ['Artificial Intelligence', 'Machine Learning'] },
                  { name: 'Dr. Priya Shah', role: 'Assistant Professor', subjects: ['Operating Systems', 'Computer Networks'] },
                ].map((faculty, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-adminhub-background rounded-md">
                    <div>
                      <div className="font-medium">{faculty.name}</div>
                      <div className="text-xs text-adminhub-secondary-text">{faculty.role}</div>
                      <div className="flex gap-1 mt-1">
                        {faculty.subjects.map((subject, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-adminhub-surface/50">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Faculty Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Control how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Channels</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-adminhub-accent" />
                      <div>
                        <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                        <p className="text-sm text-adminhub-secondary-text">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-adminhub-accent" />
                      <div>
                        <Label htmlFor="sms-notifications" className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-adminhub-secondary-text">Receive important alerts as text messages</p>
                      </div>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-adminhub-accent" />
                      <div>
                        <Label htmlFor="browser-notifications" className="text-base">Browser Notifications</Label>
                        <p className="text-sm text-adminhub-secondary-text">Show desktop notifications when in the app</p>
                      </div>
                    </div>
                    <Switch
                      id="browser-notifications"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Types</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="leave-alerts" className="text-base">Leave Request Alerts</Label>
                      <p className="text-sm text-adminhub-secondary-text">New leave requests and status updates</p>
                    </div>
                    <Switch
                      id="leave-alerts"
                      checked={leaveAlerts}
                      onCheckedChange={setLeaveAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="performance-reports" className="text-base">Performance Reports</Label>
                      <p className="text-sm text-adminhub-secondary-text">Periodic faculty and student performance updates</p>
                    </div>
                    <Switch
                      id="performance-reports"
                      checked={performanceReports}
                      onCheckedChange={setPerformanceReports}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-updates" className="text-base">System Updates</Label>
                      <p className="text-sm text-adminhub-secondary-text">Updates about system maintenance and new features</p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={systemUpdates}
                      onCheckedChange={setSystemUpdates}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dept-announcements" className="text-base">Department Announcements</Label>
                      <p className="text-sm text-adminhub-secondary-text">Important announcements from the department</p>
                    </div>
                    <Switch
                      id="dept-announcements"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Email Notification Settings</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-frequency">Email Digest Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="email-frequency" className="bg-adminhub-background">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-time">Preferred Time for Digests</Label>
                    <Select defaultValue="morning">
                      <SelectTrigger id="email-time" className="bg-adminhub-background">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-adminhub-surface border-border">
                        <SelectItem value="morning">Morning (9 AM)</SelectItem>
                        <SelectItem value="noon">Noon (12 PM)</SelectItem>
                        <SelectItem value="evening">Evening (6 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Account Security</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Manage your password and account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Password Management</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter your current password"
                      className="bg-adminhub-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter your new password"
                      className="bg-adminhub-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your new password"
                      className="bg-adminhub-background"
                    />
                  </div>
                </div>
                
                <div className="bg-adminhub-background p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Password Requirements</h4>
                  <ul className="space-y-1 text-xs text-adminhub-secondary-text">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-adminhub-secondary-text mr-2"></div>
                      Minimum 8 characters
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-adminhub-secondary-text mr-2"></div>
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-adminhub-secondary-text mr-2"></div>
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-adminhub-secondary-text mr-2"></div>
                      At least one special character
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor" className="text-base">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-adminhub-secondary-text">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                
                {twoFactorEnabled && (
                  <div className="bg-adminhub-background p-4 rounded-md space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Two-Factor Method</h4>
                      <RadioGroup defaultValue="app">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="app" id="app" />
                          <Label htmlFor="app">Authenticator App</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sms" id="sms" />
                          <Label htmlFor="sms">SMS Verification</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email">Email Verification</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button size="sm">
                      Set Up Two-Factor Authentication
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Security Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-alerts" className="text-base">Login Alerts</Label>
                    <p className="text-sm text-adminhub-secondary-text">Get notified of new logins to your account</p>
                  </div>
                  <Switch
                    id="login-alerts"
                    checked={loginAlerts}
                    onCheckedChange={setLoginAlerts}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger id="session-timeout" className="bg-adminhub-background">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Active Sessions</Label>
                  <div className="p-3 bg-adminhub-background rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-xs text-adminhub-secondary-text">Chrome on Windows - Mumbai, India</div>
                      </div>
                      <Badge className="bg-adminhub-success hover:bg-adminhub-success">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Appearance Settings</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Theme</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`p-4 bg-black rounded-md border-2 cursor-pointer ${
                      themeMode === 'dark' ? 'border-adminhub-accent' : 'border-transparent'
                    }`}
                    onClick={() => setThemeMode('dark')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-medium text-white">Dark Mode</div>
                      <Moon className="h-4 w-4 text-white" />
                    </div>
                    <div className="h-20 rounded-md bg-gray-800 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-md bg-blue-500"></div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 bg-white rounded-md border-2 cursor-pointer ${
                      themeMode === 'light' ? 'border-adminhub-accent' : 'border-transparent'
                    }`}
                    onClick={() => setThemeMode('light')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-medium text-gray-900">Light Mode</div>
                      <Sun className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="h-20 rounded-md bg-gray-100 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-md bg-blue-500"></div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 bg-gradient-to-br from-gray-900 to-black rounded-md border-2 cursor-pointer ${
                      themeMode === 'system' ? 'border-adminhub-accent' : 'border-transparent'
                    }`}
                    onClick={() => setThemeMode('system')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-medium text-white">System Preference</div>
                      <div className="flex">
                        <Moon className="h-4 w-4 text-white mr-1" />
                        <Sun className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                    <div className="h-20 rounded-md bg-gray-800 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-md bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Accent Color</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: 'Blue', color: 'bg-blue-500', value: 'blue' },
                    { name: 'Green', color: 'bg-green-500', value: 'green' },
                    { name: 'Purple', color: 'bg-purple-500', value: 'purple' },
                    { name: 'Orange', color: 'bg-orange-500', value: 'orange' },
                  ].map((color) => (
                    <div 
                      key={color.value}
                      className={`p-3 rounded-md border-2 cursor-pointer ${
                        accentColor === color.value ? 'border-gray-400' : 'border-transparent'
                      }`}
                      onClick={() => setAccentColor(color.value)}
                    >
                      <div className={`h-10 w-full rounded-md ${color.color} mb-2`}></div>
                      <div className="text-center text-sm">{color.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Layout & Density</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode" className="text-base">Compact Mode</Label>
                    <p className="text-sm text-adminhub-secondary-text">Reduce spacing to show more content</p>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={compactMode}
                    onCheckedChange={setCompactMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="text-base">Interface Animations</Label>
                    <p className="text-sm text-adminhub-secondary-text">Enable smooth transitions and animations</p>
                  </div>
                  <Switch
                    id="animations"
                    defaultChecked
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="font-size" className="bg-adminhub-background">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent className="bg-adminhub-surface border-border">
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Appearance Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-adminhub-surface border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Role Management</CardTitle>
              <CardDescription className="text-adminhub-secondary-text">
                Manage roles and access permissions for different users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">User Roles</h3>
                
                <div className="space-y-3">
                  {[
                    { 
                      role: 'HOD', 
                      description: 'Full administrative access to all department functions',
                      permissions: ['View all data', 'Edit department info', 'Manage faculty', 'Manage students', 'Approve leaves', 'Generate reports', 'Manage timetable']
                    },
                    { 
                      role: 'Faculty', 
                      description: 'Limited administrative access for faculty members',
                      permissions: ['View assigned classes', 'Upload marks', 'Track attendance', 'Request leaves', 'View reports']
                    },
                    { 
                      role: 'Lab Assistant', 
                      description: 'Access to lab management and equipment',
                      permissions: ['Manage lab schedule', 'Equipment maintenance', 'Student assistance', 'Track lab attendance']
                    },
                    { 
                      role: 'Administrative Staff', 
                      description: 'Administrative functions without faculty privileges',
                      permissions: ['Update records', 'Process requests', 'Generate reports', 'Maintain schedules']
                    },
                  ].map((role, index) => (
                    <div key={index} className="p-4 bg-adminhub-background rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{role.role}</div>
                          <p className="text-sm text-adminhub-secondary-text">{role.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Lock className="mr-2 h-4 w-4" />
                          Edit Permissions
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {role.permissions.map((permission, i) => (
                          <div key={i} className="flex items-center text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-adminhub-accent mr-1.5"></div>
                            {permission}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-border/30" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Role Assignments</h3>
                  <Button variant="outline" size="sm">
                    <UsersRound className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Dr. Anita Kumar', email: 'anita.kumar@example.edu', role: 'Faculty', department: 'Computer Science' },
                    { name: 'Prof. Sanjay Gupta', email: 'sanjay.gupta@example.edu', role: 'Faculty', department: 'Computer Science' },
                    { name: 'Rajesh Sharma', email: 'rajesh.sharma@example.edu', role: 'Lab Assistant', department: 'Computer Science' },
                    { name: 'Priya Patil', email: 'priya.patil@example.edu', role: 'Administrative Staff', department: 'Computer Science' },
                  ].map((user, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-adminhub-background rounded-md">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-adminhub-secondary-text">{user.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-adminhub-background">
                          {user.role}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <EyeOff className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-adminhub-accent/10 rounded-md border border-adminhub-accent/30">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-adminhub-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Access Control</h3>
                    <p className="text-sm">Role permissions are hierarchical. Changes to roles will affect all users with that role. Be cautious when modifying permissions for existing roles.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
