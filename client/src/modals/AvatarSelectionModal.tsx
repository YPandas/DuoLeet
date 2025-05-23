import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SIGNUP_AVATARS, type AvatarOption } from "@/lib/avatars";
import { Check } from "lucide-react";

interface AvatarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatarId: string) => void;
  selectedAvatarId?: string;
}

export default function AvatarSelectionModal({
  isOpen,
  onClose,
  onSelectAvatar,
  selectedAvatarId = "fox1"
}: AvatarSelectionModalProps) {
  const [localSelectedId, setLocalSelectedId] = useState(selectedAvatarId);

  const handleConfirm = () => {
    onSelectAvatar(localSelectedId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Your Avatar</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-sm text-neutral-600 text-center mb-6">
            Pick an avatar to represent you on your coding journey!
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {SIGNUP_AVATARS.map((avatar) => (
              <div
                key={avatar.id}
                className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:scale-105 ${
                  localSelectedId === avatar.id
                    ? "border-primary bg-primary/5"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
                onClick={() => setLocalSelectedId(avatar.id)}
              >
                <div className="aspect-square relative">
                  <img
                    src={avatar.imageUrl}
                    alt={avatar.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {localSelectedId === avatar.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-center mt-2 text-neutral-700">
                  {avatar.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}