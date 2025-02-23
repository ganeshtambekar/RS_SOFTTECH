import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};

const DialogContent = ({ children, className }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogPrimitive.Content
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-lg w-full ${className}`}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          ✖
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

const DialogHeader = ({ children, className }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

const DialogTitle = ({ children, className }) => {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
};

const DialogFooter = ({ children, className }) => {
  return <div className={`mt-4 flex justify-end space-x-2 ${className}`}>{children}</div>;
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter };
