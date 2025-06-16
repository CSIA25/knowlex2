import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sparkles, MessageSquare, Send, X, Check, ArrowRight, User, Mail } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500),
});

type FormData = z.infer<typeof formSchema>;

const InquiryWidget = () => {
    const [isOpen, setIsOpen] = useState(true); // Open by default
    const [step, setStep] = useState(0); // 0: initial, 1: form, 2: success
    const { user } = useAuth();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.displayName || '',
            email: user?.email || '',
            message: '',
        },
    });
    
    // Automatically populate form if user logs in while widget is open
    useEffect(() => {
        if(user) {
            form.reset({
                name: user.displayName || '',
                email: user.email || '',
                message: form.getValues('message') // keep message if already typed
            });
        }
    }, [user, form]);


    const onSubmit = async (data: FormData) => {
        try {
            await addDoc(collection(db, 'inquiries'), {
                ...data,
                source: 'Global Scholarship Program Page',
                createdAt: serverTimestamp(),
                userId: user?.uid || 'anonymous',
            });
            setStep(2); // Move to success step
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            toast.error("Submission Failed", {
                description: "There was an error sending your message. Please try again.",
            });
        }
    };
    
    const handleToggle = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            // When opening, always reset to the intro step
            form.reset({ name: user?.displayName || '', email: user?.email || '', message: '' });
            setStep(0);
            setIsOpen(true);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-[calc(100vw-3rem)] max-w-sm h-[75vh] max-h-[600px] bg-background/80 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="absolute inset-0 border border-border/10 rounded-2xl pointer-events-none"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-foreground">Inquire About GSP</h3>
                            </div>
                           <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleToggle}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow p-6 overflow-y-auto relative">
                             <AnimatePresence mode="wait">
                                {step === 1 && (
                                     <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                         <p className="text-muted-foreground text-sm mb-6">Our experts are ready to help. Fill out the form below to get started.</p>
                                         <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                <FormField name="name" control={form.control} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2 text-xs text-muted-foreground"><User className="w-3 h-3"/> Name</FormLabel>
                                                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <FormField name="email" control={form.control} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="w-3 h-3"/> Email</FormLabel>
                                                        <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <FormField name="message" control={form.control} render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2 text-xs text-muted-foreground"><MessageSquare className="w-3 h-3"/> Your Question</FormLabel>
                                                        <FormControl><Textarea placeholder="Tell us how we can help..." {...field} rows={4} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <Button type="submit" className="w-full !mt-6" disabled={form.formState.isSubmitting}>
                                                    {form.formState.isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                                    <Send className="w-4 h-4 ml-2"/>
                                                </Button>
                                            </form>
                                        </Form>
                                     </motion.div>
                                )}
                                {step === 0 && (
                                    <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center h-full flex flex-col justify-center items-center">
                                         <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                            <Sparkles className="w-10 h-10 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-bold text-foreground mb-2">Ready to Start Your Journey?</h4>
                                        <p className="text-muted-foreground mb-8">Let's connect. A world of opportunity awaits.</p>
                                        <Button size="lg" className="w-full" onClick={() => setStep(1)}>
                                            Ask a Question <ArrowRight className="w-4 h-4 ml-2"/>
                                        </Button>
                                    </motion.div>
                                )}
                                 {step === 2 && (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center h-full flex flex-col justify-center items-center">
                                         <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1, transition: { type: 'spring', delay: 0.2, stiffness: 260, damping: 20 } }}
                                            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6"
                                        >
                                            <Check className="w-10 h-10 text-green-500" />
                                        </motion.div>
                                        <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                                        <p className="text-muted-foreground mb-8">Thank you for your inquiry. Our team will get back to you within one business day.</p>
                                        <Button variant="outline" className="w-full" onClick={handleToggle}>
                                            Close
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

             {/* This is now just the toggle button */}
             <AnimatePresence>
                {!isOpen && (
                     <motion.button
                        onClick={handleToggle}
                        className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 50}}
                        aria-label="Open inquiry form"
                    >
                        <MessageSquare className="w-8 h-8" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InquiryWidget;