"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getUsers, getCurrentUser, saveMessage, type Message } from "@/data/localStorage"
import { v4 as uuidv4 } from "uuid"
import { Send, Clock, Check, MessageSquare } from "lucide-react"

interface MessagingSystemProps {
  recipientId?: string
  serviceId?: string
}

export function MessagingSystem({ recipientId, serviceId }: MessagingSystemProps) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [conversations, setConversations] = useState<{ [key: string]: any }>({})
  const [activeConversation, setActiveConversation] = useState<string | null>(recipientId || null)
  const [newMessage, setNewMessage] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setConversations(user.messages || {})
    }

    const allUsers = getUsers()
    setUsers(allUsers)

    // If we have a recipientId from props, set it as active conversation
    if (recipientId) {
      setActiveConversation(recipientId)
    }
  }, [recipientId])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation, conversations])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !currentUser) return

    const message: Message = {
      id: uuidv4(),
      senderId: currentUser.id,
      receiverId: activeConversation,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    }

    // Save the message to localStorage
    saveMessage(message)

    // Update the local state
    const updatedConversations = { ...conversations }
    if (!updatedConversations[activeConversation]) {
      updatedConversations[activeConversation] = []
    }
    updatedConversations[activeConversation].push(message)
    setConversations(updatedConversations)

    // Clear the input
    setNewMessage("")
  }

  const getRecipientName = (recipientId: string) => {
    const recipient = users.find((user) => user.id === recipientId)
    return recipient ? recipient.fullName : "Unknown User"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Sign in to access messages</h3>
            <p className="text-gray-600">You need to be logged in to send and receive messages.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If there are no conversations
  if (Object.keys(conversations).length === 0 && !recipientId) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No messages yet</h3>
            <p className="text-gray-600 mb-4">You haven't started any conversations yet.</p>
            <p className="text-gray-600">To start a conversation, send a message to a host or guest.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="flex h-full">
        {/* Conversations sidebar */}
        {!recipientId && (
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Your Conversations</h3>
            </div>
            <ScrollArea className="h-[520px]">
              {Object.keys(conversations).map((conversationId) => (
                <div
                  key={conversationId}
                  className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                    activeConversation === conversationId ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setActiveConversation(conversationId)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{getInitials(getRecipientName(conversationId))}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{getRecipientName(conversationId)}</p>
                      {conversations[conversationId].length > 0 && (
                        <p className="text-sm text-gray-500 truncate">
                          {conversations[conversationId][conversations[conversationId].length - 1].content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {/* Messages area */}
        <div className={`flex flex-col ${recipientId ? "w-full" : "w-2/3"}`}>
          {activeConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b bg-gray-50 flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback>{getInitials(getRecipientName(activeConversation))}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{getRecipientName(activeConversation)}</h3>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {conversations[activeConversation]?.map((message: Message, index: number) => (
                    <div
                      key={message.id || index}
                      className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.senderId === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                      >
                        <p className="break-words">{message.content}</p>
                        <div
                          className={`text-xs mt-1 flex items-center ${
                            message.senderId === currentUser.id ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {message.senderId === currentUser.id && (
                            <span className="ml-1">
                              {message.read ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={endOfMessagesRef} />
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="p-4 border-t mt-auto">
                <div className="flex">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="resize-none mr-2 flex-1"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

