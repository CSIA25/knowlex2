import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PublicEvent {
  id: string;
  title: string;
  type: 'Workshop' | 'Info Session';
  date: string;
  imageUrl: string;
  description: string;
  location: string;
  time: string;
  registrationLink?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const EventsPage = () => {
    const [events, setEvents] = useState<PublicEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query only for events that are 'approved' and order them by date
        const q = query(
            collection(db, "publicEvents"), 
            where("status", "==", "approved"),
            orderBy("date", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PublicEvent));
            setEvents(fetchedEvents);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
         <div className="min-h-screen bg-background text-foreground pt-28 pb-16">
            <div className="container mx-auto px-6">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-light text-glow mb-4">Upcoming Events</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Join our workshops, info sessions, and stay updated on important deadlines.
                    </p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                             <div key={index} className="glass-card p-4 flex flex-col space-y-3">
                                <div className="animate-pulse bg-muted/50 rounded-lg aspect-video"></div>
                                <div className="animate-pulse bg-muted/50 h-6 w-3/4 rounded-md"></div>
                                <div className="animate-pulse bg-muted/50 h-4 w-1/2 rounded-md"></div>
                                <div className="animate-pulse bg-muted/50 h-10 w-full rounded-md mt-4"></div>
                            </div>
                        ))
                    ) : events.length > 0 ? (
                        events.map((event, index) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card flex flex-col group overflow-hidden rounded-2xl border border-border/10"
                        >
                            <div className="relative">
                               <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                               <span className="absolute top-4 left-4 text-xs font-semibold text-primary-foreground bg-primary/90 px-3 py-1 rounded-full">{event.type || 'Event'}</span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-semibold text-foreground mb-3">{event.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{event.description}</p>
                                <div className="text-muted-foreground text-sm space-y-2 mt-auto border-t border-border/10 pt-4">
                                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                                    <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {event.time}</p>
                                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</p>
                                </div>
                                <Dialog>
                                    <div className="flex gap-2 mt-6">
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full">View Details</Button>
                                        </DialogTrigger>
                                        <Button asChild className="w-full">
                                            <a href={event.registrationLink || '#'} target="_blank" rel="noopener noreferrer">Register <ArrowRight className="w-4 h-4 ml-2"/></a>
                                        </Button>
                                    </div>
                                    <DialogContent className="glass-card max-w-2xl">
                                        <DialogHeader>
                                            <div className="relative mb-4">
                                                <img src={event.imageUrl} alt={event.title} className="w-full h-56 object-cover rounded-lg" />
                                                <span className="absolute top-4 left-4 text-xs font-semibold text-primary-foreground bg-primary px-3 py-1 rounded-full">{event.type}</span>
                                            </div>
                                            <DialogTitle className="text-3xl font-bold font-heading">{event.title}</DialogTitle>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground pt-2">
                                                <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                                                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {event.time}</p>
                                                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</p>
                                            </div>
                                        </DialogHeader>
                                        <DialogDescription className="py-4 text-base leading-relaxed whitespace-pre-wrap">
                                            {event.description}
                                        </DialogDescription>
                                        <Button asChild size="lg" className="w-full">
                                            <a href={event.registrationLink || '#'} target="_blank" rel="noopener noreferrer">Register Now <ArrowRight className="w-4 h-4 ml-2"/></a>
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </motion.div>
                    ))
                    ) : <p className="col-span-full text-center text-muted-foreground py-10">No upcoming public events. Please check back soon!</p>}
                </div>
            </div>
         </div>
    );
};

export default EventsPage;