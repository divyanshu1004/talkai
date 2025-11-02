import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { init } from "next/dist/compiled/webpack/webpack";
import { AgentGetOne } from "../../types";
import { trpc } from "@/trpc/server";
interface UpdateAgentDialogProps {
    open:boolean;
    onOpenChange :(open :boolean) =>void;
    initialValues: AgentGetOne;

};
export const UpdateAgentDialog = ({
    open,
    onOpenChange,
    initialValues
}:UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title ="Edit Agent"
            description = "Edit the Agent's details"
            open={open}
            onOpenChange={onOpenChange}
        >
          
            <AgentForm 
                onSuccess ={() => onOpenChange(false)}
                onCancel ={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );

    
};

