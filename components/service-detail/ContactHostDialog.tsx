"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MessagingSystem } from "@/components/messaging/MessagingSystem"

interface ContactHostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceId: string
}

export const ContactHostDialog = ({ open, onOpenChange, serviceId }: ContactHostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Contact Host</DialogTitle>
        </DialogHeader>

        <MessagingSystem recipientId="host-123" serviceId={serviceId} />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

