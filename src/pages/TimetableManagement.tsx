
import { useState } from 'react';
import { 
  CalendarRange, 
  Clock, 
  Download, 
  Printer, 
  Save, 
  Edit, 
  Plus, 
  X,
  CheckSquare,
  RotateCcw,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['09:00 - 10:00', '10:00 - 11:00', '11:15 - 12:15', '12:15 - 01:15', '02:00 - 03:00', '03:00 - 04:00'];

// Sample subjects
const subjects = [
  { id: 'OS', name: 'Operating Systems', code: 'CS501' },
  { id: 'DBMS', name: 'Database Management Systems', code: 'CS502' },
  { id: 'CN', name: 'Computer Networks', code: 'CS503' },
  { id: 'DSA', name: 'Data Structures & Algorithms', code: 'CS504' },
  { id: 'WEB', name: 'Web Technologies', code: 'CS505' },
  { id: 'ML', name: 'Machine Learning', code: 'CS506' },
];

// Sample faculty
const faculty = [
  { id: 1, name: 'Dr. Anita Kumar', subjects: ['OS', 'DBMS'] },
  { id: 2, name: 'Prof. Sanjay Gupta', subjects: ['WEB', 'CN'] },
  { id: 3, name: 'Dr. Manisha Singh', subjects: ['ML'] },
  { id: 4, name: 'Dr. Priya Shah', subjects: ['OS', 'DSA'] },
  { id: 5, name: 'Prof. Karan Mehta', subjects: ['WEB', 'ML'] },
];

// Sample default timetable
const defaultTimetable = {
  'CSE': {
    'Semester 6': {
      'Section A': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {}),
      'Section B': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {})
    },
    'Semester 4': {
      'Section A': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {})
    }
  },
  'IT': {
    'Semester 6': {
      'Section A': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {})
    }
  }
};

