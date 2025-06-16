import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare, UserCircle, ShieldCheck, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: Timestamp; // Use Firestore's Timestamp for consistency
}

interface SupportChatProps {
    targetUserId: string; 
    isAdminView: boolean;
}

const SupportChat = ({ targetUserId, isAdminView }: SupportChatProps) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!targetUserId) return;
        const q = query(collection(db, `conversations/${targetUserId}/messages`), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [targetUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Close emoji picker when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [emojiPickerRef]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || newMessage.trim() === '') return;
        
        await addDoc(collection(db, `conversations/${targetUserId}/messages`), {
            text: newMessage,
            senderId: user.uid, 
            senderName: isAdminView ? 'Support Team' : user.email?.split('@')[0] || 'User',
            createdAt: serverTimestamp()
        });
        setNewMessage('');
        setShowEmojiPicker(false);
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setNewMessage(prevMessage => prevMessage + emojiData.emoji);
    };

    return (
        <motion.div 
            initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
            className="glass-card p-4 sm:p-6 flex flex-col h-full max-h-[75vh] relative"
        >
            <h2 className="text-2xl font-medium mb-4 flex items-center gap-2 border-b border-border/50 pb-4">
                <MessageSquare className="text-primary"/>
                {isAdminView ? 'Conversation' : 'Support Chat'}
            </h2>
            <div className="flex-grow bg-background rounded-lg p-4 space-y-6 overflow-y-auto">
                <AnimatePresence>
                    {messages.map(msg => {
                        const isSentByCurrentUser = msg.senderId === user?.uid;
                        return (
                        <motion.div
                            key={msg.id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className={cn("flex items-start gap-3 max-w-[80%]", isSentByCurrentUser ? 'ml-auto flex-row-reverse' : 'mr-auto')}
                        >
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-4", isSentByCurrentUser ? 'bg-primary/20' : 'bg-muted')}>
                                {isSentByCurrentUser ? <UserCircle className="w-5 h-5 text-primary" /> : <ShieldCheck className="w-5 h-5 text-muted-foreground" />}
                            </div>
                            <div className={cn(
                                "p-3 rounded-2xl w-full",
                                isSentByCurrentUser 
                                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                                    : 'bg-muted rounded-bl-none'
                            )}>
                                {!isSentByCurrentUser && <p className="text-xs font-bold text-primary mb-1">{msg.senderName}</p>}
                                <p className="text-sm break-words">{msg.text}</p>
                                <p className={cn("text-xs opacity-70 mt-2", isSentByCurrentUser ? 'text-right' : 'text-left')}>
                                    {msg.createdAt?.toDate ? format(msg.createdAt.toDate(), 'p') : ''}
                                </p>
                            </div>
                        </motion.div>
                    )})}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>
            
            <AnimatePresence>
                {showEmojiPicker && (
                    <motion.div
                        ref={emojiPickerRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 z-10"
                    >
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSendMessage} className="mt-4">
                <div className="relative flex items-center">
                    <Input 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)} 
                        placeholder="Type your message..."
                        className="bg-input rounded-full h-12 pr-28" // Increased padding for both buttons
                        autoComplete="off"
                    />
                    <div className="absolute right-2 flex items-center gap-1">
                        <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <Smile className="w-5 h-5 text-muted-foreground"/>
                        </Button>
                        <Button type="submit" size="icon" className="h-9 w-9 rounded-full neumorphic-button">
                            <Send className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default SupportChat;