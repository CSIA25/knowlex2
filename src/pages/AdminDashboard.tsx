import { useState, useEffect } from "react";
import { collection, onSnapshot, query, doc, updateDoc, addDoc, serverTimestamp, deleteDoc, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, Calendar, Plus, Trash2, Megaphone, ArrowLeft, MessageSquare, Clock, ThumbsUp, ThumbsDown, ShieldCheck, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import SupportChat from "@/components/SupportChat";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


// --- TYPES ---
type ApplicationStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Interviewing' | 'Accepted' | 'Rejected';
type EventStatus = 'pending' | 'approved' | 'rejected';

interface User { id: string; email: string; }
interface Application { id: string; university: string; program: string; status: ApplicationStatus; userId: string; userEmail?: string; }
interface GlobalEvent { id: string; title: string; type: 'Deadline' | 'Workshop' | 'Info Session'; date: string; }
interface PublicEvent extends GlobalEvent {
  imageUrl: string;
  description: string;
  location: string;
  time: string;
  registrationLink?: string;
  status: EventStatus;
  rejectionReason?: string;
  creatorId: string; // <-- Add creatorId to the type
  creatorEmail: string;
}

const statusOptions: ApplicationStatus[] = ['Not Started', 'In Progress', 'Submitted', 'Interviewing', 'Accepted', 'Rejected'];

const AdminDashboard = () => {
    const { user, isFather } = useAuth(); // Get the isFather role from context
    const [users, setUsers] = useState<User[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [globalEvents, setGlobalEvents] = useState<GlobalEvent[]>([]);
    const [publicEvents, setPublicEvents] = useState<PublicEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddUserEventOpen, setAddUserEventOpen] = useState(false);
    const [isAddPublicEventOpen, setAddPublicEventOpen] = useState(false);
    const [selectedUserChat, setSelectedUserChat] = useState<User | null>(null);
    
    const userEventForm = useForm();
    const publicEventForm = useForm();
    const rejectionForm = useForm<{ reason: string }>();

    useEffect(() => {
        const unsubUsers = onSnapshot(query(collection(db, "users")), snap => setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as User))));
        const unsubApps = onSnapshot(query(collection(db, "applications")), snap => {
            setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() } as Application)));
            setLoading(false);
        });
        const unsubGlobalEvents = onSnapshot(query(collection(db, "globalEvents")), snap => setGlobalEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as GlobalEvent)).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
        
        // ** The FIX is HERE **
        // Admins should see all events, but we also need a query for event creators to see their own rejected events.
        // The security rules now handle this, so we can fetch all events for admins and let the rules filter.
        const qPublicEvents = query(collection(db, "publicEvents"), orderBy("createdAt", "desc"));
        const unsubPublicEvents = onSnapshot(qPublicEvents, (snapshot) => {
            const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PublicEvent));
            setPublicEvents(events);
        });
        
        return () => { unsubUsers(); unsubApps(); unsubGlobalEvents(); unsubPublicEvents(); };
    }, []);

    const applicationsWithEmails = applications.map(app => ({ ...app, userEmail: users.find(u => u.id === app.userId)?.email || 'Unknown' }));

    const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => await updateDoc(doc(db, "applications", appId), { status: newStatus });
    
    const onAddEvent = async (data: any, type: 'global' | 'public') => {
        if (!user) return; // Ensure user is logged in
        const collectionName = type === 'global' ? 'globalEvents' : 'publicEvents';
        const eventData = { 
            ...data, 
            createdAt: serverTimestamp(), 
            creatorEmail: user.email,
            creatorId: user.uid // ** THE FIX IS HERE: Store the creator's ID **
        };

        if (type === 'public') {
            eventData.status = 'pending';
        }
        await addDoc(collection(db, collectionName), eventData);

        if (type === 'global') {
            userEventForm.reset();
            setAddUserEventOpen(false);
        } else {
            publicEventForm.reset();
            setAddPublicEventOpen(false);
        }
        toast.success(`Event "${data.title}" created and is pending approval.`);
    };
    
    const handleEventApproval = async (eventId: string, isApproved: boolean, reason?: string) => {
        const eventRef = doc(db, 'publicEvents', eventId);
        if (isApproved) {
            await updateDoc(eventRef, { status: 'approved', rejectionReason: '' });
            toast.success("Event has been approved and is now live.");
        } else {
            await updateDoc(eventRef, { status: 'rejected', rejectionReason: reason });
            toast.error("Event has been rejected.");
        }
    };


    const onDeleteEvent = async (eventId: string, type: 'global' | 'public') => {
        if (window.confirm("Are you sure you want to permanently delete this event? This action cannot be undone.")) {
            const collectionName = type === 'global' ? 'globalEvents' : 'publicEvents';
            await deleteDoc(doc(db, collectionName, eventId));
            toast.info("Event has been deleted.");
        }
    };

    const pendingEvents = publicEvents.filter(e => e.status === 'pending');
    const historicalEvents = publicEvents.filter(e => e.status === 'approved' || e.status === 'rejected');
    
    if (selectedUserChat) {
        return (
             <div className="min-h-screen bg-muted/40 text-foreground pt-28 pb-16">
                <div className="container mx-auto px-6">
                    <Button onClick={() => setSelectedUserChat(null)} variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin Panel
                    </Button>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-center text-2xl font-bold mb-4">Chat with <span className="text-primary">{selectedUserChat.email}</span></h2>
                        <SupportChat targetUserId={selectedUserChat.id} isAdminView={true} />
                    </div>
                </div>
            </div>
        )
    }

    const RejectionDialog = ({ eventId }: { eventId: string }) => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm"><ThumbsDown className="w-4 h-4 mr-2" /> Reject</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reason for Rejection</DialogTitle>
                    <DialogDescription>Please provide a clear reason why this event is being rejected. This will be visible to the event creator.</DialogDescription>
                </DialogHeader>
                <form onSubmit={rejectionForm.handleSubmit(data => handleEventApproval(eventId, false, data.reason))} className="space-y-4 pt-4">
                    <Textarea {...rejectionForm.register("reason", { required: true })} placeholder="e.g., Image quality is too low, description is incomplete..." rows={4} />
                    <DialogClose asChild>
                         <Button type="submit" variant="destructive" className="w-full">Confirm Rejection</Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-muted/40 text-foreground pt-28 pb-16">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl font-bold text-glow flex items-center gap-3">
                            <ShieldCheck className="w-10 h-10" />
                            {isFather ? 'Father Control Panel' : 'Admin Control Panel'}
                        </h1>
                        <p className="text-muted-foreground mt-2">Manage users and applications across the platform.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4"><Users className="w-8 h-8 text-primary" /><div><p className="text-muted-foreground text-sm">Total Users</p><p className="text-3xl font-bold">{users.length}</p></div></div>
                        <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4"><FileText className="w-8 h-8 text-primary" /><div><p className="text-muted-foreground text-sm">Applications</p><p className="text-3xl font-bold">{applications.length}</p></div></div>
                        <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4"><CheckCircle className="w-8 h-8 text-green-500" /><div><p className="text-muted-foreground text-sm">Accepted</p><p className="text-3xl font-bold">{applications.filter(a => a.status === 'Accepted').length}</p></div></div>
                        <div className="bg-background p-6 rounded-xl shadow-sm flex items-center gap-4"><Clock className="w-8 h-8 text-yellow-500" /><div><p className="text-muted-foreground text-sm">Pending Events</p><p className="text-3xl font-bold">{pendingEvents.length}</p></div></div>
                    </motion.div>

                    {isFather && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 bg-background p-6 rounded-xl shadow-sm border-2 border-primary/50">
                            <h2 className="text-2xl font-semibold mb-4 text-primary">Pending Event Approvals</h2>
                            {pendingEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {pendingEvents.map(event => (
                                        <div key={event.id} className="bg-muted/50 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                            <div>
                                                <p className="font-bold text-lg">{event.title}</p>
                                                <p className="text-sm text-muted-foreground">Created by: {event.creatorEmail || 'N/A'} on {new Date(event.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex gap-2 self-end sm:self-center">
                                                <Button onClick={() => handleEventApproval(event.id, true)} size="sm" className="bg-green-500 hover:bg-green-600 text-white"><ThumbsUp className="w-4 h-4 mr-2"/> Approve</Button>
                                                <RejectionDialog eventId={event.id} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="text-muted-foreground text-center py-8">No events are currently pending approval.</p>}
                        </motion.div>
                    )}
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 bg-background p-6 rounded-xl shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">User Management & Support</h2>
                        <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>User Email</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{loading ? (<TableRow><TableCell colSpan={2} className="text-center py-10">Loading users...</TableCell></TableRow>) : users.length === 0 ? (<TableRow><TableCell colSpan={2} className="text-center py-10 text-muted-foreground">No users found.</TableCell></TableRow>) : (users.filter(u => u.email).map(user => (<TableRow key={user.id}><TableCell className="font-medium">{user.email}</TableCell><TableCell className="text-right"><Button variant="outline" size="sm" onClick={() => setSelectedUserChat(user)}><MessageSquare className="w-4 h-4 mr-2"/>Chat</Button></TableCell></TableRow>)))}</TableBody></Table></div>
                    </motion.div>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-background p-6 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold flex items-center gap-2"><Calendar className="w-6 h-6 text-accent"/> User Dashboard Events</h2>
                                <Dialog open={isAddUserEventOpen} onOpenChange={setAddUserEventOpen}><DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add User Event</Button></DialogTrigger><DialogContent className="glass-card"><DialogHeader><DialogTitle>Create User Dashboard Event</DialogTitle><DialogDescription>This event will appear on all users' dashboards.</DialogDescription></DialogHeader><Form {...userEventForm}><form onSubmit={userEventForm.handleSubmit(data => onAddEvent(data, 'global'))} className="space-y-4 pt-4"><Input {...userEventForm.register("title")} placeholder="Event Title (e.g., 'Meeting with Consultant')" required /><FormField control={userEventForm.control} name="type" render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value} required><FormControl><SelectTrigger><SelectValue placeholder="Event Type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Deadline">Deadline</SelectItem><SelectItem value="Workshop">Workshop</SelectItem><SelectItem value="Info Session">Info Session</SelectItem></SelectContent></Select></FormItem>)}/><Input {...userEventForm.register("date")} type="date" required /><Button type="submit" className="w-full">Create Event</Button></form></Form></DialogContent></Dialog>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {globalEvents.length > 0 ? globalEvents.map(event => (
                                    <div key={event.id} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center"><div><p className="font-semibold">{event.title}</p><p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p></div><Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => onDeleteEvent(event.id, 'global')}><Trash2 className="w-4 h-4" /></Button></div>
                                )) : <p className="text-muted-foreground text-center py-8">No global events for users scheduled.</p>}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-background p-6 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold flex items-center gap-2"><Megaphone className="w-6 h-6 text-accent"/> Public Event Management</h2>
                                <Dialog open={isAddPublicEventOpen} onOpenChange={setAddPublicEventOpen}><DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add Public Event</Button></DialogTrigger><DialogContent className="glass-card max-h-[90vh] overflow-y-auto p-6"><DialogHeader><DialogTitle>Create Public Event</DialogTitle><DialogDescription>This event will appear on the public /events page after approval.</DialogDescription></DialogHeader><Form {...publicEventForm}><form onSubmit={publicEventForm.handleSubmit(data => onAddEvent(data, 'public'))} className="space-y-4 pt-4"><Input {...publicEventForm.register("title")} placeholder="Event Title" required /><Textarea {...publicEventForm.register("description")} placeholder="Event Description (supports line breaks)" required rows={4} /><Input {...publicEventForm.register("imageUrl")} placeholder="Image URL (e.g., from Unsplash)" required /><FormField control={publicEventForm.control} name="type" render={({ field }) => (<FormItem><Select onValueChange={field.onChange} defaultValue={field.value} required><FormControl><SelectTrigger><SelectValue placeholder="Event Type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Workshop">Workshop</SelectItem><SelectItem value="Info Session">Info Session</SelectItem></SelectContent></Select></FormItem>)}/><div className="flex flex-col sm:flex-row gap-4"><Input {...publicEventForm.register("date")} type="date" required /><Input {...publicEventForm.register("time")} placeholder="Time (e.g., 6:00 PM EST)" required /></div><Input {...publicEventForm.register("location")} placeholder="Location (e.g., Online via Zoom)" required /><Input {...publicEventForm.register("registrationLink")} placeholder="Registration Link (Optional)" /><Button type="submit" className="w-full">Submit for Approval</Button></form></Form></DialogContent></Dialog>
                            </div>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {historicalEvents.length > 0 ? historicalEvents.map(event => (
                                    <div key={event.id} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{event.title}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <Badge variant={event.status === 'approved' ? 'default' : event.status === 'rejected' ? 'destructive' : 'secondary'} className={event.status === 'approved' ? 'bg-green-500/80' : ''}>{event.status}</Badge>
                                        {event.status === 'rejected' && event.rejectionReason && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/80"><Info className="w-4 h-4" /></Button>
                                                </TooltipTrigger>
                                                <TooltipContent><p>{event.rejectionReason}</p></TooltipContent>
                                            </Tooltip>
                                        )}
                                        {isFather && <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => onDeleteEvent(event.id, 'public')}><Trash2 className="w-4 h-4" /></Button>}
                                        </div>
                                    </div>
                                )) : <p className="text-muted-foreground text-center py-8">No public event history.</p>}
                            </div>
                        </motion.div>
                    </div>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 bg-background p-6 rounded-xl shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Application Management</h2>
                        <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>User</TableHead><TableHead>University</TableHead><TableHead>Program</TableHead><TableHead className="text-center w-[200px]">Status</TableHead></TableRow></TableHeader><TableBody>{loading ? (<TableRow><TableCell colSpan={4} className="text-center py-10">Loading applications...</TableCell></TableRow>) : applicationsWithEmails.length === 0 ? (<TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No applications found.</TableCell></TableRow>) : (applicationsWithEmails.map(app => (<TableRow key={app.id}><TableCell>{app.userEmail}</TableCell><TableCell className="font-medium">{app.university}</TableCell><TableCell>{app.program}</TableCell><TableCell><Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value as ApplicationStatus)}><SelectTrigger className="w-[180px] mx-auto"><SelectValue placeholder="Set status" /></SelectTrigger><SelectContent>{statusOptions.map(status => (<SelectItem key={status} value={status}>{status}</SelectItem>))}</SelectContent></Select></TableCell></TableRow>)))}</TableBody></Table></div>
                    </motion.div>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default AdminDashboard;