import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ArrowRight, Check, GraduationCap, User, Mail, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
};

const pageTransition = { type: 'spring', stiffness: 300, damping: 30 } as const;

const scholarshipQuestions: { name: string; label: string; type: 'radio' | 'text'; options?: string[] }[] = [
    { name: 'currentEducation', label: 'What is your current level of education?', type: 'radio', options: ['High School', 'Bachelors', 'Masters', 'PhD'] },
    { name: 'desiredDestination', label: 'Which country are you interested in?', type: 'text' },
    { name: 'fieldOfInterest', label: 'What is your primary field of interest?', type: 'text' },
];

const InquiryPage = () => {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { control, handleSubmit, trigger, getValues } = useForm({
        mode: 'onChange'
    });
    
    const handleNextStep = async () => {
        const isValid = await trigger();
        if(isValid) setStep(step + 1);
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await addDoc(collection(db, 'inquiries'), {
                service: "Global Scholarship Program",
                ...data,
                createdAt: serverTimestamp(),
            });
            setStep(2); // Move to success step
        } catch (error) {
            toast.error("Submission Failed", { description: "Something went wrong. Please try again." });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderQuestions = () => {
        return scholarshipQuestions.map(q => (
            <div key={q.name} className="space-y-2">
                <Label>{q.label}</Label>
                {q.type === 'radio' ? (
                    <Controller
                        name={q.name}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4 pt-1">
                                {q.options?.map(opt => (
                                    <div key={opt} className="flex items-center space-x-2">
                                        <RadioGroupItem value={opt} id={`${q.name}-${opt}`} />
                                        <Label htmlFor={`${q.name}-${opt}`} className="font-normal">{opt}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    />
                ) : (
                    <Controller
                        name={q.name}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input placeholder="Your answer..." {...field} />
                        )}
                    />
                )}
            </div>
        ));
    };

    const steps = [
        // Step 0: Dynamic Questions
        <motion.div key="step0" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="w-full max-w-xl">
             <div className="glass-card p-8 md:p-12 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-8 h-8 text-primary"/>
                    <h2 className="text-3xl font-light text-glow">Global Scholarship Program Inquiry</h2>
                </div>
                <p className="text-muted-foreground mb-8">Tell us about your academic goals so we can find the best opportunities for you.</p>
                <div className="space-y-6">{renderQuestions()}</div>
                <Button onClick={handleNextStep} className="w-full mt-8" size="lg">Next <ArrowRight className="w-4 h-4 ml-2"/></Button>
            </div>
        </motion.div>,

        // Step 1: Contact Info
        <motion.div key="step1" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="w-full max-w-xl">
             <form onSubmit={handleSubmit(onSubmit)}>
                <div className="glass-card p-8 md:p-12 rounded-2xl">
                    <h2 className="text-3xl font-light text-glow mb-2">Almost there!</h2>
                    <p className="text-muted-foreground mb-8">How can we reach you?</p>
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <Label className="flex items-center gap-2"><User className="w-4 h-4" /> Full Name</Label>
                             <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <Input placeholder="Your Name" {...field} />}/>
                        </div>
                        <div className="space-y-2">
                             <Label className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</Label>
                             <Controller name="email" control={control} rules={{ required: true }} render={({ field }) => <Input type="email" placeholder="your.email@example.com" {...field} />}/>
                        </div>
                         <div className="space-y-2">
                             <Label className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Additional Comments (Optional)</Label>
                             <Controller name="comments" control={control} render={({ field }) => <Textarea placeholder="Anything else you'd like to add?" {...field} />}/>
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-8" size="lg" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Inquiry <ArrowRight className="w-4 h-4 ml-2"/></>}
                    </Button>
                </div>
            </form>
        </motion.div>,

        // Step 2: Success
        <motion.div key="step2" variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition} className="w-full max-w-xl text-center">
            <div className="glass-card p-8 md:p-12 rounded-2xl">
                <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12"/>
                </div>
                <h1 className="text-4xl font-light text-glow mb-4">Thank You!</h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                    Your inquiry for the <span className="font-semibold text-primary">Global Scholarship Program</span> has been received. Our team will contact you at <span className="font-semibold text-primary">{getValues("email")}</span> within one business day.
                </p>
                <Button size="lg" className="neumorphic-button" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </div>
        </motion.div>
    ];

    const progress = (step / (steps.length - 1)) * 100;

    return (
        <div className="min-h-screen animated-gradient-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-8 left-8 z-20">
                <Link to="/" className="text-2xl font-semibold text-glow hover:opacity-80 transition-opacity">
                    Knowlex
                </Link>
            </motion.div>
            
            {step < 2 && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl mb-4">
                     <div className="flex justify-between items-center mb-1">
                        <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</Button>
                        <p className="text-sm text-muted-foreground">Step {step + 1} of 2</p>
                     </div>
                     <div className="w-full bg-muted/30 rounded-full h-1.5">
                        <motion.div className="bg-primary h-1.5 rounded-full" style={{ width: `${progress}%` }} transition={pageTransition}></motion.div>
                     </div>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {steps[step]}
            </AnimatePresence>
        </div>
    );
};

export default InquiryPage;