// Sample filled timetable
const filledTimetable = {
  'CSE': {
    'Semester 6': {
      'Section A': {
        'Monday': {
          '09:00 - 10:00': { subject: 'OS', faculty: 'Dr. Anita Kumar', room: 'CS-301' },
          '10:00 - 11:00': { subject: 'DBMS', faculty: 'Dr. Anita Kumar', room: 'CS-301' },
          '11:15 - 12:15': { subject: 'CN', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '12:15 - 01:15': { subject: 'DSA', faculty: 'Dr. Priya Shah', room: 'CS-301' },
          '02:00 - 03:00': { subject: 'WEB', faculty: 'Prof. Sanjay Gupta', room: 'CS-Lab-1' },
          '03:00 - 04:00': { subject: 'WEB', faculty: 'Prof. Sanjay Gupta', room: 'CS-Lab-1' }
        },
        'Tuesday': {
          '09:00 - 10:00': { subject: 'DBMS', faculty: 'Dr. Anita Kumar', room: 'CS-301' },
          '10:00 - 11:00': { subject: 'OS', faculty: 'Dr. Anita Kumar', room: 'CS-301' },
          '11:15 - 12:15': { subject: 'ML', faculty: 'Dr. Manisha Singh', room: 'CS-301' },
          '12:15 - 01:15': { subject: 'DSA', faculty: 'Dr. Priya Shah', room: 'CS-301' },
          '02:00 - 03:00': { subject: 'CN', faculty: 'Prof. Sanjay Gupta', room: 'CS-Lab-2' },
          '03:00 - 04:00': { subject: 'CN', faculty: 'Prof. Sanjay Gupta', room: 'CS-Lab-2' }
        },
        'Wednesday': {
          '09:00 - 10:00': { subject: 'ML', faculty: 'Dr. Manisha Singh', room: 'CS-301' },
          '10:00 - 11:00': { subject: 'CN', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '11:15 - 12:15': { subject: 'OS', faculty: 'Dr. Anita Kumar', room: 'CS-Lab-1' },
          '12:15 - 01:15': { subject: 'OS', faculty: 'Dr. Anita Kumar', room: 'CS-Lab-1' },
          '02:00 - 03:00': { subject: 'DBMS', faculty: 'Dr. Anita Kumar', room: 'CS-301' },
          '03:00 - 04:00': { subject: 'DSA', faculty: 'Dr. Priya Shah', room: 'CS-301' }
        },
        'Thursday': {
          '09:00 - 10:00': { subject: 'DSA', faculty: 'Dr. Priya Shah', room: 'CS-Lab-2' },
          '10:00 - 11:00': { subject: 'DSA', faculty: 'Dr. Priya Shah', room: 'CS-Lab-2' },
          '11:15 - 12:15': { subject: 'WEB', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '12:15 - 01:15': { subject: 'ML', faculty: 'Dr. Manisha Singh', room: 'CS-301' },
          '02:00 - 03:00': { subject: 'DBMS', faculty: 'Dr. Anita Kumar', room: 'CS-Lab-1' },
          '03:00 - 04:00': { subject: 'DBMS', faculty: 'Dr. Anita Kumar', room: 'CS-Lab-1' }
        },
        'Friday': {
          '09:00 - 10:00': { subject: 'WEB', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '10:00 - 11:00': { subject: 'ML', faculty: 'Dr. Manisha Singh', room: 'CS-301' },
          '11:15 - 12:15': { subject: 'OS', faculty: 'Dr. Anita Kumar', room: 'CS-301' },
          '12:15 - 01:15': { subject: 'CN', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '02:00 - 03:00': { subject: 'DSA', faculty: 'Dr. Priya Shah', room: 'CS-301' },
          '03:00 - 04:00': { subject: 'DBMS', faculty: 'Dr. Anita Kumar', room: 'CS-301' }
        },
        'Saturday': {
          '09:00 - 10:00': { subject: 'ML', faculty: 'Dr. Manisha Singh', room: 'CS-Lab-2' },
          '10:00 - 11:00': { subject: 'ML', faculty: 'Dr. Manisha Singh', room: 'CS-Lab-2' },
          '11:15 - 12:15': { subject: 'WEB', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '12:15 - 01:15': { subject: 'CN', faculty: 'Prof. Sanjay Gupta', room: 'CS-301' },
          '02:00 - 03:00': null,
          '03:00 - 04:00': null
        }
      },
      'Section B': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {})
    },
    'Semester 4': {
      'Section A': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {})
    }
  },
  'IT': {
    'Semester 6': {
      'Section A': days.reduce((acc, day) => {
        acc[day] = periods.reduce((acc2, period) => {
          acc2[period] = null;
          return acc2;
        }, {});
        return acc;
      }, {})
    }
  }
};

const TimetableManagement = () => {
  const [department, setDepartment] = useState('CSE');
  const [semester, setSemester] = useState('Semester 6');
  const [section, setSection] = useState('Section A');
  const [isEditing, setIsEditing] = useState(false);
  const [timetable, setTimetable] = useState(filledTimetable);
  const [selectedCell, setSelectedCell] = useState<{ day: string; time: string } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [room, setRoom] = useState('');
  
  const availableDepartments = Object.keys(timetable);
  const availableSemesters = department ? Object.keys(timetable[department] || {}) : [];
  const availableSections = (department && semester) ? Object.keys(timetable[department][semester] || {}) : [];
  
  const currentTimetable = department && semester && section 
    ? timetable[department][semester][section] 
    : {};
    
  const handleCellClick = (day: string, time: string) => {
    if (!isEditing) return;
    
    setSelectedCell({ day, time });
    const currentCell = currentTimetable[day][time];
    
    if (currentCell) {
      setSelectedSubject(currentCell.subject);
      setSelectedFaculty(currentCell.faculty);
      setRoom(currentCell.room);
    } else {
      setSelectedSubject(null);
      setSelectedFaculty(null);
      setRoom('');
    }
  };
  
  const handleAssignSlot = () => {
    if (!selectedCell || !selectedSubject || !selectedFaculty) return;
    
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    newTimetable[department][semester][section][selectedCell.day][selectedCell.time] = {
      subject: selectedSubject,
      faculty: selectedFaculty,
      room: room
    };
    
    setTimetable(newTimetable);
    setSelectedCell(null);
    setSelectedSubject(null);
    setSelectedFaculty(null);
    setRoom('');
  };
  
  const handleClearSlot = () => {
    if (!selectedCell) return;
    
    const newTimetable = JSON.parse(JSON.stringify(timetable));
    newTimetable[department][semester][section][selectedCell.day][selectedCell.time] = null;
    
    setTimetable(newTimetable);
    setSelectedCell(null);
    setSelectedSubject(null);
    setSelectedFaculty(null);
    setRoom('');
  };
  
  const getSubjectById = (id: string) => {
    return subjects.find(s => s.id === id);
  };
  
  const getCellColor = (subject: string | null) => {
    if (!subject) return 'bg-adminhub-background/50';
    
    const colors: {[key: string]: string} = {
      'OS': 'bg-blue-500/10 border-blue-500/30',
      'DBMS': 'bg-green-500/10 border-green-500/30',
      'CN': 'bg-purple-500/10 border-purple-500/30',
      'DSA': 'bg-yellow-500/10 border-yellow-500/30',
      'WEB': 'bg-pink-500/10 border-pink-500/30',
      'ML': 'bg-orange-500/10 border-orange-500/30'
    };
    
    return colors[subject] || 'bg-adminhub-accent/10 border-adminhub-accent/30';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h1 className="text-2xl font-bold">Timetable Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Timetable
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="bg-adminhub-surface border-border/30">
        <CardHeader>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <CalendarRange className="h-4 w-4 text-adminhub-secondary-text" />
              <Select 
                value={department}
                onValueChange={setDepartment}
              >
                <SelectTrigger className="w-[180px] bg-adminhub-background">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-adminhub-surface border-border">
                  {availableDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Select 
                value={semester}
                onValueChange={setSemester}
              >
                <SelectTrigger className="w-[180px] bg-adminhub-background">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent className="bg-adminhub-surface border-border">
                  {availableSemesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Select 
                value={section}
                onValueChange={setSection}
              >
                <SelectTrigger className="w-[180px] bg-adminhub-background">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent className="bg-adminhub-surface border-border">
                  {availableSections.map((sec) => (
                    <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="min-w-[800px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border/30 bg-adminhub-background p-2">Day / Time</th>
                  {periods.map((period) => (
                    <th key={period} className="border border-border/30 bg-adminhub-background p-2 text-sm">
                      <div className="flex flex-col items-center">
                        <span>{period.split(' - ')[0]}</span>
                        <span>{period.split(' - ')[1]}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border border-border/30 bg-adminhub-background p-2 font-medium">
                      {day}
                    </td>
                    {periods.map((period) => {
                      const cell = currentTimetable[day]?.[period];
                      return (
                        <td 
                          key={`${day}-${period}`} 
                          className={`border border-border/30 p-0 text-center relative ${
                            selectedCell && selectedCell.day === day && selectedCell.time === period
                              ? 'ring-2 ring-adminhub-accent'
                              : ''
                          }`}
                          onClick={() => handleCellClick(day, period)}
                        >
                          {cell ? (
                            <div className={`p-2 h-full ${getCellColor(cell.subject)}`}>
                              <div className="font-medium text-sm">
                                {getSubjectById(cell.subject)?.name || cell.subject}
                              </div>
                              <div className="text-xs text-adminhub-secondary-text mt-1">
                                {cell.faculty}
                              </div>
                              <div className="text-xs mt-1">
                                {cell.room}
                              </div>
                            </div>
                          ) : (
                            <div className="p-2 h-full bg-adminhub-background/50">
                              {isEditing && (
                                <button className="text-xs text-adminhub-secondary-text opacity-50 hover:opacity-100">
                                  Click to assign
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Card className="bg-adminhub-surface border-border/30">
          <CardHeader>
            <CardTitle className="text-base font-medium">Timetable Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Subject Legend</h3>
                <div className="grid grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <div 
                      key={subject.id} 
                      className={`flex items-center p-2 rounded ${getCellColor(subject.id)}`}
                    >
                      <div className="text-sm">
                        <span className="font-medium">{subject.name}</span>
                        <div className="text-xs text-adminhub-secondary-text">{subject.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">
                  {selectedCell 
                    ? `Editing: ${selectedCell.day}, ${selectedCell.time}` 
                    : 'Select a time slot to edit'}
                </h3>
                
                {selectedCell ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        value={selectedSubject || undefined}
                        onValueChange={setSelectedSubject}
                      >
                        <SelectTrigger id="subject" className="w-full bg-adminhub-background">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent className="bg-adminhub-surface border-border">
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name} ({subject.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="faculty">Faculty</Label>
                      <Select 
                        value={selectedFaculty || undefined}
                        onValueChange={setSelectedFaculty}
                        disabled={!selectedSubject}
                      >
                        <SelectTrigger id="faculty" className="w-full bg-adminhub-background">
                          <SelectValue placeholder="Select Faculty" />
                        </SelectTrigger>
                        <SelectContent className="bg-adminhub-surface border-border">
                          {faculty
                            .filter(f => !selectedSubject || f.subjects.includes(selectedSubject))
                            .map((f) => (
                              <SelectItem key={f.id} value={f.name}>
                                {f.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="room">Room</Label>
                      <Input 
                        id="room" 
                        value={room} 
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="e.g. CS-301"
                        className="bg-adminhub-background"
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={handleAssignSlot}
                        disabled={!selectedSubject || !selectedFaculty}
                      >
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Assign Slot
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleClearSlot}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear Slot
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-adminhub-background/50 rounded-md p-4 text-center text-adminhub-secondary-text">
                    Click on any slot in the timetable to start editing
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 border-t border-border/30 pt-4">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div>
                  <h3 className="font-medium mb-2">Bulk Actions</h3>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Copy From Template
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-adminhub-surface text-adminhub-primary-text">
                        <DialogHeader>
                          <DialogTitle>Copy from Template</DialogTitle>
                          <DialogDescription className="text-adminhub-secondary-text">
                            Select a template to copy timetable structure.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Select>
                            <SelectTrigger className="w-full bg-adminhub-background">
                              <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent className="bg-adminhub-surface border-border">
                              <SelectItem value="cse6">CSE Semester 6 - Template</SelectItem>
                              <SelectItem value="it6">IT Semester 6 - Template</SelectItem>
                              <SelectItem value="prev">Previous Semester Template</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Copy Template</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Timetable
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-check" />
                    <Label htmlFor="auto-check" className="text-sm">
                      Check for conflicts automatically
                    </Label>
                  </div>
                  
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save All Changes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-adminhub-surface border-border/30">
          <CardHeader>
            <CardTitle className="text-base font-medium">Faculty Workload Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faculty.map((f) => (
                <div key={f.id} className="flex items-center justify-between">
                  <div className="font-medium">{f.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-adminhub-background">
                      {Math.floor(Math.random() * 10) + 10} hours/week
                    </Badge>
                    <Badge variant={
                      Math.random() > 0.7 ? "destructive" : "secondary"
                    }>
                      {Math.random() > 0.7 ? "Overloaded" : "Optimal"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-adminhub-surface border-border/30">
          <CardHeader>
            <CardTitle className="text-base font-medium">Room Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">CS-301</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-adminhub-background">
                    26 slots/week
                  </Badge>
                  <Badge variant="secondary">
                    87% utilized
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">CS-Lab-1</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-adminhub-background">
                    18 slots/week
                  </Badge>
                  <Badge variant="secondary">
                    60% utilized
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">CS-Lab-2</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-adminhub-background">
                    14 slots/week
                  </Badge>
                  <Badge variant="secondary">
                    47% utilized
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">Seminar Hall</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-adminhub-background">
                    6 slots/week
                  </Badge>
                  <Badge variant="secondary">
                    20% utilized
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimetableManagement;
