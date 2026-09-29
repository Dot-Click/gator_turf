"use client";
import {useState} from 'react';
import {MessageCircle,X,Send} from 'lucide-react';
export function ChatWidget(){const [open,setOpen]=useState(false);return <div className={"chat-widget"+(open?' is-open':'')}>
{open&&<div className="chat-panel" role="dialog" aria-label="Chat with Gator Turf">
 <div className="chat-head"><div><strong>Gator Turf</strong><span>Usually replies in a few minutes</span></div><button type="button" aria-label="Close chat" onClick={()=>setOpen(false)}><X size={18}/></button></div>
 <div className="chat-body"><div className="chat-bubble">Hi there! Looking for turf for a lawn, pets or a putting green? Tell us a little about your space.</div><div className="chat-hints"><span>Get a free quote</span><span>Book a consultation</span><span>Request samples</span></div></div>
 <div className="chat-foot"><input type="text" placeholder="Write a message..." aria-label="Write a message"/><button type="button" aria-label="Send message"><Send size={16}/></button></div>
</div>}
<button type="button" className="chat-launcher" aria-expanded={open} aria-label={open?'Close chat':'Open chat'} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<MessageCircle size={22}/>}</button>
</div>}
